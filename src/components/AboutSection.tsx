import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";

export function AboutSection() {
  return (
    <section id="about" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="About Me"
          title="Developer, builder, and student community leader."
          description="Balancing software engineering curiosity with campus leadership, technical mentorship, and collaborative initiatives."
          actionHref="/about"
          actionLabel="Full Story & Life Beyond Code"
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Editorial narrative chunks */}
          <div className="lg:col-span-7 space-y-5">
            {profile.aboutIntro.map((paragraph, idx) => (
              <p
                key={idx}
                className={`leading-relaxed ${
                  idx === 0
                    ? "text-base sm:text-lg font-medium text-text"
                    : "text-sm sm:text-base text-text-secondary"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Three Personal Pillars (vertical architectural list, not equal square cards) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="font-mono-label text-[11px] text-text-secondary">
              Three Personal Pillars
            </p>
            <div className="divide-y divide-border border border-border bg-bg-secondary/40">
              {profile.pillars.map((pillar) => (
                <div key={pillar.code} className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {pillar.code}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-text-secondary">
                      {pillar.title}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text">
                    {pillar.subtitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-border bg-bg p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                  Interests &amp; Hobbies
                </p>
                <p className="mt-1 text-sm text-text">
                  Gaming · Travelling · Exploring New Technologies
                </p>
              </div>
              <Link
                href="/about#beyond-code"
                className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline shrink-0"
              >
                <span>Explore</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
