"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import { getConfiguredSocials } from "@/data/socials";
import { Monogram } from "./Monogram";
import { useApp } from "./Providers";

export function Footer() {
  const configuredSocials = getConfiguredSocials();
  const { setTerminalOpen, setCommandOpen } = useApp();

  return (
    <footer className="border-t border-border bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Monogram size={34} interactive />
              <div>
                <p className="font-display text-base font-semibold text-text">
                  {profile.name}
                </p>
                <p className="font-mono text-[11px] text-text-secondary">
                  {profile.location}
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              {profile.primaryTagline} — {profile.secondaryTagline}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setTerminalOpen(true)}
                className="inline-flex items-center gap-1.5 border border-border bg-bg px-3 py-1.5 font-mono text-[11px] text-text-secondary hover:border-border-strong hover:text-text transition-colors"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Terminal (~)</span>
              </button>
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="inline-flex items-center gap-1.5 border border-border bg-bg px-3 py-1.5 font-mono text-[11px] text-text-secondary hover:border-border-strong hover:text-text transition-colors"
              >
                <span>Command Palette (Ctrl+K)</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="font-mono-label text-[11px] text-text-secondary">Navigation</p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {[
                { href: "/about", label: "About" },
                { href: "/projects", label: "Projects" },
                { href: "/leadership", label: "Leadership" },
                { href: "/events", label: "Events" },
                { href: "/journey", label: "Journey" },
                { href: "/achievements", label: "Achievements" },
                { href: "/gallery", label: "Gallery" },
                { href: "/resume", label: "Resume" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="font-mono-label text-[11px] text-text-secondary">Connect</p>
            <div className="space-y-2">
              {configuredSocials.map((s) => (
                <a
                  key={s.id}
                  href={s.href ?? "#"}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between border border-border bg-bg px-3.5 py-2.5 text-sm text-text hover:border-border-strong transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {s.id === "email" && <Mail className="h-3.5 w-3.5 text-accent" />}
                    <span className="font-medium">{s.label}</span>
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-text-secondary">
                    <span className="truncate max-w-[180px]">{s.displayValue}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-text-secondary">
            © 2026 {profile.name}. Built with clarity &amp; intent.
          </p>
          <p className="font-mono text-[11px] text-text-secondary">
            {profile.identityLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
