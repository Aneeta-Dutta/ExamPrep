import { BookOpen, Check, ListChecks, Clock, Award, Ban } from "lucide-react";
import { PAPER2_SYLLABUS } from "@/lib/syllabus";

export const metadata = {
  title: "Syllabus — UGC NET Paper 2 (Computer Science & Applications)",
};

export default function SyllabusPage() {
  const subjectCount = PAPER2_SYLLABUS.reduce(
    (n, g) => n + g.subjects.length,
    0,
  );
  const topicCount = PAPER2_SYLLABUS.reduce(
    (n, g) => n + g.subjects.reduce((m, s) => m + s.topics.length, 0),
    0,
  );

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-extrabold">Syllabus</h2>
        <p className="mt-0.5 text-[13px] text-muted">
          Paper 2 · Subject 087 — Computer Science &amp; Applications. Subject-wise
          breakdown of the topics seen in recent papers.
        </p>
      </div>

      {/* Exam meta */}
      <div className="card mb-6 border-l-[3px] border-l-primary px-5 py-4">
        <div className="grid grid-cols-2 gap-2.5 text-[12px] text-muted sm:grid-cols-4">
          <Meta Icon={ListChecks} label="Questions" value="100 (MCQ)" />
          <Meta Icon={Clock} label="Duration" value="3 hours" />
          <Meta Icon={Award} label="Marks" value="200" />
          <Meta Icon={Ban} label="Negative" value="None" />
        </div>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <Chip>{subjectCount} subjects</Chip>
          <Chip>{topicCount} key topics</Chip>
        </div>
      </div>

      <div className="space-y-4">
        {PAPER2_SYLLABUS.map((group) => (
          <div key={group.title} className="card px-5 py-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-bg text-primary">
                <BookOpen size={20} strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-extrabold">{group.title}</h3>
            </div>

            <div className="space-y-4">
              {group.subjects.map((subject) => (
                <div key={subject.subject}>
                  <div className="text-[13px] font-bold text-ink">
                    {subject.subject}
                  </div>
                  {subject.note && (
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                      {subject.note}
                    </p>
                  )}
                  <ul className="mt-2 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                    {subject.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-[12.5px] leading-relaxed text-muted"
                      >
                        <Check
                          size={14}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-bg px-3 py-1 text-[11.5px] font-semibold text-muted">
      {children}
    </span>
  );
}

function Meta({
  Icon,
  label,
  value,
}: {
  Icon: typeof BookOpen;
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
