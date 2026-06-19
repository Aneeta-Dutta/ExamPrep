import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import ThemeProvider from "@/components/ThemeProvider";
import { getOptionalUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UGC NET Prep",
  description:
    "Prepare for UGC NET Paper I — previous year questions with answer keys, timed mock tests, progress tracking, and a leaderboard.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getOptionalUser();
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <html lang="en" className={`${geistSans.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider>
          <AppShell
            userEmail={user?.email ?? null}
            displayName={displayName}
            authEnabled={isSupabaseConfigured}
          >
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
