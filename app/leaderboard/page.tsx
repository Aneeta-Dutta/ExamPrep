"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trophy, Medal, Clock } from "lucide-react";
import { getAttempts, type LocalAttempt } from "@/lib/local-store";

// A fully local, backend-free scoreboard: your own mock-test attempts ranked
// best-first. No accounts, no servers, no cost — scores are saved in this
// browser. (A cross-user leaderboard would require a shared backend.)
export default function ScoresPage() {
  const [attempts, setAttempts] = useState<LocalAttempt[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setAttempts(getAttempts());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const ranked = [...attempts].sort(
    (a, b) =>
      b.score_pct - a.score_pct ||
      +new Date(b.created_at) - +new Date(a.created_at),
  );
  const best = ranked.length ? ranked[0].score_pct : 0;
  const avg = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.score_pct, 0) / attempts.length)
    : 0;

  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg text-primary">
          <Trophy size={18} strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-xl font-extrabold">My Scores</h2>
          <p className="mt-0.5 text-[13px] text-muted">
            Your mock-test attempts, ranked best first. Beat your own record!
          </p>
        </div>
      </div>

      {!ready ? null : attempts.length === 0 ? (
        <div className="card px-6 py-10 text-center text-sm text-muted">
          No scores yet. Take a{" "}
          <Link href="/mock" className="font-bold text-primary hover:underline">
            mock test
          </Link>{" "}
          to start your record.
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { num: `${best}%`, lbl: "Best" },
              { num: `${avg}%`, lbl: "Average" },
              { num: attempts.length, lbl: "Tests" },
            ].map((s) => (
              <div key={s.lbl} className="card px-3 py-4 text-center">
                <div className="text-[24px] font-extrabold text-primary">{s.num}</div>
                <div className="mt-0.5 text-[11px] text-muted">{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Ranked attempts */}
          <div className="card overflow-hidden">
            {ranked.map((a, i) => {
              const medalColor =
                ["text-amber-400", "text-slate-400", "text-amber-700"][i] ?? "";
              const date = new Date(a.created_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
              });
              return (
                <div
                  key={a.id}
                  className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-0"
                >
                  <div className="flex w-7 items-center justify-center">
                    {i < 3 ? (
                      <Medal size={20} strokeWidth={2.2} className={medalColor} />
                    ) : (
                      <span className="text-[14px] font-extrabold text-muted">
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold">{a.set_name}</div>
                    <div className="flex items-center gap-2 text-[11px] text-muted">
                      <span>
                        {a.correct}/{a.total} correct
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} strokeWidth={2.2} /> {date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold text-primary">
                      {a.score_pct}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-[11px] text-muted">
            Scores are saved privately in this browser — no account needed.
          </p>
        </>
      )}
    </div>
  );
}
