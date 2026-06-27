import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  ChevronRight,
  BookOpen,
  FileText,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  SYLLABUS,
  resolvePath,
  hasContent,
  getContent,
  studyCounts,
} from "@/lib/study/syllabus";
import StudyContent from "@/components/StudyContent";
import type { Topic, Unit } from "@/lib/study/types";

export const metadata = {
  title: "Study Mode — UGC NET Paper 2 (Computer Science & Applications)",
};

// Pre-render the unit and topic pages.
export function generateStaticParams() {
  const params: { path?: string[] }[] = [{ path: [] }];
  for (const unit of SYLLABUS) {
    params.push({ path: [unit.id] });
    for (const t of unit.topics) {
      params.push({ path: [unit.id, t.id] });
      for (const sub of t.children ?? [])
        params.push({ path: [unit.id, t.id, sub.id] });
    }
  }
  return params;
}

export default async function StudyPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;

  if (!path || path.length === 0) return <Landing />;

  const resolved = resolvePath(path);
  if (!resolved) notFound();

  const { unit, trail } = resolved;
  if (trail.length === 0) return <UnitView unit={unit} />;

  const current = trail[trail.length - 1] as Topic;
  return <TopicView unit={unit} trail={trail as Topic[]} current={current} />;
}

// ---- Landing: subject 087 with all 10 units --------------------------------

function Landing() {
  return (
    <div>
      <div className="reveal relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2c3e8c] via-[#3a4fb0] to-[#4f6ef7] px-6 py-7 text-white">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">
          <GraduationCap size={13} strokeWidth={2.4} /> Paper 2 · Subject 087
        </span>
        <h1 className="mt-3 text-[24px] font-extrabold leading-tight sm:text-[27px]">
          Study Mode
        </h1>
        <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-white/80">
          Computer Science &amp; Applications — the full UGC NET syllabus,
          unit&nbsp;by&nbsp;unit. Open a unit to see its topics, then a topic for
          exam-focused notes with diagrams.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11.5px] font-semibold">
          <Stat>{studyCounts.units} units</Stat>
          <Stat>{studyCounts.topics} topics</Stat>
          <Stat>{studyCounts.withNotes} with notes</Stat>
        </div>
      </div>

      <div className="space-y-3">
        {SYLLABUS.map((unit) => (
          <Link
            key={unit.id}
            href={`/study/${unit.id}`}
            className="card group flex items-center gap-4 px-5 py-4 transition hover:-translate-y-0.5 hover:border-primary-l hover:shadow-[0_6px_20px_rgba(79,110,247,.15)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-bg text-[15px] font-extrabold text-primary">
              {unit.number}
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-extrabold">{unit.title}</h3>
              <p className="mt-0.5 text-[12px] leading-snug text-muted">
                {unit.summary}
              </p>
            </div>
            <ArrowRight
              size={18}
              className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---- Unit view: list of topics ---------------------------------------------

function UnitView({ unit }: { unit: Unit }) {
  return (
    <div>
      <Breadcrumb trail={[{ href: "/study", label: "Study" }]} current={`Unit ${unit.number}`} />
      <div className="mb-5">
        <div className="text-[11px] font-bold uppercase tracking-wide text-primary">
          Unit {unit.number}
        </div>
        <h2 className="mt-0.5 text-xl font-extrabold">{unit.title}</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{unit.summary}</p>
      </div>

      <div className="space-y-2.5">
        {unit.topics.map((t) => (
          <TopicRow key={t.id} unit={unit} topic={t} parents={[]} />
        ))}
      </div>
    </div>
  );
}

function TopicRow({
  unit,
  topic,
  parents,
}: {
  unit: Unit;
  topic: Topic;
  parents: string[];
}) {
  const href = `/study/${[unit.id, ...parents, topic.id].join("/")}`;
  const hasKids = (topic.children?.length ?? 0) > 0;
  const notes = hasContent(topic.id);
  return (
    <div className="card overflow-hidden">
      <Link
        href={href}
        className="group flex items-center gap-3 px-4 py-3 transition hover:bg-bg"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-bg text-primary">
          {hasKids ? <Layers size={17} strokeWidth={2.2} /> : <FileText size={17} strokeWidth={2.2} />}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[13.5px] font-bold">{topic.title}</h3>
            {notes && (
              <span className="rounded bg-primary-bg px-1.5 py-0.5 text-[9.5px] font-bold uppercase text-primary">
                Notes
              </span>
            )}
          </div>
          {topic.summary && (
            <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
              {topic.summary}
            </p>
          )}
        </div>
        <ChevronRight
          size={17}
          className="shrink-0 text-muted transition group-hover:text-primary"
        />
      </Link>
    </div>
  );
}

// ---- Topic view: content + sub-topics --------------------------------------

function TopicView({
  unit,
  trail,
  current,
}: {
  unit: Unit;
  trail: Topic[];
  current: Topic;
}) {
  const crumbs = [
    { href: "/study", label: "Study" },
    { href: `/study/${unit.id}`, label: `Unit ${unit.number}` },
    ...trail.slice(0, -1).map((t, i) => ({
      href: `/study/${[unit.id, ...trail.slice(0, i + 1).map((x) => x.id)].join("/")}`,
      label: t.title,
    })),
  ];
  const content = hasContent(current.id) ? getContent(current.id) : null;
  const children = current.children ?? [];
  const parents = trail.slice(0, -1).map((t) => t.id);

  return (
    <div>
      <Breadcrumb trail={crumbs} current={current.title} />
      <div className="mb-4">
        <h2 className="text-xl font-extrabold">{current.title}</h2>
        {current.summary && (
          <p className="mt-1 text-[13px] leading-relaxed text-muted">
            {current.summary}
          </p>
        )}
      </div>

      {/* Sub-topics, if any */}
      {children.length > 0 && (
        <div className="mb-5 space-y-2.5">
          {children.map((c) => (
            <TopicRow key={c.id} unit={unit} topic={c} parents={[...parents, current.id]} />
          ))}
        </div>
      )}

      {/* Authored notes */}
      {content ? (
        <article className="card px-5 py-5">
          <StudyContent blocks={content} />
        </article>
      ) : children.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 px-6 py-10 text-center">
          <BookOpen size={26} className="text-muted" />
          <p className="text-[13px] font-semibold text-ink">
            Study notes for this topic are being added.
          </p>
          <p className="max-w-sm text-[12px] text-muted">
            It is part of the official syllabus and listed here so you can track
            your coverage. Meanwhile, practise it in{" "}
            <Link href="/pyq" className="font-semibold text-primary hover:underline">
              Previous Year Questions
            </Link>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ---- Shared bits -----------------------------------------------------------

function Breadcrumb({
  trail,
  current,
}: {
  trail: { href: string; label: string }[];
  current: string;
}) {
  return (
    <nav className="mb-3 flex flex-wrap items-center gap-1 text-[11.5px] text-muted">
      {trail.map((c) => (
        <span key={c.href} className="flex items-center gap-1">
          <Link href={c.href} className="font-medium hover:text-primary">
            {c.label}
          </Link>
          <ChevronRight size={13} className="text-muted/60" />
        </span>
      ))}
      <span className="font-semibold text-ink">{current}</span>
    </nav>
  );
}

function Stat({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
      {children}
    </span>
  );
}
