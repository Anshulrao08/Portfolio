"use client";

import Link from "next/link";
import { ArrowUpRight, Printer, X } from "lucide-react";
import { achievements } from "@/data/achievements";
import { getPublicEducation } from "@/data/education";
import { leadershipRoles } from "@/data/leadership";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { getConfiguredSocials } from "@/data/socials";
import { workshops } from "@/data/workshops";
import { useApp } from "./Providers";

export function RecruiterView() {
  const { toggleRecruiterMode } = useApp();
  const education = getPublicEducation();
  const configuredSocials = getConfiguredSocials();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border border-accent bg-bg-secondary p-4">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Recruiter Mode Active
          </p>
          <p className="text-sm text-text-secondary">
            High-contrast, animation-free summary formatted for fast screening and printing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 border border-border-strong bg-bg px-3 py-1.5 font-mono text-xs text-text hover:border-accent"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Summary
          </button>
          <Link
            href="/resume"
            onClick={toggleRecruiterMode}
            className="inline-flex items-center gap-1.5 border border-border-strong bg-bg px-3 py-1.5 font-mono text-xs text-text hover:border-accent"
          >
            Full Resume Page
          </Link>
          <button
            type="button"
            onClick={toggleRecruiterMode}
            className="inline-flex items-center gap-1.5 bg-text px-3 py-1.5 font-mono text-xs font-medium text-bg hover:bg-accent hover:text-accent-ink"
          >
            <X className="h-3.5 w-3.5" />
            Exit Recruiter Mode
          </button>
        </div>
      </div>

      <article className="space-y-10 border border-border bg-bg p-6 sm:p-10">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-base font-medium text-text-secondary">
            {profile.identityLine}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-text-secondary">
            <span>{profile.location}</span>
            {configuredSocials.map((s) => (
              <a
                key={s.id}
                href={s.href ?? "#"}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 text-text underline underline-offset-4 hover:text-accent"
              >
                <span>{s.displayValue}</span>
                {s.external && <ArrowUpRight className="h-3 w-3" />}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text">
            {profile.aboutIntro[0]} {profile.careerGoals.paragraphs[0]}
          </p>
        </header>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="font-mono-label text-xs text-accent">Education</h2>
          <div className="divide-y divide-border border-y border-border">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-text">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-text-secondary">{edu.institution}</p>
                </div>
                <div className="font-mono text-xs text-text-secondary sm:text-right">
                  <p>{edu.period}</p>
                  <p className="text-text">{edu.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="font-mono-label text-xs text-accent">Featured Projects</h2>
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.slug} className="border-l-2 border-border-strong pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-text">
                    {p.fullName}
                  </h3>
                  <span className="font-mono text-xs text-text-secondary">
                    {p.duration ?? p.projectType ?? p.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-secondary">{p.description}</p>
                <p className="mt-2 font-mono text-xs text-text">
                  Stack: {p.techStack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership */}
        <section className="space-y-4">
          <h2 className="font-mono-label text-xs text-accent">Leadership & Community</h2>
          <div className="space-y-5">
            {leadershipRoles.map((l) => (
              <div key={l.id} className="border-l-2 border-border-strong pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-text">
                    {l.role} — {l.organization}
                  </h3>
                  {l.duration && (
                    <span className="font-mono text-xs text-text-secondary">{l.duration}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-text-secondary">{l.description}</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text">
                  {l.responsibilities.slice(0, 5).map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="font-mono-label text-xs text-accent">Technical & Leadership Skills</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="border border-border p-3">
                <h3 className="font-mono text-xs font-semibold text-text">{cat.title}</h3>
                <p className="mt-1 text-xs text-text-secondary">
                  {cat.items.map((i) => i.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements & Workshops */}
        <section className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-mono-label text-xs text-accent">Achievements & Recognition</h2>
            <ul className="space-y-2 text-sm">
              {achievements.map((a) => (
                <li key={a.id} className="border-b border-border pb-2">
                  <p className="font-medium text-text">{a.title}</p>
                  <p className="text-xs text-text-secondary">{a.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="font-mono-label text-xs text-accent">Technical Workshops</h2>
            <ul className="space-y-2 text-sm">
              {workshops.map((w) => (
                <li key={w.id} className="border-b border-border pb-2">
                  <p className="font-medium text-text">{w.title}</p>
                  <p className="text-xs text-text-secondary">
                    {w.role} · Speaker: {w.instructor}
                    {w.date ? ` · ${w.date}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}
