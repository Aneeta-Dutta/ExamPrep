/**
 * Seed script — uploads PYQ + mock questions to Supabase.
 *
 * Usage:
 *   1. Fill in .env.local (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
 *   2. npm run seed
 *
 * Safe to re-run: it deletes existing seeded questions first, then re-inserts.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { PYQ, MOCK, type SeedQuestion } from "../lib/seed-data";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "✗ Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

type Row = {
  source: "pyq" | "mock";
  year_session: string | null;
  set_name: string | null;
  q_order: number;
  topic: string;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
};

function buildRows(): Row[] {
  const rows: Row[] = [];

  for (const [session, qs] of Object.entries(PYQ)) {
    qs.forEach((q: SeedQuestion, i) => {
      rows.push({
        source: "pyq",
        year_session: session,
        set_name: null,
        q_order: i,
        ...q,
      });
    });
  }

  for (const [setName, qs] of Object.entries(MOCK)) {
    qs.forEach((q: SeedQuestion, i) => {
      rows.push({
        source: "mock",
        year_session: null,
        set_name: setName,
        q_order: i,
        ...q,
      });
    });
  }

  return rows;
}

async function main() {
  const rows = buildRows();
  console.log(`Preparing to seed ${rows.length} questions...`);

  // Clear existing questions so re-runs stay idempotent.
  const { error: delErr } = await supabase
    .from("questions")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.error("✗ Failed to clear questions:", delErr.message);
    process.exit(1);
  }

  const { error: insErr, count } = await supabase
    .from("questions")
    .insert(rows, { count: "exact" });
  if (insErr) {
    console.error("✗ Insert failed:", insErr.message);
    process.exit(1);
  }

  console.log(`✓ Seeded ${count ?? rows.length} questions.`);
  console.log(
    `  PYQ sessions: ${Object.keys(PYQ).length} · Mock sets: ${Object.keys(MOCK).length}`,
  );
}

main();
