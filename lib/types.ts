// Shared domain types matching the database schema.

export type Question = {
  id: string;
  exam: string; // e.g. "UGC NET Paper 1"
  source: "pyq" | "mock";
  year_session: string | null; // e.g. "June 2023" (null for mock sets)
  set_name: string | null; // e.g. "Mock Test 1" (null for PYQ)
  q_order: number;
  topic: string;
  question: string;
  options: string[];
  answer_index: number; // 0-based correct option
  explanation: string;
};

export type Attempt = {
  id: string;
  user_id: string;
  set_name: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score_pct: number;
  duration_sec: number;
  answers: Record<string, number>; // questionId -> selected option index
  created_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  question_id: string;
  created_at: string;
};

export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type TopicProgress = {
  topic: string;
  attempted: number;
  correct: number;
  accuracy: number;
};

export const OPTION_LABELS = ["A", "B", "C", "D", "E"] as const;
