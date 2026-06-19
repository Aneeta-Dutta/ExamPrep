-- ============================================================
--  UGC NET Prep — Database schema
--  Run this in Supabase: Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- ----- Extensions -----
create extension if not exists "pgcrypto";

-- ============================================================
--  profiles  (one row per auth user)
-- ============================================================
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url   text,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Profiles are publicly readable (needed for the leaderboard names),
-- but only the owner can insert / update their own row.
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name',
             new.raw_user_meta_data ->> 'name',
             split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
--  questions  (PYQ + mock content)
-- ============================================================
create table if not exists public.questions (
  id           uuid primary key default gen_random_uuid(),
  exam         text not null default 'UGC NET Paper 1',
  source       text not null check (source in ('pyq', 'mock')),
  year_session text,            -- e.g. 'June 2023'  (PYQ only)
  set_name     text,            -- e.g. 'Mock Test 1' (mock only)
  q_order      int  not null default 0,
  topic        text not null,
  question     text not null,
  options      jsonb not null,  -- array of strings
  answer_index int  not null,   -- 0-based correct option
  explanation  text not null default '',
  created_at   timestamptz not null default now()
);

create index if not exists questions_source_idx       on public.questions (source);
create index if not exists questions_year_session_idx on public.questions (year_session);
create index if not exists questions_set_name_idx     on public.questions (set_name);

alter table public.questions enable row level security;

-- Questions are readable by everyone (open content). Writes happen via the
-- service-role seed script / Supabase dashboard, which bypass RLS.
drop policy if exists "Questions are viewable by everyone" on public.questions;
create policy "Questions are viewable by everyone"
  on public.questions for select using (true);

-- ============================================================
--  attempts  (mock-test score history)
-- ============================================================
create table if not exists public.attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  set_name     text not null,
  total        int  not null,
  correct      int  not null,
  wrong        int  not null,
  skipped      int  not null,
  score_pct    int  not null,
  duration_sec int  not null default 0,
  answers      jsonb not null default '{}'::jsonb, -- questionId -> option index
  created_at   timestamptz not null default now()
);

create index if not exists attempts_user_idx on public.attempts (user_id, created_at desc);

alter table public.attempts enable row level security;

drop policy if exists "Users can view own attempts" on public.attempts;
create policy "Users can view own attempts"
  on public.attempts for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own attempts" on public.attempts;
create policy "Users can insert own attempts"
  on public.attempts for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete own attempts" on public.attempts;
create policy "Users can delete own attempts"
  on public.attempts for delete using (auth.uid() = user_id);

-- ============================================================
--  bookmarks  (saved PYQ questions)
-- ============================================================
create table if not exists public.bookmarks (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, question_id)
);

create index if not exists bookmarks_user_idx on public.bookmarks (user_id);

alter table public.bookmarks enable row level security;

drop policy if exists "Users can view own bookmarks" on public.bookmarks;
create policy "Users can view own bookmarks"
  on public.bookmarks for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own bookmarks" on public.bookmarks;
create policy "Users can insert own bookmarks"
  on public.bookmarks for insert with check (auth.uid() = user_id);

drop policy if exists "Users can delete own bookmarks" on public.bookmarks;
create policy "Users can delete own bookmarks"
  on public.bookmarks for delete using (auth.uid() = user_id);

-- ============================================================
--  leaderboard  (best score per user)  — security_invoker view
-- ============================================================
create or replace view public.leaderboard
with (security_invoker = on) as
select
  a.user_id,
  p.display_name,
  p.avatar_url,
  max(a.score_pct)  as best_score,
  count(*)          as tests_taken,
  round(avg(a.score_pct)) as avg_score,
  max(a.created_at) as last_played
from public.attempts a
left join public.profiles p on p.id = a.user_id
group by a.user_id, p.display_name, p.avatar_url;

-- NOTE: the leaderboard view inherits attempts' RLS (security_invoker),
-- so it only shows the signed-in user their own aggregate. For a PUBLIC
-- leaderboard across all users, expose it via the RPC below instead.

-- ============================================================
--  public_leaderboard()  — top scorers across all users
-- ============================================================
create or replace function public.public_leaderboard(limit_n int default 50)
returns table (
  user_id      uuid,
  display_name text,
  avatar_url   text,
  best_score   int,
  tests_taken  bigint,
  avg_score    numeric,
  last_played  timestamptz
)
language sql
security definer set search_path = public
as $$
  select
    a.user_id,
    p.display_name,
    p.avatar_url,
    max(a.score_pct)        as best_score,
    count(*)                as tests_taken,
    round(avg(a.score_pct)) as avg_score,
    max(a.created_at)       as last_played
  from public.attempts a
  left join public.profiles p on p.id = a.user_id
  group by a.user_id, p.display_name, p.avatar_url
  order by best_score desc, tests_taken desc, last_played asc
  limit limit_n;
$$;

grant execute on function public.public_leaderboard(int) to anon, authenticated;
