"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Library,
  PencilLine,
  Trophy,
  BarChart3,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { signOut } from "@/lib/auth-actions";
import ThemeToggle from "@/components/ThemeToggle";

const NAV: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/pyq", label: "Previous Year Questions", Icon: Library },
  { href: "/mock", label: "Mock Test", Icon: PencilLine },
  { href: "/leaderboard", label: "Leaderboard", Icon: Trophy },
  { href: "/profile", label: "My Progress", Icon: BarChart3 },
];

export default function AppShell({
  children,
  userEmail,
  displayName,
  authEnabled = false,
}: {
  children: React.ReactNode;
  userEmail: string | null;
  displayName: string | null;
  authEnabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-[200] flex h-14 items-center gap-3.5 border-b border-line bg-card px-4">
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] rounded-lg p-1.5 transition hover:bg-bg"
        >
          <span
            className={`block h-0.5 w-5 rounded bg-ink transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-ink transition-all ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 rounded bg-ink transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
        <Link href="/" className="text-[17px] font-extrabold tracking-tight text-primary">
          UGC<span className="text-primary-l">NET</span> Prep
        </Link>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[140] bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <nav
        className={`fixed bottom-0 top-14 z-[150] flex w-[264px] flex-col border-r border-line bg-card py-2.5 transition-[left] duration-300 ${
          open ? "left-0" : "-left-[264px]"
        }`}
      >
        <div className="px-[18px] pb-1.5 pt-3.5 text-[10px] font-bold uppercase tracking-wider text-muted">
          Menu
        </div>
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`relative flex items-center gap-3 px-[18px] py-2.5 text-[13.5px] font-medium transition ${
                active
                  ? "bg-primary-bg font-bold text-primary"
                  : "text-muted hover:bg-bg hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 2} />
              {label}
              {active && (
                <span className="absolute inset-y-1.5 right-0 w-[3px] rounded-l bg-primary" />
              )}
            </Link>
          );
        })}

        <div className="mt-auto space-y-3 border-t border-line px-[18px] py-3.5">
          <div>
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
              Theme
            </div>
            <ThemeToggle />
          </div>

          {authEnabled && (
            <div className="text-[11px] leading-relaxed text-muted">
              {userEmail ? (
                <>
                  <div className="mb-1.5 font-semibold text-ink">
                    {displayName || userEmail}
                  </div>
                  <form action={signOut}>
                    <button className="text-primary hover:underline">Sign out</button>
                  </form>
                </>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                >
                  <LogIn size={14} strokeWidth={2.2} /> Sign in / Sign up
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto mt-14 max-w-[820px] px-4 py-6 sm:px-5">{children}</main>
    </>
  );
}
