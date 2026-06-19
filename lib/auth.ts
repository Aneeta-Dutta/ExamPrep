import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

// Returns the signed-in user, or null when Supabase isn't configured / nobody
// is signed in. Never throws, so pages stay renderable without a backend.
export async function getOptionalUser() {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}
