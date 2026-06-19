// Browser-local persistence so personal data (bookmarks + mock-test history)
// works with zero backend. When Supabase is configured these can be synced to
// the cloud too, but the app never depends on it.

export type LocalAttempt = {
  id: string;
  set_name: string;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  score_pct: number;
  duration_sec: number;
  answers: Record<string, number>; // questionId -> chosen option index
  created_at: string;
};

const BOOKMARKS_KEY = "ugcnet:bookmarks";
const ATTEMPTS_KEY = "ugcnet:attempts";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently.
  }
}

// ---- Bookmarks ----
export function getBookmarks(): string[] {
  return read<string[]>(BOOKMARKS_KEY, []);
}

export function toggleBookmark(id: string): string[] {
  const current = new Set(getBookmarks());
  if (current.has(id)) current.delete(id);
  else current.add(id);
  const next = [...current];
  write(BOOKMARKS_KEY, next);
  return next;
}

// ---- Attempts (mock-test history) ----
export function getAttempts(): LocalAttempt[] {
  return read<LocalAttempt[]>(ATTEMPTS_KEY, []);
}

export function addAttempt(attempt: LocalAttempt) {
  const all = getAttempts();
  all.unshift(attempt);
  write(ATTEMPTS_KEY, all.slice(0, 100)); // cap history
}
