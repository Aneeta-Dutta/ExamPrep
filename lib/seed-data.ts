// Source content for the seed script. Edit here (or in the Supabase dashboard
// after seeding) to add more years / questions.
import { UGCNET_DEC2025 } from "./seed-ugcnet-dec2025";
import { UGCNET_AUG2024_CS } from "./seed-ugcnet-aug2024-cs";
import { UGCNET_JAN2025_CS } from "./seed-ugcnet-jan2025-cs";

export type SeedQuestion = {
  topic: string;
  question: string;
  options: string[];
  answer_index: number;
  explanation: string;
};

// ---- Previous Year Questions, grouped by exam session ----
// Only real exam papers provided by the user are kept here.
export const PYQ: Record<string, SeedQuestion[]> = {
  "December 2025": UGCNET_DEC2025,
  "January 2025": UGCNET_JAN2025_CS,
  "August 2024": UGCNET_AUG2024_CS,
};

// ---- Mock test sets ----
// Only real exam papers provided by the user are kept here.
export const MOCK: Record<string, SeedQuestion[]> = {
  "UGC NET CS & Applications — Dec 2025 (Shift 2)": UGCNET_DEC2025,
  "UGC NET CS & Applications — Jan 2025 (Shift 1)": UGCNET_JAN2025_CS,
  "UGC NET CS & Applications — Aug 2024 (Shift 1)": UGCNET_AUG2024_CS,
};
