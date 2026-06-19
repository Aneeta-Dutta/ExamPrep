// Supabase is OPTIONAL. The app's core study features (PYQ + mock tests) work
// entirely from bundled content with no backend. Supabase only adds cloud
// accounts and the cross-user leaderboard when properly configured.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  !!url &&
  !!key &&
  !url.includes("placeholder") &&
  !key.includes("placeholder");
