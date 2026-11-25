import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ResumeActions } from "@/components/ResumeActions";
import { achievements } from "@/data/achievements";
import { getPublicEducation } from "@/data/education";
import { leadershipRoles } from "@/data/leadership";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { getConfiguredSocials } from "@/data/socials";
import { workshops } from "@/data/workshops";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Printable, recruiter-friendly resume of Anshul Yadav covering education, projects, technical skills, leadership, workshops, and achievements.",
};

export default function ResumePage() {
  const education = getPublicEducation();
  const configuredSocials = getConfiguredSocials();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 space-y-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <p className="font-mono-label text-xs text-accent">Curriculum Vitae</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-text">Resume</h1>
        </div>
        <ResumeActions resumePdfPath={profile.resumePdfPath} />
      </div>

      {/* Printable HTML Resume Sheet */}
      <article className="border border-border bg-bg p-6 sm:p-10 space-y-8">
        <header className="border-b border-border pb-6 space-y-3">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {profile.name}
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            {profile.identityLine}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-text-secondary">
            <span>{profile.location}</span>
            {configuredSocials.map((s) => (
              <a
                key={s.id}
                href={s.href ?? "#"}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1 text-text underline underline-offset-4"
              >
                <span>{s.displayValue}</span>
                {s.external && <ArrowUpRight className="h-3 w-3 no-print" />}
              </a>
            ))}
          </div>
        </header>

        {/* Professional Summary */}
        <section className="space-y-2">
          <h3 className="font-mono-label text-xs text-accent">Professional Summary</h3>
          <p className="text-sm leading-relaxed text-text">
            {profile.aboutIntro[0]} {profile.careerGoals.paragraphs[0]}{" "}
            {profile.careerGoals.paragraphs[1]}
          </p>
        </section>

        {/* Education */}
        <section className="space-y-3">
          <h3 className="font-mono-label text-xs text-accent">Education</h3>
          <div className="divide-y divide-border border-y border-border">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <p className="font-display text-base font-semibold text-text">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-text-secondary">{edu.institution}</p>
                </div>
                <div className="font-mono text-xs text-text-secondary sm:text-right">
                  <p>{edu.period}</p>
                  <p className="text-text">{edu.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="space-y-3">
          <h3 className="font-mono-label text-xs text-accent">Technical &amp; Leadership Skills</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="border border-border p-3">
                <p className="font-mono text-xs font-semibold text-text">{cat.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                  {cat.items.map((i) => i.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h3 className="font-mono-label text-xs text-accent">Projects</h3>
          <div className="space-y-4">
            {projects.map((p) => (
              <div key={p.slug} className="border-l-2 border-border-strong pl-4 space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-base font-bold text-text">
                    {p.fullName}
                  </p>
                  <span className="font-mono text-xs text-text-secondary">
                    {p.duration ?? p.projectType ?? p.category}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {p.description}
                </p>
                <p className="font-mono text-[11px] text-text">
                  Technologies: {p.techStack.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Experience */}
        <section className="space-y-4">
          <h3 className="font-mono-label text-xs text-accent">Leadership Experience</h3>
          <div className="space-y-4">
            {leadershipRoles.map((l) => (
              <div key={l.id} className="border-l-2 border-border-strong pl-4 space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-base font-bold text-text">
                    {l.role} — {l.organization}
                  </p>
                  {l.duration && (
                    <span className="font-mono text-xs text-text-secondary">
                      {l.duration}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {l.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text">
                  {l.responsibilities.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements & Workshops */}
        <section className="grid gap-6 sm:grid-cols-2 border-t border-border pt-6">
          <div className="space-y-3">
            <h3 className="font-mono-label text-xs text-accent">Achievements &amp; Recognition</h3>
            <ul className="space-y-2 text-xs">
              {achievements.map((a) => (
                <li key={a.id} className="space-y-0.5">
                  <p className="font-semibold text-text">{a.title}</p>
                  <p className="text-text-secondary">{a.issuer}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono-label text-xs text-accent">Technical Workshops</h3>
            <ul className="space-y-2 text-xs">
              {workshops.map((w) => (
                <li key={w.id} className="space-y-0.5">
                  <p className="font-semibold text-text">{w.title}</p>
                  <p className="text-text-secondary">
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
