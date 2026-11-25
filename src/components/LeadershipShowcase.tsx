import Link from "next/link";
import { ArrowUpRight, Award, ExternalLink } from "lucide-react";
import { mentorshipHighlight } from "@/data/achievements";
import { leadershipRoles } from "@/data/leadership";
import { SectionHeading } from "./SectionHeading";

export function LeadershipShowcase() {
  return (
    <section id="leadership" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          index="06"
          eyebrow="Leadership & Community"
          title="Building teams, events, and campus culture."
          description="Equal commitment to engineering software and creating collaborative learning spaces where students build and grow together."
          actionHref="/leadership"
          actionLabel="Leadership & Campus Impact"
        />

        {/* Editorial 3-column architectural grid */}
        <div className="grid gap-px bg-border lg:grid-cols-3 border border-border">
          {leadershipRoles.map((role, idx) => (
            <article
              key={role.id}
              className="bg-bg p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-accent font-semibold">0{idx + 1}</span>
                  <span className="text-text-secondary">
                    {role.duration ?? "University Initiative"}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-text">
                    {role.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-secondary">
                    {role.organization}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {role.description}
                </p>

                <ul className="space-y-1.5 border-t border-border pt-4 text-xs text-text">
                  {role.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 bg-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {role.websiteUrl && (
                <a
                  href={role.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between border border-border-strong bg-bg-secondary px-3.5 py-2.5 font-mono text-xs text-text hover:border-accent hover:text-accent transition-colors"
                >
                  <span>{role.websiteNote ?? "Club Website"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Technical Mentorship & Events Spotlight Bar */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 border border-border bg-bg-secondary/40 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <Award className="h-3.5 w-3.5" />
                {mentorshipHighlight.recognition}
              </span>
              <span className="font-mono text-[11px] text-text-secondary">
                {mentorshipHighlight.organization}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-text">
              {mentorshipHighlight.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {mentorshipHighlight.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {mentorshipHighlight.skillsDemonstrated.map((skill) => (
                <span
                  key={skill}
                  className="border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 border border-border bg-bg p-6 flex flex-col justify-between gap-5">
            <div className="space-y-2">
              <p className="font-mono-label text-[11px] text-accent">
                Events, Workshops &amp; Recognitions
              </p>
              <h3 className="font-display text-xl font-bold text-text">
                HackPrix 2026, Four Days of AI, VERGE 2026 &amp; 6-Day DSA Workshop.
              </h3>
              <p className="text-sm text-text-secondary">
                Explore the full event archive, expandable three-phase DSA workshop timeline, technical workshops, and certificate gallery.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/events"
                className="inline-flex items-center justify-between border border-border-strong bg-bg-secondary px-3.5 py-2.5 font-mono text-xs text-text hover:border-accent transition-colors"
              >
                <span>Events</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/achievements"
                className="inline-flex items-center justify-between border border-border-strong bg-bg-secondary px-3.5 py-2.5 font-mono text-xs text-text hover:border-accent transition-colors"
              >
                <span>Certificates</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/journey"
                className="col-span-2 inline-flex items-center justify-between border border-border px-3.5 py-2.5 font-mono text-xs text-text-secondary hover:border-border-strong hover:text-text transition-colors"
              >
                <span>Inspect Chronological Journey (2021 – Present)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
