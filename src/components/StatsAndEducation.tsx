"use client";

import { useEffect, useRef, useState } from "react";
import { getPublicEducation } from "@/data/education";
import { profile } from "@/data/profile";
import { useApp } from "./Providers";
import { SectionHeading } from "./SectionHeading";

function CountUpNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const { reducedMotion, recruiterMode } = useApp();
  const [value, setValue] = useState(target);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion || recruiterMode || hasAnimated || !elRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 700;
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            setValue(Math.round(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [target, reducedMotion, recruiterMode, hasAnimated]);

  return (
    <span ref={elRef}>
      {value}
      {suffix}
    </span>
  );
}

export function StatsAndEducation() {
  const education = getPublicEducation();
  const [selectedEduId, setSelectedEduId] = useState(education[0]?.id ?? "");

  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Asymmetric Confirmed Statistics */}
        <div>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono-label text-xs text-accent">
                02 / Verified Footprint
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
                Projects, leadership, and campus contributions.
              </h2>
            </div>
            <p className="font-mono text-[11px] text-text-secondary">
              Confirmed milestones only — zero inflated metrics
            </p>
          </div>

          {/* Primary 4 featured figures */}
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 border border-border">
            {profile.homepageStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`bg-bg p-6 flex flex-col justify-between gap-4 ${
                  idx === 0 ? "sm:bg-bg-secondary/60" : ""
                }`}
              >
                <div className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
                  <CountUpNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{stat.label}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-text-secondary">
                    {stat.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subordinate horizontal strip for secondary figures */}
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {profile.secondaryStats.map((stat) => (
              <div
                key={stat.label}
                className="border border-border bg-bg-secondary/30 px-4 py-3 flex items-baseline justify-between gap-3 lg:block"
              >
                <p className="font-mono text-base font-bold text-accent">
                  {stat.value}
                  {stat.suffix ?? ""}
                </p>
                <div className="text-right lg:text-left lg:mt-1">
                  <p className="text-xs font-medium text-text">{stat.label}</p>
                  <p className="text-[11px] text-text-secondary">{stat.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Academic Timeline */}
        <div id="education">
          <SectionHeading
            index="03"
            eyebrow="Education"
            title="Academic foundation."
            description="Select any stage to inspect institution details and current academic status."
          />

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 divide-y divide-border border border-border">
              {education.map((edu) => {
                const selected = edu.id === selectedEduId;
                return (
                  <button
                    key={edu.id}
                    type="button"
                    onClick={() => setSelectedEduId(edu.id)}
                    className={`w-full p-5 text-left transition-colors ${
                      selected ? "bg-bg-secondary" : "bg-bg hover:bg-bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-accent">
                        {edu.period}
                      </span>
                      <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-text-secondary">
                        {edu.status}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-text">
                      {edu.degree}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {edu.institution}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 border border-border bg-bg-secondary/40 p-6 sm:p-8 flex flex-col justify-between">
              {education
                .filter((e) => e.id === selectedEduId)
                .map((edu) => (
                  <div key={edu.id} className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent">
                        {edu.status}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">
                        {edu.period}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-text sm:text-3xl">
                      {edu.degree}
                    </h3>
                    <p className="text-base font-medium text-text-secondary">
                      {edu.institution}
                      {edu.location ? ` · ${edu.location}` : ""}
                    </p>
                    {edu.streamOrNotes && (
                      <p className="text-sm leading-relaxed text-text-secondary pt-2">
                        {edu.streamOrNotes}
                      </p>
                    )}
                  </div>
                ))}
              <p className="mt-6 border-t border-border pt-4 font-mono text-[11px] text-text-secondary">
                Academic records shown strictly reflect confirmed milestones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
