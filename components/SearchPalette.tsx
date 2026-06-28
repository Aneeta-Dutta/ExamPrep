"use client";

import {
  useState,
  useMemo,
  useDeferredValue,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  GraduationCap,
  HelpCircle,
  CornerDownLeft,
  ArrowRight,
  X,
} from "lucide-react";
import { search, POPULAR, type SearchResult } from "@/lib/search";

export default function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const deferred = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(deferred), [deferred]);
  // Flat list of navigable items (for keyboard ↑/↓).
  const flat = useMemo<SearchResult[]>(
    () => [...results.study, ...results.pyq],
    [results],
  );
  const terms = useMemo(
    () => deferred.trim().toLowerCase().split(/\s+/).filter(Boolean),
    [deferred],
  );

  // Reset + focus when opening; lock body scroll while open.
  useEffect(() => {
    if (open) {
      /* eslint-disable react-hooks/set-state-in-effect -- reset palette state on open */
      setQuery("");
      setActive(0);
      /* eslint-enable react-hooks/set-state-in-effect */
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- reset highlight when query changes
  useEffect(() => setActive(0), [deferred]);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(flat.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (item) go(item.href);
    }
  }

  // Keep the active item scrolled into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const showEmpty = deferred.trim().length < 2;
  const noResults = !showEmpty && results.total === 0;

  return (
    <div
      className="search-overlay fixed inset-0 z-[300] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="search-panel flex max-h-[70vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="shrink-0 text-muted" strokeWidth={2.2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, notes & previous-year questions…"
            className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted transition hover:bg-bg hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain p-2">
          {showEmpty && (
            <div className="px-2 py-1.5">
              <div className="mb-1.5 px-2 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                Popular topics
              </div>
              {POPULAR.map((p) => (
                <button
                  key={p.href}
                  onClick={() => go(p.href)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-bg"
                >
                  <GraduationCap size={16} className="shrink-0 text-primary" />
                  <span className="text-[13.5px] font-medium text-ink">{p.title}</span>
                  <ArrowRight size={14} className="ml-auto text-muted" />
                </button>
              ))}
            </div>
          )}

          {noResults && (
            <div className="flex flex-col items-center gap-1 px-4 py-12 text-center">
              <Search size={24} className="text-muted/60" />
              <p className="text-[13.5px] font-semibold text-ink">No matches found</p>
              <p className="text-[12px] text-muted">
                Try a topic name, keyword, or protocol (e.g. “OSI”, “heap”, “DNS”).
              </p>
            </div>
          )}

          {!showEmpty && results.study.length > 0 && (
            <Group label={`Study notes${countLabel(results.study.length)}`}>
              {results.study.map((r) => {
                const idx = flat.indexOf(r);
                return (
                  <ResultRow
                    key={r.id}
                    r={r}
                    terms={terms}
                    idx={idx}
                    active={idx === active}
                    onHover={() => setActive(idx)}
                    onClick={() => go(r.href)}
                  />
                );
              })}
            </Group>
          )}

          {!showEmpty && results.pyq.length > 0 && (
            <Group label={`Previous-year questions${countLabel(results.pyq.length)}`}>
              {results.pyq.map((r) => {
                const idx = flat.indexOf(r);
                return (
                  <ResultRow
                    key={r.id}
                    r={r}
                    terms={terms}
                    idx={idx}
                    active={idx === active}
                    onHover={() => setActive(idx)}
                    onClick={() => go(r.href)}
                  />
                );
              })}
            </Group>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-muted">
          <Hint k="↑↓" label="navigate" />
          <Hint k={<CornerDownLeft size={11} />} label="open" />
          <Hint k="esc" label="close" />
        </div>
      </div>
    </div>
  );
}

function countLabel(n: number) {
  return n >= 6 ? " · 6+" : "";
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      <div className="px-3 pb-1 pt-2 text-[10.5px] font-bold uppercase tracking-wide text-muted">
        {label}
      </div>
      {children}
    </div>
  );
}

function ResultRow({
  r,
  terms,
  idx,
  active,
  onHover,
  onClick,
}: {
  r: SearchResult;
  terms: string[];
  idx: number;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const Icon = r.kind === "study" ? GraduationCap : HelpCircle;
  return (
    <button
      data-idx={idx}
      onMouseMove={onHover}
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
        active ? "bg-primary-bg" : "hover:bg-bg"
      }`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
          active ? "bg-primary text-white" : "bg-bg text-primary"
        }`}
      >
        <Icon size={15} strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold text-ink">
          <Highlight text={r.title} terms={terms} />
        </span>
        <span className="block truncate text-[11.5px] text-muted">{r.subtitle}</span>
        {r.snippet && (
          <span className="mt-0.5 block truncate text-[11.5px] text-muted/80">
            <Highlight text={r.snippet} terms={terms} />
          </span>
        )}
      </span>
      {active && <CornerDownLeft size={14} className="mt-1 shrink-0 text-primary" />}
    </button>
  );
}

function Hint({ k, label }: { k: React.ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <kbd className="inline-flex min-w-[18px] items-center justify-center rounded border border-line bg-bg px-1 py-0.5 font-sans text-[10px] font-semibold text-muted">
        {k}
      </kbd>
      {label}
    </span>
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const re = new RegExp(`(${terms.map(escapeRe).join("|")})`, "ig");
  const set = new Set(terms);
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        set.has(p.toLowerCase()) ? (
          <mark key={i} className="rounded bg-primary/15 px-0.5 text-primary">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
