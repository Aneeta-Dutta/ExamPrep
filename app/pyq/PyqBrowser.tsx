"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { OPTION_LABELS, type Question } from "@/lib/types";
import { getBookmarks, toggleBookmark } from "@/lib/local-store";

export default function PyqBrowser({
  grouped,
  sessions,
}: {
  grouped: Record<string, Question[]>;
  sessions: string[];
}) {
  const [year, setYear] = useState(sessions[0]);
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  // Bookmarks live in the browser (localStorage) — load on mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBookmarks(new Set(getBookmarks()));
  }, []);

  const questions = grouped[year] ?? [];
  const allOpen = questions.length > 0 && questions.every((q) => open.has(q.id));

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setOpen((prev) => {
      const next = new Set(prev);
      if (allOpen) questions.forEach((q) => next.delete(q.id));
      else questions.forEach((q) => next.add(q.id));
      return next;
    });
  }

  function onBookmark(id: string) {
    const next = toggleBookmark(id);
    setBookmarks(new Set(next));
  }

  return (
    <div>
      {/* Year tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {sessions.map((s) => (
          <button
            key={s}
            onClick={() => setYear(s)}
            className={`rounded-full border-[1.5px] px-4 py-1.5 text-[12px] font-semibold transition ${
              s === year
                ? "border-primary bg-primary text-white"
                : "border-line bg-card text-muted hover:border-primary-l hover:text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-[12.5px] text-muted">{questions.length} questions</span>
        <button
          onClick={toggleAll}
          className="rounded-md border-[1.5px] border-line px-3 py-1.5 text-[11.5px] font-semibold text-primary transition hover:border-primary-l"
        >
          {allOpen ? "Hide All Answers" : "Show All Answers"}
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => {
          const isOpen = open.has(q.id);
          const saved = bookmarks.has(q.id);
          return (
            <div key={q.id} className="card px-4 py-4">
              <div className="mb-2.5 flex flex-wrap items-start gap-2">
                <span className="chip bg-primary-bg text-primary">Q{i + 1}</span>
                <span className="chip bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  {q.topic}
                </span>
                <span className="flex-1 text-[13.5px] font-medium leading-relaxed">
                  {q.question}
                </span>
                <button
                  aria-label="Bookmark"
                  onClick={() => onBookmark(q.id)}
                  className={`shrink-0 transition ${
                    saved ? "text-primary" : "text-muted hover:text-primary"
                  }`}
                  title={saved ? "Remove bookmark" : "Bookmark this question"}
                >
                  {saved ? (
                    <BookmarkCheck size={18} strokeWidth={2.2} />
                  ) : (
                    <Bookmark size={18} strokeWidth={2.2} />
                  )}
                </button>
              </div>

              <div className="mb-2.5 grid gap-1.5">
                {q.options.map((o, oi) => (
                  <div
                    key={oi}
                    className="flex items-start gap-2.5 rounded-md border-[1.5px] border-line px-3 py-2 text-[13px]"
                  >
                    <span className="mt-px shrink-0 text-[11.5px] font-extrabold text-primary">
                      {OPTION_LABELS[oi]}.
                    </span>
                    <span>{o}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => toggle(q.id)}
                className="rounded-md border-[1.5px] border-line px-3 py-1.5 text-[11px] font-bold text-muted transition hover:border-green-500 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-500/10"
              >
                {isOpen ? "Hide Answer" : "Show Answer"}
              </button>

              {isOpen && (
                <div className="mt-2.5 rounded-lg border-[1.5px] border-green-500/40 bg-green-500/10 px-3.5 py-2.5 text-[12.5px]">
                  <span className="flex items-center gap-1.5 font-bold text-green-600 dark:text-green-400">
                    <CheckCircle2 size={15} strokeWidth={2.4} />
                    Correct Answer: {OPTION_LABELS[q.answer_index]}.{" "}
                    {q.options[q.answer_index]}
                  </span>
                  <div className="mt-1.5 leading-relaxed text-muted">
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
