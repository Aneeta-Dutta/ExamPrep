import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "./config";

// Refreshes the auth session on every request and keeps cookies in sync.
export async function updateSession(request: NextRequest) {
  // Skip entirely when Supabase isn't configured — otherwise every request
  // would hang trying to reach a non-existent auth server.
  if (!isSupabaseConfigured) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: refreshes the session. Do not run code between client creation
  // and getUser() — it can log users out unexpectedly.
  await supabase.auth.getUser();

  return response;
}
