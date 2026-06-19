// Bundled question content — the app reads from here so PYQ browsing and mock
// tests work with NO backend. (The same seed data can optionally be pushed to
// Supabase via `npm run seed`, but it is not required for the app to function.)

import { PYQ, MOCK, type SeedQuestion } from "./seed-data";
import type { Question } from "./types";

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toQuestion(
  q: SeedQuestion,
  i: number,
  idPrefix: string,
  source: "pyq" | "mock",
  year_session: string | null,
  set_name: string | null,
): Question {
  return {
    id: `${idPrefix}-${i + 1}`,
    exam: "UGC NET",
    source,
    year_session,
    set_name,
    q_order: i,
    topic: q.topic,
    question: q.question,
    options: q.options,
    answer_index: q.answer_index,
    explanation: q.explanation,
  };
}

// PYQ grouped by session, in the order defined in seed-data (newest first).
export const PYQ_SESSIONS = Object.keys(PYQ);
export const pyqBySession: Record<string, Question[]> = Object.fromEntries(
  Object.entries(PYQ).map(([session, qs]) => [
    session,
    qs.map((q, i) => toQuestion(q, i, `pyq-${slug(session)}`, "pyq", session, null)),
  ]),
);

// Mock sets.
export const MOCK_SETS = Object.keys(MOCK);
export const mockBySet: Record<string, Question[]> = Object.fromEntries(
  Object.entries(MOCK).map(([setName, qs]) => [
    setName,
    qs.map((q, i) => toQuestion(q, i, `mock-${slug(setName)}`, "mock", null, setName)),
  ]),
);

// Fast id -> question lookup (used to compute topic-wise progress).
const byId = new Map<string, Question>(
  [...Object.values(pyqBySession), ...Object.values(mockBySet)]
    .flat()
    .map((q) => [q.id, q]),
);
export function getQuestionById(id: string): Question | undefined {
  return byId.get(id);
}

export const contentCounts = {
  pyq: Object.values(pyqBySession).reduce((n, a) => n + a.length, 0),
  mock: Object.values(mockBySet).reduce((n, a) => n + a.length, 0),
  years: PYQ_SESSIONS.length,
  mockSets: MOCK_SETS.length,
};
