import Link from "next/link";
import { FileText, Clock, ListChecks } from "lucide-react";
import { MOCK_SETS, mockBySet } from "@/lib/content";

export default function MockPage() {
  const sets = MOCK_SETS.map((name) => ({
    name,
    count: mockBySet[name].length,
  }));

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold">Mock Tests</h2>
        <p className="mt-0.5 text-[13px] text-muted">
          Timed practice tests that simulate the real exam. No negative marking.
        </p>
      </div>

      {sets.length === 0 ? (
        <div className="card px-6 py-10 text-center text-sm text-muted">
          No mock tests bundled yet.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {sets.map(({ name, count }) => {
            const minutes = Math.max(10, Math.round(count * 1.5));
            return (
              <div key={name} className="card flex flex-col px-5 py-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-bg text-primary">
                  <FileText size={22} strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-extrabold">{name}</h3>
                <div className="mt-1.5 mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
                  <span className="inline-flex items-center gap-1">
                    <ListChecks size={14} strokeWidth={2.2} /> {count} questions
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} strokeWidth={2.2} /> {minutes} min
                  </span>
                  <span>{count * 2} marks</span>
                </div>
                <Link
                  href={`/mock/${encodeURIComponent(name)}`}
                  className="btn-primary mt-auto"
                >
                  Start Test
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
