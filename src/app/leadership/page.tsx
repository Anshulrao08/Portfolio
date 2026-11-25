import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, ExternalLink } from "lucide-react";
import { mentorshipHighlight } from "@/data/achievements";
import { leadershipRoles } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Leadership experience of Anshul Yadav: President of FOSS Club, Founder & Former President of TechSpace, Gender Champion (Internal Committee), and Technical Mentor.",
};

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-16">
      <header className="border-b border-border pb-8 space-y-4">
        <p className="font-mono-label text-xs text-accent">Leadership &amp; Community</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Empowering student communities and technical initiatives.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          From founding a university technical society to leading open-source programs and campus awareness initiatives, leadership has been central to my journey at SRM University Delhi-NCR, Sonepat.
        </p>
      </header>

      <section className="space-y-8">
        {leadershipRoles.map((role, idx) => (
          <article
            key={role.id}
            id={role.id}
            className="grid gap-8 border border-border bg-bg-secondary/30 p-6 sm:p-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-accent font-semibold">ROLE 0{idx + 1}</span>
                {role.current && (
                  <span className="border border-accent px-2 py-0.5 text-[10px] uppercase text-accent">
                    Current
                  </span>
                )}
              </div>

              <h2 className="font-display text-3xl font-bold text-text">{role.role}</h2>
              <p className="text-base font-medium text-text-secondary">{role.organization}</p>

              {role.duration && (
                <p className="font-mono text-xs text-text-secondary">
                  Tenure: <span className="text-text">{role.duration}</span>
                </p>
              )}

              {role.websiteUrl && (
                <div className="pt-2">
                  <a
                    href={role.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-text bg-text px-4 py-2 font-mono text-xs uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
                  >
                    <span>{role.websiteNote ?? "Club Website"}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 space-y-6">
              <p className="text-base leading-relaxed text-text">{role.description}</p>

              <div className="space-y-3 border-t border-border pt-5">
                <p className="font-mono-label text-[11px] text-accent">
                  Key Responsibilities &amp; Contributions
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2 text-sm text-text-secondary">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 bg-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {role.highlights && role.highlights.length > 0 && (
                <div className="border-t border-border pt-4 flex flex-wrap gap-2">
                  {role.highlights.map((h) => (
                    <span
                      key={h}
                      className="border border-border bg-bg px-3 py-1 font-mono text-xs text-text"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Technical Mentorship Section */}
      <section className="border border-border bg-bg p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
            <Award className="h-4 w-4" />
            {mentorshipHighlight.recognition}
          </span>
          <span className="font-mono text-xs text-text-secondary">
            {mentorshipHighlight.organization}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          {mentorshipHighlight.title}
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          {mentorshipHighlight.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {mentorshipHighlight.skillsDemonstrated.map((skill) => (
            <span
              key={skill}
              className="border border-border bg-bg-secondary px-3 py-1 font-mono text-xs text-text"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent hover:underline"
          >
            <span>View Events &amp; Workshops</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
