// Client-side search index for Study Mode lessons and PYQ questions.
//
// The whole index is built ONCE at module load from the already-bundled content
// (no network, no backend). Matching is a fast hand-rolled tokenized scorer —
// for a few thousand items it runs in well under a millisecond, so typing stays
// perfectly smooth with zero latency.

import { SYLLABUS, getContent } from "./study/syllabus";
import type { Block, Topic } from "./study/types";
import { pyqBySession } from "./content";

export type SearchResult = {
  kind: "study" | "pyq";
  id: string;
  title: string; // lesson title, or the question text
  subtitle: string; // breadcrumb (study) or "Topic · Year" (pyq)
  snippet?: string; // body excerpt with the match (study only)
  href: string;
  score: number;
};

// ---- Flatten content into searchable records (built once) ----------------

type StudyRec = {
  id: string;
  title: string;
  titleLC: string;
  crumb: string;
  bodyLC: string;
  body: string;
  href: string;
};

type PyqRec = {
  id: string;
  title: string;
  titleLC: string;
  topic: string;
  topicLC: string;
  bodyLC: string;
  year: string;
  href: string;
};

function clean(s: string): string {
  // Strip the lightweight inline markdown markers so matches/snippets are clean.
  return s.replace(/[*`]/g, "").replace(/\\(.)/g, "$1").replace(/\s+/g, " ").trim();
}

function blockText(b: Block): string {
  switch (b.kind) {
    case "h":
    case "p":
    case "code":
    case "formula":
      return b.text;
    case "ul":
    case "ol":
      return b.items.join(" ");
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
    case "callout":
      return (b.title ? b.title + " " : "") + b.text;
    case "diagram":
      return b.caption ?? "";
  }
}

const STUDY: StudyRec[] = [];
const PYQ: PyqRec[] = [];

function walk(topics: Topic[], idTrail: string[], crumb: string) {
  for (const t of topics) {
    const ids = [...idTrail, t.id];
    const content = getContent(t.id);
    const body = clean(
      content ? content.map(blockText).join(" ") : t.summary ?? "",
    );
    STUDY.push({
      id: t.id,
      title: t.title,
      titleLC: t.title.toLowerCase(),
      crumb,
      bodyLC: body.toLowerCase(),
      body,
      href: `/study/${ids.join("/")}`,
    });
    if (t.children?.length) walk(t.children, ids, `${crumb} › ${t.title}`);
  }
}

for (const unit of SYLLABUS) {
  walk(unit.topics, [unit.id], `Unit ${unit.number} · ${unit.title}`);
}

for (const [session, qs] of Object.entries(pyqBySession)) {
  qs.forEach((q) => {
    const body = [q.question, ...q.options, q.explanation].join(" ");
    PYQ.push({
      id: q.id,
      title: q.question,
      titleLC: q.question.toLowerCase(),
      topic: q.topic,
      topicLC: q.topic.toLowerCase(),
      bodyLC: body.toLowerCase(),
      year: session,
      href: `/pyq?q=${encodeURIComponent(q.id)}`,
    });
  });
}

// ---- Scoring -------------------------------------------------------------

// Returns 0 when any query term is missing everywhere (so results are an AND of
// terms); otherwise a relevance score that ranks title hits far above body hits.
function score(
  titleLC: string,
  midLC: string, // a secondary field (topic), weighted between title and body
  bodyLC: string,
  terms: string[],
  phrase: string,
): number {
  let s = 0;
  if (titleLC === phrase) s += 1000;
  else if (titleLC.startsWith(phrase)) s += 400;
  else if (titleLC.includes(phrase)) s += 240;

  for (const t of terms) {
    if (titleLC.includes(t)) {
      s += titleLC.startsWith(t) || titleLC.includes(" " + t) ? 120 : 80;
    } else if (midLC.includes(t)) {
      s += 60;
    } else if (bodyLC.includes(t)) {
      s += 18;
    } else {
      return 0; // a term appears nowhere → not a match
    }
  }
  return s;
}

function makeSnippet(body: string, terms: string[]): string {
  const lc = body.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    const p = lc.indexOf(t);
    if (p >= 0 && (pos < 0 || p < pos)) pos = p;
  }
  if (pos < 0) return body.slice(0, 120);
  const start = Math.max(0, pos - 40);
  const end = Math.min(body.length, start + 150);
  return (start > 0 ? "… " : "") + body.slice(start, end).trim() + (end < body.length ? " …" : "");
}

export type SearchResults = {
  study: SearchResult[];
  pyq: SearchResult[];
  total: number;
};

const LIMIT = 6;

export function search(raw: string): SearchResults {
  const phrase = raw.trim().toLowerCase();
  if (phrase.length < 2) return { study: [], pyq: [], total: 0 };
  const terms = phrase.split(/\s+/).filter(Boolean);

  const study: SearchResult[] = [];
  for (const r of STUDY) {
    const sc = score(r.titleLC, r.crumb.toLowerCase(), r.bodyLC, terms, phrase);
    if (sc > 0) {
      study.push({
        kind: "study",
        id: r.id,
        title: r.title,
        subtitle: r.crumb,
        snippet: makeSnippet(r.body, terms),
        href: r.href,
        score: sc,
      });
    }
  }

  const pyq: SearchResult[] = [];
  for (const r of PYQ) {
    const sc = score(r.titleLC, r.topicLC, r.bodyLC, terms, phrase);
    if (sc > 0) {
      pyq.push({
        kind: "pyq",
        id: r.id,
        title: r.title,
        subtitle: `${r.topic} · ${r.year}`,
        href: r.href,
        score: sc,
      });
    }
  }

  study.sort((a, b) => b.score - a.score);
  pyq.sort((a, b) => b.score - a.score);
  const total = study.length + pyq.length;
  return { study: study.slice(0, LIMIT), pyq: pyq.slice(0, LIMIT), total };
}

// A few high-yield jump targets for the empty state.
export const POPULAR: { title: string; href: string }[] = [
  { title: "OSI Reference Model", href: "/study/networks/net-osi" },
  { title: "Serializability & Precedence Graph", href: "/study/dbms/normalization-db/dbms-serializability" },
  { title: "CPU Scheduling", href: "/study/system-software-os/cpu-scheduling" },
  { title: "Propositional Logic", href: "/study/discrete-structures-optimization/math-logic/prop-logic" },
  { title: "Normalization", href: "/study/dbms/normalization-db/normalization" },
];
