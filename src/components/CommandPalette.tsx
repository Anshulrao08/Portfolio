"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  Moon,
  Search,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { getConfiguredSocials } from "@/data/socials";
import { getSearchIndex } from "@/data/searchIndex";
import { useApp } from "./Providers";

export function CommandPalette() {
  const { commandOpen } = useApp();
  if (!commandOpen) return null;
  return <CommandPaletteDialog />;
}

function CommandPaletteDialog() {
  const router = useRouter();
  const {
    setCommandOpen,
    theme,
    toggleTheme,
    recruiterMode,
    toggleRecruiterMode,
    setTerminalOpen,
  } = useApp();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => getSearchIndex(), []);
  const linkedin = useMemo(
    () => getConfiguredSocials().find((s) => s.id === "linkedin"),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
      )
      .slice(0, 14);
  }, [items, query]);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCommandOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0 ? (prev + 1) % filtered.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        router.push(filtered[selectedIndex].href);
        setCommandOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selectedIndex, router, setCommandOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette and Portfolio Search"
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-16 sm:pt-24 backdrop-blur-xs"
      onClick={() => setCommandOpen(false)}
    >
      <div
        className="w-full max-w-2xl border border-border-strong bg-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-text-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, events, skills, achievements, education..."
            aria-label="Search portfolio content"
            className="w-full bg-transparent text-sm text-text placeholder:text-text-secondary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setCommandOpen(false)}
            aria-label="Close command palette"
            className="text-text-secondary hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1.5 border-b border-border bg-bg-secondary/60 px-4 py-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text hover:border-border-strong"
          >
            {theme === "dark" ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            <span>{theme === "dark" ? "Light Theme" : "Dark Theme"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              toggleRecruiterMode();
              setCommandOpen(false);
            }}
            className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] ${
              recruiterMode
                ? "border-accent bg-accent text-accent-ink font-semibold"
                : "border-border bg-bg text-text hover:border-border-strong"
            }`}
          >
            <Briefcase className="h-3 w-3" />
            <span>{recruiterMode ? "Exit Recruiter Mode" : "Recruiter Mode"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCommandOpen(false);
              setTerminalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text hover:border-border-strong"
          >
            <Terminal className="h-3 w-3" />
            <span>Terminal</span>
          </button>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text hover:border-border-strong"
          >
            {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copied Email" : "Copy Email"}</span>
          </button>

          {linkedin?.href && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text hover:border-border-strong"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-text-secondary">
              No matching portfolio entries found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  router.push(item.href);
                  setCommandOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors ${
                  idx === selectedIndex ? "bg-bg-secondary" : "hover:bg-bg-secondary/60"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] uppercase text-text-secondary">
                      {item.type}
                    </span>
                    <p className="truncate text-sm font-medium text-text">{item.title}</p>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-text-secondary">{item.subtitle}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-text-secondary" />
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-text-secondary">
          <span>↑↓ Navigate · Enter Open · Esc Close</span>
          <span>Local Portfolio Index</span>
        </div>
      </div>
    </div>
  );
}
