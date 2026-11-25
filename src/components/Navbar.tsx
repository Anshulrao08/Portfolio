"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Command,
  FileText,
  Menu,
  Moon,
  Sun,
  Terminal,
  X,
} from "lucide-react";
import { Monogram } from "./Monogram";
import { useApp } from "./Providers";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/leadership", label: "Leadership" },
  { href: "/journey", label: "Journey" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "/events", label: "Events & Workshops" },
  { href: "/gallery", label: "Photo Gallery" },
  { href: "/resume", label: "Resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    recruiterMode,
    toggleRecruiterMode,
    setCommandOpen,
    setTerminalOpen,
  } = useApp();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const mobileOpen = openPath === pathname;
  const setMobileOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    setOpenPath((prevPath) => {
      const wasOpen = prevPath === pathname;
      const shouldOpen = typeof next === "function" ? next(wasOpen) : next;
      return shouldOpen ? pathname : null;
    });
  };
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Anshul Yadav — Home"
              className="flex items-center gap-2.5 text-text hover:text-accent transition-colors"
            >
              <Monogram size={30} interactive />
              <span className="hidden sm:inline-block font-display text-sm font-semibold tracking-tight text-text">
                Anshul Yadav
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                    active ? "text-text" : "text-text-secondary hover:text-text"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-[1px] h-[2px] bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Open command palette"
              title="Command Palette (Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-1.5 border border-border bg-bg-secondary px-2.5 py-1.5 font-mono text-[11px] text-text-secondary hover:border-border-strong hover:text-text transition-colors"
            >
              <Command className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] opacity-75">Ctrl+K</kbd>
            </button>

            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              aria-label="Open developer terminal"
              title="Developer Terminal (~)"
              className="hidden md:inline-flex h-8 w-8 items-center justify-center border border-border bg-bg-secondary text-text-secondary hover:border-border-strong hover:text-text transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={toggleRecruiterMode}
              aria-pressed={recruiterMode}
              title="Toggle Recruiter Mode (compact scannable summary)"
              className={`hidden sm:inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                recruiterMode
                  ? "border-accent bg-accent text-accent-ink font-semibold"
                  : "border-border bg-bg-secondary text-text-secondary hover:border-border-strong hover:text-text"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Recruiter</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="inline-flex h-8 w-8 items-center justify-center border border-border bg-bg-secondary text-text-secondary hover:border-border-strong hover:text-text transition-colors"
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <Link
              href="/resume"
              className="hidden sm:inline-flex items-center gap-1.5 border border-text bg-text px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex lg:hidden h-8 w-8 items-center justify-center border border-border bg-bg-secondary text-text"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <div
          aria-hidden="true"
          className="h-[2px] bg-accent transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile full-screen navigation drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-bg px-6 py-8 lg:hidden"
        >
          <div className="space-y-8">
            <div>
              <p className="font-mono-label text-[11px] text-text-secondary mb-4">
                Primary Sections
              </p>
              <nav className="flex flex-col border-t border-border">
                {primaryLinks.map((link, idx) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between border-b border-border py-3.5 font-display text-xl font-medium ${
                        active ? "text-accent" : "text-text"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-text-secondary">
                        0{idx + 1}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="font-mono-label text-[11px] text-text-secondary mb-3">
                More
              </p>
              <div className="flex flex-wrap gap-2">
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border border-border bg-bg-secondary px-3 py-2 text-xs text-text"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setCommandOpen(true);
              }}
              className="flex items-center justify-center gap-2 border border-border bg-bg-secondary px-3 py-2.5 font-mono text-xs text-text"
            >
              <Command className="h-3.5 w-3.5" />
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                toggleRecruiterMode();
                setMobileOpen(false);
              }}
              className={`flex items-center justify-center gap-2 border px-3 py-2.5 font-mono text-xs ${
                recruiterMode
                  ? "border-accent bg-accent text-accent-ink font-semibold"
                  : "border-border bg-bg-secondary text-text"
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              Recruiter Mode
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setTerminalOpen(true);
              }}
              className="col-span-2 flex items-center justify-center gap-2 border border-border bg-bg-secondary px-3 py-2.5 font-mono text-xs text-text"
            >
              <Terminal className="h-3.5 w-3.5" />
              Open Developer Terminal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
