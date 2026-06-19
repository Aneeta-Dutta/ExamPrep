# UGC NET Prep

A clean web app for UGC NET Paper I preparation: year-wise previous year questions
with answer keys, timed mock tests, progress tracking, bookmarks, and a leaderboard.

## Tech Stack

| Layer            | Technology                                    |
| ---------------- | --------------------------------------------- |
| Framework        | Next.js 16 (App Router), React 19, TypeScript |
| Styling          | Tailwind CSS v4                               |
| Database & Auth  | Supabase (Postgres, email + Google login)     |
| Hosting          | Vercel                                        |

All services run on free tiers.

## Features

- Burger-menu navigation: Home, PYQ, Mock Test, Leaderboard, My Progress
- Year-wise PYQs with per-question and show-all answer keys plus explanations
- Mock tests with countdown timer, question palette, score summary, and answer review
- Authentication via email/password or Google
- Bookmark PYQs to revisit later
- Progress tracking: score history and accuracy by topic
- Leaderboard ranked by best mock-test score

## Prerequisites

- Node.js 18.18+ (Node 24 recommended)
- A free Supabase account

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project at supabase.com. In the SQL Editor, run the contents
   of `supabase/schema.sql` to create the tables, row-level-security policies, the
   profile trigger, and the leaderboard function.

3. Configure environment variables:

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in the values from Supabase (Project Settings > API):

   | Variable                        | Purpose                                      |
   | ------------------------------- | -------------------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`      | Project URL                                  |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key                              |
   | `SUPABASE_SERVICE_ROLE_KEY`     | Seed script only; never exposed to the browser |

4. Seed the questions (uploads all content from `lib/seed-data.ts`; safe to re-run):

   ```bash
   npm run seed
   ```

5. (Optional) Enable Google login in Supabase under Authentication > Providers >
   Google, using redirect URL
   `https://<your-project-ref>.supabase.co/auth/v1/callback`.

6. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the repo at vercel.com.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Project
   Settings > Environment Variables. The service-role key is needed only locally for
   seeding and must not be added to Vercel.
4. Deploy, then in Supabase under Authentication > URL Configuration add the Vercel
   URL to Site URL and Redirect URLs (`https://your-app.vercel.app/auth/callback`).

## Project Structure

```
app/
  page.tsx              Home
  pyq/                  Previous year questions (browser + bookmarks)
  mock/                 Mock test list and [set] runner
  leaderboard/          Public leaderboard
  profile/              Progress, history, bookmarks
  login/                Sign in / sign up (email + Google)
  auth/callback/        OAuth and email-confirmation handler
components/
  AppShell.tsx          Header and burger sidebar
  TestRunner.tsx        Mock-test engine (timer, palette, result, review)
lib/
  supabase/             Browser, server, and proxy clients
  seed-data.ts          Question content
  auth-actions.ts       Server actions for auth
  types.ts              Shared types
supabase/schema.sql     Database schema, RLS policies, leaderboard function
scripts/seed.ts         Database seeder
_prototype/index.html   Original single-file prototype (reference)
```

## Adding Content

- Edit `lib/seed-data.ts` and run `npm run seed`, or edit the `questions` table
  directly in the Supabase Table Editor (no code required).
- A new `year_session` value appears automatically as a tab on the PYQ page; a new
  `set_name` value appears automatically as a card on the Mock Tests page.

## Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run build` | Create a production build         |
| `npm run start` | Run the production build          |
| `npm run lint`  | Run ESLint                        |
| `npm run seed`  | Seed questions into the database  |
