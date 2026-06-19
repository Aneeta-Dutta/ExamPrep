"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Trophy,
  ThumbsUp,
  BookOpen,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";
import { OPTION_LABELS, type Question } from "@/lib/types";
import { addAttempt } from "@/lib/local-store";

type Phase = "intro" | "test" | "result" | "review";

export default function TestRunner({
  setName,
  questions,
}: {
  setName: string;
  questions: Question[];
}) {
  const total = questions.length;
  const durationSec = Math.max(10, Math.round(total * 1.5)) * 60;

  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [saved, setSaved] = useState<"idle" | "done">("idle");
  const startedAt = useRef<number>(0);

  // Timer
  useEffect(() => {
    if (phase !== "test") return;
    if (timeLeft <= 0) {
      finish();
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft]);

  const answeredCount = Object.keys(answers).length;
  const result = useMemo(() => computeResult(questions, answers), [questions, answers]);

  function start() {
    setAnswers({});
    setCurrent(0);
    setTimeLeft(durationSec);
    setSaved("idle");
    startedAt.current = Date.now();
    setPhase("test");
  }

  function pick(qid: string, oi: number) {
    setAnswers((prev) => {
      const next = { ...prev };
      if (next[qid] === oi) delete next[qid];
      else next[qid] = oi;
      return next;
    });
  }

  function finish() {
    setPhase("result");
    const r = computeResult(questions, answers);
    const durationUsed = startedAt.current
      ? Math.min(durationSec, Math.round((Date.now() - startedAt.current) / 1000))
      : durationSec - timeLeft;

    // Save the attempt to the browser so it appears in "My Progress".
    addAttempt({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      set_name: setName,
      total,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      score_pct: r.pct,
      duration_sec: durationUsed,
      answers,
      created_at: new Date().toISOString(),
    });
    setSaved("done");
  }

  function confirmSubmit() {
    const unanswered = total - answeredCount;
    if (
      unanswered > 0 &&
      !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)
    )
      return;
    finish();
  }

  // ---------- INTRO ----------
  if (phase === "intro") {
    const minutes = durationSec / 60;
    return (
      <div className="mx-auto max-w-md">
        <div className="card px-6 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-bg text-primary">
            <FileText size={26} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-extrabold">{setName}</h2>
          <p className="mx-auto mt-1.5 mb-6 max-w-xs text-[13px] leading-relaxed text-muted">
            Answer {total} questions in {minutes} minutes. No negative marking.
            Your score is saved on this device.
          </p>
          <div className="mb-6 grid grid-cols-3 gap-2.5">
            <Meta v={total} l="Questions" />
            <Meta v={minutes} l="Minutes" />
            <Meta v={total * 2} l="Max Marks" />
          </div>
          <button onClick={start} className="btn-primary w-full">
            Start Test
          </button>
          <Link
            href="/mock"
            className="mt-3 block text-[12.5px] font-semibold text-muted hover:text-primary"
          >
            ← Back to all tests
          </Link>
        </div>
      </div>
    );
  }

  // ---------- TEST ----------
  if (phase === "test") {
    const q = questions[current];
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const timerColor =
      timeLeft <= 60 ? "text-red-600" : timeLeft <= 300 ? "text-amber-600" : "text-primary";
    return (
      <div>
        {/* Bar */}
        <div className="card mb-3.5 flex items-center gap-3.5 px-4 py-3">
          <div className={`min-w-[68px] text-xl font-extrabold tabular-nums ${timerColor}`}>
            {String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </div>
          <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-bg">
            <div
              className="h-full rounded-full bg-primary-l transition-[width]"
              style={{ width: `${(answeredCount / total) * 100}%` }}
            />
          </div>
          <div className="whitespace-nowrap text-[12px] font-semibold text-muted">
            Q {current + 1} / {total}
          </div>
          <button
            onClick={confirmSubmit}
            className="rounded-lg bg-primary px-3 py-1.5 text-[11.5px] font-bold text-white hover:bg-primary-l"
          >
            Submit
          </button>
        </div>

        {/* Palette */}
        <div className="card mb-3.5 px-4 py-3.5">
          <div className="mb-2.5 text-[10.5px] font-bold uppercase tracking-wide text-muted">
            Question Palette
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((qq, i) => {
              const isAnswered = answers[qq.id] !== undefined;
              const isCurrent = i === current;
              return (
                <button
                  key={qq.id}
                  onClick={() => setCurrent(i)}
                  className={`flex h-[30px] w-[30px] items-center justify-center rounded-md border-[1.5px] text-[11px] font-bold transition ${
                    isAnswered
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-bg text-muted hover:border-primary-l"
                  } ${isCurrent ? "outline outline-2 outline-offset-2 outline-primary-l" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question */}
        <div className="card mb-3.5 px-5 py-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="chip bg-primary-bg text-primary">Q{current + 1}</span>
            <span className="chip bg-amber-100 text-amber-800">{q.topic}</span>
          </div>
          <div className="mb-4 text-sm font-medium leading-relaxed">{q.question}</div>
          <div className="grid gap-2">
            {q.options.map((o, oi) => {
              const selected = answers[q.id] === oi;
              return (
                <button
                  key={oi}
                  onClick={() => pick(q.id, oi)}
                  className={`flex items-start gap-2.5 rounded-lg border-[1.5px] px-3.5 py-2.5 text-left text-[13px] transition ${
                    selected
                      ? "border-primary bg-primary-bg"
                      : "border-line hover:border-primary-l hover:bg-primary-bg"
                  }`}
                >
                  <span className="mt-px shrink-0 text-[11.5px] font-extrabold text-primary">
                    {OPTION_LABELS[oi]}.
                  </span>
                  <span>{o}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="btn-outline disabled:opacity-40"
          >
            <ArrowLeft size={16} strokeWidth={2.4} /> Previous
          </button>
          <button
            onClick={() => setCurrent((c) => Math.min(total - 1, c + 1))}
            disabled={current === total - 1}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-l disabled:opacity-40"
          >
            Next <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    );
  }

  // ---------- RESULT ----------
  if (phase === "result") {
    const C = 326.7;
    const offset = C - (result.pct / 100) * C;
    const { grade, sub, Icon: GradeIcon, color: gradeColor } = gradeFor(result.pct);
    return (
      <div className="mx-auto max-w-lg">
        <div className="card px-6 py-7 text-center">
          <div className="relative mx-auto mb-4 h-[120px] w-[120px]">
            <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1.1s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-extrabold text-primary">{result.pct}%</div>
              <div className="text-[10px] text-muted">Score</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-lg font-extrabold">
            <GradeIcon size={20} strokeWidth={2.2} className={gradeColor} />
            {grade}
          </div>
          <p className="mx-auto mb-4 max-w-sm text-[12.5px] leading-relaxed text-muted">{sub}</p>

          <div className="grid grid-cols-3 gap-2.5">
            <Stat v={result.correct} l="Correct" c="text-green-600 dark:text-green-400" />
            <Stat v={result.wrong} l="Wrong" c="text-red-600 dark:text-red-400" />
            <Stat v={result.skipped} l="Skipped" c="text-muted" />
          </div>

          {saved === "done" && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] text-muted">
              <CheckCircle2 size={14} strokeWidth={2.4} className="text-green-600 dark:text-green-400" />
              Saved to My Progress on this device
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button onClick={() => setPhase("review")} className="btn-outline">
              Review Answers
            </button>
            <button onClick={start} className="btn-primary">
              Retake Test
            </button>
          </div>
          <Link
            href="/mock"
            className="mt-3 inline-flex items-center justify-center gap-1 text-[12.5px] font-semibold text-muted hover:text-primary"
          >
            <ArrowLeft size={14} strokeWidth={2.4} /> All tests
          </Link>
        </div>
      </div>
    );
  }

  // ---------- REVIEW ----------
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-lg border-[1.5px] border-amber-400/40 bg-amber-400/10 px-3.5 py-2.5 text-[12px] font-bold text-amber-700 dark:text-amber-300">
        <ClipboardCheck size={15} strokeWidth={2.2} />
        Review — green = correct, red = your wrong answer
        <button
          onClick={() => setPhase("result")}
          className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-[11px] font-bold text-white hover:bg-primary-l"
        >
          <ArrowLeft size={13} strokeWidth={2.4} /> Back
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => {
          const sel = answers[q.id];
          const cor = q.answer_index;
          const isSkip = sel === undefined;
          const isOk = sel === cor;
          return (
            <div key={q.id} className="card px-4 py-4">
              <div className="mb-2.5 flex flex-wrap items-start gap-2">
                <span className="chip bg-primary-bg text-primary">Q{i + 1}</span>
                <span className="chip bg-amber-100 text-amber-800">{q.topic}</span>
                <span
                  className={`chip gap-1 ${
                    isSkip
                      ? "bg-gray-500/15 text-gray-500"
                      : isOk
                        ? "bg-green-500/15 text-green-600 dark:text-green-400"
                        : "bg-red-500/15 text-red-600 dark:text-red-400"
                  }`}
                >
                  {isSkip ? (
                    <>
                      <MinusCircle size={12} strokeWidth={2.4} /> Skipped
                    </>
                  ) : isOk ? (
                    <>
                      <CheckCircle2 size={12} strokeWidth={2.4} /> Correct
                    </>
                  ) : (
                    <>
                      <XCircle size={12} strokeWidth={2.4} /> Wrong
                    </>
                  )}
                </span>
                <span className="flex-1 text-[13.5px] font-medium leading-relaxed">
                  {q.question}
                </span>
              </div>

              <div className="mb-2.5 grid gap-1.5">
                {q.options.map((o, oi) => {
                  const isCorrectOpt = oi === cor;
                  const isWrongSel = oi === sel && oi !== cor;
                  return (
                    <div
                      key={oi}
                      className={`flex items-start gap-2.5 rounded-md border-[1.5px] px-3 py-2 text-[13px] ${
                        isCorrectOpt
                          ? "border-green-500/40 bg-green-500/10"
                          : isWrongSel
                            ? "border-red-500/40 bg-red-500/10"
                            : "border-line"
                      }`}
                    >
                      <span
                        className={`mt-px shrink-0 text-[11.5px] font-extrabold ${
                          isCorrectOpt
                            ? "text-green-600 dark:text-green-400"
                            : isWrongSel
                              ? "text-red-600 dark:text-red-400"
                              : "text-primary"
                        }`}
                      >
                        {OPTION_LABELS[oi]}.
                      </span>
                      <span>{o}</span>
                      {isCorrectOpt && (
                        <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-green-600 dark:text-green-400">
                          <CheckCircle2 size={12} strokeWidth={2.4} /> Correct
                        </span>
                      )}
                      {isWrongSel && (
                        <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                          <XCircle size={12} strokeWidth={2.4} /> Your answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="rounded-lg border-[1.5px] border-green-500/40 bg-green-500/10 px-3.5 py-2.5 text-[12.5px]">
                <span className="flex items-center gap-1.5 font-bold text-green-600 dark:text-green-400">
                  <CheckCircle2 size={15} strokeWidth={2.4} />
                  {OPTION_LABELS[cor]}. {q.options[cor]}
                </span>
                <div className="mt-1.5 leading-relaxed text-muted">{q.explanation}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Meta({ v, l }: { v: number; l: string }) {
  return (
    <div className="rounded-lg bg-bg px-2 py-3">
      <div className="text-xl font-extrabold text-primary">{v}</div>
      <div className="mt-0.5 text-[10px] text-muted">{l}</div>
    </div>
  );
}

function Stat({ v, l, c }: { v: number; l: string; c: string }) {
  return (
    <div className="rounded-lg bg-bg px-2 py-3 text-center">
      <div className={`text-xl font-extrabold ${c}`}>{v}</div>
      <div className="mt-0.5 text-[10px] text-muted">{l}</div>
    </div>
  );
}

function computeResult(questions: Question[], answers: Record<string, number>) {
  let correct = 0,
    wrong = 0,
    skipped = 0;
  for (const q of questions) {
    const a = answers[q.id];
    if (a === undefined) skipped++;
    else if (a === q.answer_index) correct++;
    else wrong++;
  }
  const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  return { correct, wrong, skipped, pct };
}

function gradeFor(pct: number): {
  grade: string;
  sub: string;
  Icon: LucideIcon;
  color: string;
} {
  if (pct >= 80)
    return {
      grade: "Outstanding!",
      sub: "Excellent performance. You are well-prepared for UGC NET!",
      Icon: Trophy,
      color: "text-amber-400",
    };
  if (pct >= 60)
    return {
      grade: "Good Job!",
      sub: "Solid performance. Keep practicing to improve further.",
      Icon: ThumbsUp,
      color: "text-green-500",
    };
  if (pct >= 40)
    return {
      grade: "Average",
      sub: "Good effort! Focus on weaker areas and practice more mock tests.",
      Icon: BookOpen,
      color: "text-primary",
    };
  return {
    grade: "Needs More Practice",
    sub: "Keep going! Review your concepts and attempt more tests.",
    Icon: Dumbbell,
    color: "text-red-500",
  };
}
