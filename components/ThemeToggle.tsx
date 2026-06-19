"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — the active theme is only known on the client.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-line bg-bg p-1">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11.5px] font-semibold transition ${
              active
                ? "bg-card text-primary shadow-[var(--shadow)]"
                : "text-muted hover:text-ink"
            }`}
          >
            <Icon size={14} strokeWidth={2.2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
