import { Suspense } from "react";
import { PYQ_SESSIONS, pyqBySession } from "@/lib/content";
import PyqBrowser from "./PyqBrowser";

export default function PyqPage() {
  const sessions = PYQ_SESSIONS;

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold">Previous Year Questions</h2>
        <p className="mt-0.5 text-[13px] text-muted">
          UGC NET — select a year/session to browse questions with answer keys
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="card px-6 py-10 text-center text-sm text-muted">
          No questions bundled yet.
        </div>
      ) : (
        <Suspense fallback={null}>
          <PyqBrowser grouped={pyqBySession} sessions={sessions} />
        </Suspense>
      )}
    </div>
  );
}
