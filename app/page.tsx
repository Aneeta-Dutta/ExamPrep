import Link from "next/link";
import {
  Target,
  Check,
  BookOpen,
  PencilLine,
  Trophy,
  BarChart3,
  Sparkles,
  ArrowRight,
  ListChecks,
  Clock,
  Award,
  Ban,
  type LucideIcon,
} from "lucide-react";
import { contentCounts } from "@/lib/content";
import { getOptionalUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function HomePage() {
  const pyqCount = contentCounts.pyq;
  const mockCount = contentCounts.mock;
  const yearCount = contentCounts.years;
  const user = await getOptionalUser();

  return (
    <div>
      {/* Hero */}
      <div className="reveal relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2c3e8c] via-[#3a4fb0] to-[#4f6ef7] px-6 py-8 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">
            <Target size={13} strokeWidth={2.4} /> UGC NET Paper I
          </span>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight sm:text-[30px]">
            Crack UGC NET,
            <br />
            one question at a time.
          </h1>
          <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-white/80">
            Year-wise previous questions, timed mock tests, and progress
            tracking — clean, focused, and completely free.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/mock"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-sm font-extrabold text-primary shadow-sm transition hover:bg-white/90"
            >
              Start a Mock Test <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
            <Link
              href="/pyq"
              className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Browse PYQs
            </Link>
          </div>
        </div>
      </div>

      {/* Value chips */}
      <div className="reveal mb-5 flex flex-wrap gap-2" style={{ animationDelay: "60ms" }}>
        {["100% free", "No ads", "Answer keys & explanations", "Track your progress"].map(
          (t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-[11.5px] font-semibold text-muted"
            >
              <Check size={13} strokeWidth={3} className="text-primary" />
              {t}
            </span>
          ),
        )}
      </div>

      {/* Stats */}
      <div className="reveal mb-6 grid grid-cols-3 gap-3" style={{ animationDelay: "120ms" }}>
        {[
          { num: pyqCount ?? 0, lbl: "PYQs" },
          { num: yearCount, lbl: "Years" },
          { num: mockCount ?? 0, lbl: "Mock Qs" },
        ].map((s) => (
          <div key={s.lbl} className="card px-3 py-4 text-center">
            <div className="text-[26px] font-extrabold text-primary">{s.num}</div>
            <div className="mt-0.5 text-[11px] text-muted">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Sign-in nudge (only when accounts are enabled and logged out) */}
      {isSupabaseConfigured && !user && (
        <Link
          href="/login"
          className="reveal card mb-6 flex items-center gap-3 border-[1.5px] border-dashed border-primary/40 px-4 py-3.5 transition hover:border-primary"
          style={{ animationDelay: "160ms" }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-bg text-primary">
            <Sparkles size={18} strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <div className="text-[13px] font-bold text-primary">
              Sign in to sync scores across devices
            </div>
            <div className="text-[11.5px] text-muted">
              Free with email or Google — your progress is also saved on this device.
            </div>
          </div>
          <ArrowRight size={18} className="text-primary" />
        </Link>
      )}

      {/* Quick access */}
      <div className="reveal mb-3 text-[10.5px] font-bold uppercase tracking-wide text-muted" style={{ animationDelay: "200ms" }}>
        Quick Access
      </div>
      <div className="reveal mb-6 grid gap-3 sm:grid-cols-2" style={{ animationDelay: "240ms" }}>
        <QuickCard href="/pyq" Icon={BookOpen} title="Previous Year Questions" sub="Year-wise PYQs with answer key" />
        <QuickCard href="/mock" Icon={PencilLine} title="Mock Test" sub="Timed practice tests" />
        <QuickCard href="/leaderboard" Icon={Trophy} title="Leaderboard" sub="See how you rank" />
        <QuickCard href="/profile" Icon={BarChart3} title="My Progress" sub="Scores, accuracy & bookmarks" />
      </div>

      {/* About */}
      <div className="reveal mb-3 text-[10.5px] font-bold uppercase tracking-wide text-muted" style={{ animationDelay: "280ms" }}>
        About UGC NET Paper I
      </div>
      <div className="reveal card border-l-[3px] border-l-primary px-5 py-4" style={{ animationDelay: "320ms" }}>
        <div className="mb-2.5 text-[13px] font-bold">Topics Covered</div>
        <div className="text-[12.5px] leading-relaxed text-muted">
          Teaching Aptitude · Research Aptitude · Reading Comprehension ·
          Communication · Mathematical Reasoning · Logical Reasoning · Data
          Interpretation · ICT · People &amp; Environment · Higher Education
          System
        </div>
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 text-[12px] text-muted">
          <Meta Icon={ListChecks} label="Questions" value="50 (MCQ)" />
          <Meta Icon={Clock} label="Duration" value="3 hours" />
          <Meta Icon={Award} label="Marks" value="100" />
          <Meta Icon={Ban} label="Negative" value="None" />
        </div>
      </div>
    </div>
  );
}

function QuickCard({
  href,
  Icon,
  title,
  sub,
}: {
  href: string;
  Icon: LucideIcon;
  title: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="card group flex items-center gap-3.5 border-[1.5px] px-4 py-4 transition hover:-translate-y-0.5 hover:border-primary-l hover:shadow-[0_6px_20px_rgba(79,110,247,.15)]"
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-primary-bg text-primary transition-transform group-hover:scale-110">
        <Icon size={20} strokeWidth={2.2} />
      </div>
      <div className="flex-1">
        <h3 className="text-[13px] font-bold">{title}</h3>
        <p className="text-[11px] text-muted">{sub}</p>
      </div>
      <ArrowRight
        size={16}
        className="text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-primary group-hover:opacity-100"
      />
    </Link>
  );
}

function Meta({
  Icon,
  label,
  value,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} strokeWidth={2.2} className="shrink-0 text-primary" />
      <span>
        <strong className="text-ink">{label}:</strong> {value}
      </span>
    </div>
  );
}
