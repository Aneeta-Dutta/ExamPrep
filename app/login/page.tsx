import Link from "next/link";
import { redirect } from "next/navigation";
import { getOptionalUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  // Accounts are an optional feature. Without Supabase, sign-in isn't available
  // (and everything still works locally), so show a friendly notice.
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-md">
        <div className="card px-6 py-7 text-center">
          <h1 className="text-xl font-extrabold">Accounts are optional</h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            This deployment runs without cloud accounts. Your bookmarks and
            mock-test scores are saved on this device — no sign-in needed. Jump
            straight into a{" "}
            <Link href="/mock" className="font-bold text-primary hover:underline">
              mock test
            </Link>{" "}
            or browse{" "}
            <Link href="/pyq" className="font-bold text-primary hover:underline">
              previous year questions
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  const user = await getOptionalUser();
  if (user) redirect("/");

  const { error, message } = await searchParams;

  return (
    <div className="mx-auto max-w-md">
      <div className="card px-6 py-7">
        <h1 className="text-xl font-extrabold">Sign in</h1>
        <p className="mt-1 mb-5 text-[13px] text-muted">
          Sign in to sync scores, bookmarks, and progress across devices.
        </p>
        <LoginForm error={error} message={message} />
      </div>
    </div>
  );
}
