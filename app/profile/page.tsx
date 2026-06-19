"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { getAttempts, getBookmarks, type LocalAttempt } from "@/lib/local-store";
import { getQuestionById } from "@/lib/content";

export default function ProfilePage() {
  const [attempts, setAttempts] = useState<LocalAttempt[]>([]);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setAttempts(getAttempts());
    setBookmarkIds(getBookmarks());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Topic-wise accuracy across all attempts.
  const topicAgg = new Map<string, { attempted: number; correct: number }>();
  for (const a of attempts) {
    for (const [qid, chosen] of Object.entries(a.answers ?? {})) {
      const q = getQuestionById(qid);
      if (!q) continue;
      const t = topicAgg.get(q.topic) ?? { attempted: 0, correct: 0 };
      t.attempted++;
      if (chosen === q.answer_index) t.correct++;
      topicAgg.set(q.topic, t);
    }
  }
  const topics = [...topicAgg.entries()]
    .map(([topic, v]) => ({
      topic,
      ...v,
      accuracy: v.attempted ? Math.round((v.correct / v.attempted) * 100) : 0,
    }))
    .sort((a, b) => b.attempted - a.attempted);

  const bestScore = attempts.reduce((m, a) => Math.max(m, a.score_pct), 0);
  const avgScore = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.score_pct, 0) / attempts.length)
    : 0;

  const bookmarks = bookmarkIds
    .map((id) => getQuestionById(id))
    .filter((q): q is NonNullable<typeof q> => !!q);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg text-primary">
          <BarChart3 size={18} strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-xl font-extrabold">My Progress</h2>
          <p className="mt-0.5 text-[13px] text-muted">
            Saved on this device. Take mock tests to build your history.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Summary v={attempts.length} l="Tests Taken" />
        <Summary v={`${bestScore}%`} l="Best Score" />
        <Summary v={`${avgScore}%`} l="Avg Score" />
      </div>

      {/* Topic progress */}
      <SectionLabel>Accuracy by Topic</SectionLabel>
      {topics.length === 0 ? (
        <div className="card mb-6 px-5 py-6 text-center text-[13px] text-muted">
          {ready ? "Take a mock test to see your topic-wise accuracy." : "Loading…"}
        </div>
      ) : (
        <div className="card mb-6 px-5 py-4">
          <div className="space-y-3">
            {topics.map((t) => (
              <div key={t.topic}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="font-semibold">{t.topic}</span>
                  <span className="text-muted">
                    {t.correct}/{t.attempted} · {t.accuracy}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg">
                  <div
                    className={`h-full rounded-full ${
                      t.accuracy >= 70
                        ? "bg-green-500"
                        : t.accuracy >= 40
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${t.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      <SectionLabel>Test History</SectionLabel>
      {attempts.length === 0 ? (
        <div className="card mb-6 px-5 py-6 text-center text-[13px] text-muted">
          No attempts yet.{" "}
          <Link href="/mock" className="font-bold text-primary hover:underline">
            Take your first mock test →
          </Link>
        </div>
      ) : (
        <div className="card mb-6 overflow-hidden">
          {attempts.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-bold">{a.set_name}</div>
                <div className="text-[11px] text-muted">
                  {new Date(a.created_at).toLocaleDateString()} · {a.correct}/{a.total} correct
                </div>
              </div>
              <div
                className={`text-lg font-extrabold ${
                  a.score_pct >= 60
                    ? "text-green-600 dark:text-green-400"
                    : a.score_pct >= 40
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                }`}
              >
                {a.score_pct}%
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookmarks */}
      <SectionLabel>Bookmarked Questions</SectionLabel>
      {bookmarks.length === 0 ? (
        <div className="card px-5 py-6 text-center text-[13px] text-muted">
          No bookmarks yet. Tap the bookmark icon on any{" "}
          <Link href="/pyq" className="font-bold text-primary hover:underline">
            PYQ
          </Link>{" "}
          to save it.
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((q) => (
            <div key={q.id} className="card px-4 py-3.5">
              <div className="mb-1 flex flex-wrap gap-2">
                <span className="chip bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {q.topic}
                </span>
                {q.year_session && (
                  <span className="chip bg-primary-bg text-primary">{q.year_session}</span>
                )}
              </div>
              <div className="text-[13px] font-medium leading-relaxed">{q.question}</div>
              <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-green-600 dark:text-green-400">
                <CheckCircle2 size={14} strokeWidth={2.4} />
                {q.options[q.answer_index]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Summary({ v, l }: { v: number | string; l: string }) {
  return (
    <div className="card px-3 py-4 text-center">
      <div className="text-[24px] font-extrabold text-primary">{v}</div>
      <div className="mt-0.5 text-[11px] text-muted">{l}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
      {children}
    </div>
  );
}
