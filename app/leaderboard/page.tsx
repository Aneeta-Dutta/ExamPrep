import Link from "next/link";
import { Trophy, Medal } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type Row = {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  best_score: number;
  tests_taken: number;
  avg_score: number;
  last_played: string;
};

export default async function LeaderboardPage() {
  let rows: Row[] = [];
  let error: unknown = null;
  let user: { id: string } | null = null;

  // The global leaderboard is the one feature that genuinely needs a backend.
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const res = await supabase.rpc("public_leaderboard", { limit_n: 50 });
    error = res.error;
    rows = (res.data ?? []) as Row[];
    const auth = await supabase.auth.getUser();
    user = auth.data.user ? { id: auth.data.user.id } : null;
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-bg text-primary">
          <Trophy size={18} strokeWidth={2.2} />
        </span>
        <div>
          <h2 className="text-xl font-extrabold">Leaderboard</h2>
          <p className="mt-0.5 text-[13px] text-muted">
            Top scorers ranked by their best mock-test result.
          </p>
        </div>
      </div>

      {!isSupabaseConfigured ? (
        <div className="card px-6 py-8 text-center text-sm text-muted">
          The global leaderboard needs cloud sync (Supabase) to compare scores
          across users. Your own scores are saved on this device under{" "}
          <Link href="/profile" className="font-bold text-primary hover:underline">
            My Progress
          </Link>
          .
        </div>
      ) : error ? (
        <div className="card px-6 py-8 text-center text-sm text-muted">
          Leaderboard unavailable. Make sure the database schema (and{" "}
          <code>public_leaderboard</code> function) has been applied.
        </div>
      ) : rows.length === 0 ? (
        <div className="card px-6 py-10 text-center text-sm text-muted">
          No scores yet. Be the first — take a{" "}
          <Link href="/mock" className="font-bold text-primary hover:underline">
            mock test
          </Link>
          !
        </div>
      ) : (
        <div className="card overflow-hidden">
          {rows.map((r, i) => {
            const isMe = user && r.user_id === user.id;
            const medalColor = ["text-amber-400", "text-slate-400", "text-amber-700"][i];
            return (
              <div
                key={r.user_id}
                className={`flex items-center gap-3 border-b border-line px-4 py-3 last:border-0 ${
                  isMe ? "bg-primary-bg" : ""
                }`}
              >
                <div className="flex w-7 items-center justify-center">
                  {i < 3 ? (
                    <Medal size={20} strokeWidth={2.2} className={medalColor} />
                  ) : (
                    <span className="text-[14px] font-extrabold text-muted">{i + 1}</span>
                  )}
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-bg text-sm font-bold text-primary">
                  {(r.display_name ?? "U").charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-bold">
                    {r.display_name ?? "Anonymous"}
                    {isMe && (
                      <span className="ml-2 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted">
                    {r.tests_taken} test{r.tests_taken === 1 ? "" : "s"} · avg{" "}
                    {Math.round(r.avg_score)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-primary">
                    {r.best_score}%
                  </div>
                  <div className="text-[10px] text-muted">best</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
