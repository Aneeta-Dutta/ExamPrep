// Domain types for Study Mode — a structured, exam-oriented notes system for
// UGC NET Paper 2 (Subject 087, Computer Science & Applications).
//
// Study content is authored as an ordered list of typed "blocks" rather than
// raw HTML/markdown, so each piece renders consistently and we keep full control
// over diagrams (authored inline as SVG). Paragraph / list / cell text supports
// a tiny inline syntax: **bold**, *italic* and `code`.

export type Block =
  | { kind: "h"; text: string } // sub-heading inside a topic
  | { kind: "p"; text: string } // paragraph
  | { kind: "ul"; items: string[] } // bullet list
  | { kind: "ol"; items: string[] } // numbered list
  | { kind: "table"; head: string[]; rows: string[][] }
  | {
      kind: "callout";
      // note = aside · tip = memory aid · exam = NET focus · warn = common mistake
      // analogy = real-world bridge · key = key idea to lock in · try = active-recall prompt
      tone: "note" | "tip" | "exam" | "warn" | "analogy" | "key" | "try";
      title?: string;
      text: string;
    }
  | { kind: "diagram"; caption?: string; svg: string } // authored inline SVG
  | { kind: "code"; text: string }
  | { kind: "formula"; text: string };

// A topic (or sub-topic — they nest via `children`). A node may carry its own
// study content, act purely as a grouping of sub-topics, or both.
export type Topic = {
  id: string; // unique slug used in the URL
  title: string;
  summary?: string;
  children?: Topic[];
};

export type Unit = {
  id: string; // unique slug used in the URL
  number: number; // syllabus unit number (1–10)
  title: string;
  summary: string;
  topics: Topic[];
};
