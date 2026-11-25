"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Mail,
  MapPin,
} from "lucide-react";
import { profile } from "@/data/profile";
import { getConfiguredSocials } from "@/data/socials";
import { Monogram } from "./Monogram";
import { useApp } from "./Providers";

export function HeroSection() {
  const { reducedMotion, recruiterMode } = useApp();
  const [roleIndex, setRoleIndex] = useState(0);
  const [cursorOffset, setCursorOffset] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLElement>(null);

  const linkedin = getConfiguredSocials().find((s) => s.id === "linkedin");

  useEffect(() => {
    if (reducedMotion || recruiterMode) return;
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.animatedRoles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [reducedMotion, recruiterMode]);

  useEffect(() => {
    if (reducedMotion || recruiterMode || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [reducedMotion, recruiterMode]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reducedMotion || recruiterMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setCursorOffset({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden border-b border-border"
    >
      {/* Subtle interactive grid/crosshair background (desktop pointer reactive, no blobs) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 transition-opacity"
        style={{
          backgroundImage:
            "radial-gradient(circle at " +
            cursorOffset.x +
            "% " +
            cursorOffset.y +
            "%, color-mix(in srgb, var(--accent) 11%, transparent) 0%, transparent 42%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hero-reveal flex flex-wrap items-center gap-3 font-mono text-xs text-text-secondary">
              <span className="inline-block h-2 w-2 bg-accent" />
              <span className="uppercase tracking-widest">Hello, I&apos;m</span>
              <span className="text-border-strong">/</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {profile.location}
              </span>
            </div>

            <div className="hero-reveal space-y-3">
              <h1 className="font-display text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl leading-[0.98]">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
                <span className="text-text-secondary">Role //</span>
                <span
                  aria-live="polite"
                  className="border border-border bg-bg-secondary px-2.5 py-1 text-accent font-medium"
                >
                  {profile.animatedRoles[roleIndex]}
                </span>
              </div>
            </div>

            <p className="hero-reveal font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
              {profile.primaryTagline}
            </p>

            <p className="hero-reveal max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {profile.heroSupporting}
            </p>

            {/* Primary, Secondary, Additional CTAs */}
            <div className="hero-reveal flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-text bg-text px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border-strong bg-bg-secondary px-5 py-3 font-mono text-xs uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors"
              >
                <span>Get In Touch</span>
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 border border-border px-4 py-3 font-mono text-xs uppercase tracking-wider text-text-secondary hover:border-border-strong hover:text-text transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View Resume</span>
              </Link>
            </div>

            {/* Direct Email & LinkedIn */}
            <div className="hero-reveal flex flex-wrap items-center gap-5 border-t border-border pt-6 text-xs">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 font-mono text-text-secondary hover:text-text transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                <span>{profile.email}</span>
              </a>
              {linkedin?.href && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-text-secondary hover:text-text transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                </a>
              )}
            </div>
          </div>

          {/* Right Asymmetrical Editorial Plate */}
          <div className="hero-reveal lg:col-span-5 space-y-4">
            <div className="border border-border bg-bg-secondary p-4 sm:p-5">
              {profile.profileImage.src ? (
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-border">
                  <Image
                    src={profile.profileImage.src}
                    alt={profile.profileImage.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/5] flex-col justify-between border border-border bg-bg p-6">
                  <div className="flex items-start justify-between">
                    <Monogram size={52} />
                    <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                      Edition // 2026
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      Identity Dossier
                    </p>
                    <p className="font-display text-2xl font-bold leading-snug text-text">
                      {profile.secondaryTagline}
                    </p>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {profile.identityLine}
                    </p>
                  </div>

                  <div className="border-t border-border pt-4 font-mono text-[10px] text-text-secondary flex items-center justify-between">
                    <span>PROFILE PORTRAIT SLOT</span>
                    <span>/public/images/profile/</span>
                  </div>
                </div>
              )}

              {/* Current Focus Panel */}
              <div className="mt-4 border border-border bg-bg p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono-label text-[10px] text-accent">
                    {profile.currentFocus.label}
                  </p>
                  <span className="font-mono text-[10px] text-text-secondary">ACTIVE</span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-xs text-text">
                  {profile.currentFocus.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 bg-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-border pt-5">
          <a
            href="#about"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-text transition-colors"
          >
            <ArrowDown className="h-3.5 w-3.5 text-accent" />
            <span>Scroll to explore</span>
          </a>
          <span className="hidden sm:inline font-mono text-[11px] text-text-secondary">
            Press Ctrl+K to search · ~ for terminal
          </span>
        </div>
      </div>
    </section>
  );
}
