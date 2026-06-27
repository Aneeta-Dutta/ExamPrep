import {
  Info,
  Lightbulb,
  GraduationCap,
  AlertTriangle,
  Sparkles,
  Target,
  PencilLine,
} from "lucide-react";
import type { Block } from "@/lib/study/types";

// Renders authored study content (an ordered list of typed blocks).
export default function StudyContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}

const CALLOUTS = {
  note: { Icon: Info, label: "Note", color: "var(--primary-l)" },
  tip: { Icon: Lightbulb, label: "Memory aid", color: "#0a8f5b" },
  exam: { Icon: GraduationCap, label: "Exam focus", color: "var(--primary)" },
  warn: { Icon: AlertTriangle, label: "Common mistake", color: "#c0392b" },
  analogy: { Icon: Sparkles, label: "Think of it like…", color: "#7c3aed" },
  key: { Icon: Target, label: "Key idea", color: "var(--primary)" },
  try: { Icon: PencilLine, label: "Pause & try", color: "#c2410c" },
} as const;

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "h":
      return (
        <h3 className="pt-1 text-[15px] font-extrabold text-ink">{block.text}</h3>
      );
    case "p":
      return (
        <p className="text-[13.5px] leading-relaxed text-ink/85">
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-1.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13.5px] leading-relaxed text-ink/85"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-1.5">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink/85"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-bg text-[11px] font-bold text-primary">
                {i + 1}
              </span>
              <span className="pt-px">
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th
                    key={i}
                    className="border border-line bg-primary-bg px-2.5 py-2 text-left font-bold text-primary"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="border border-line px-2.5 py-2 align-top text-ink/85"
                    >
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout": {
      const { Icon, label, color } = CALLOUTS[block.tone];
      return (
        <div
          className="rounded-lg border border-line bg-card px-4 py-3"
          style={{ borderLeft: `3px solid ${color}` }}
        >
          <div
            className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ color }}
          >
            <Icon size={14} strokeWidth={2.4} />
            {block.title ?? label}
          </div>
          <p className="text-[13px] leading-relaxed text-ink/85">
            <Inline text={block.text} />
          </p>
        </div>
      );
    }
    case "diagram":
      return (
        <figure className="rounded-lg border border-line bg-card px-4 py-4">
          <div
            className="mx-auto max-w-[420px] [&_svg]:h-auto [&_svg]:w-full"
            dangerouslySetInnerHTML={{ __html: block.svg }}
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-[11.5px] text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border border-line bg-bg px-3.5 py-3 text-[12.5px] leading-relaxed text-ink">
          <code>{block.text}</code>
        </pre>
      );
    case "formula":
      return (
        <div className="rounded-lg border border-line bg-primary-bg px-4 py-3 text-center font-mono text-[13.5px] font-semibold text-primary">
          {block.text}
        </div>
      );
  }
}

// Minimal inline formatter: **bold**, *italic*, `code`.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-bold text-ink">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code
              key={i}
              className="rounded bg-bg px-1 py-0.5 font-mono text-[0.92em] text-primary"
            >
              {p.slice(1, -1)}
            </code>
          );
        if (p.startsWith("*") && p.endsWith("*"))
          return (
            <em key={i} className="italic">
              {p.slice(1, -1)}
            </em>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
