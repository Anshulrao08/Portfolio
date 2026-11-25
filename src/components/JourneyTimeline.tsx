"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { timelineEntries } from "@/data/timeline";
import type { TimelineCategory } from "@/data/types";
import { useApp } from "./Providers";

gsap.registerPlugin(ScrollTrigger);

const categories: ("All" | TimelineCategory)[] = [
  "All",
  "Education",
  "Projects",
  "Leadership",
  "Events",
  "Achievements",
];

export function JourneyTimeline() {
  const [filter, setFilter] = useState<"All" | TimelineCategory>("All");
  const { reducedMotion, recruiterMode } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const visibleEntries = useMemo(() => {
    if (filter === "All") return timelineEntries;
    return timelineEntries.filter((entry) => entry.category === filter);
  }, [filter]);

  useEffect(() => {
    if (reducedMotion || recruiterMode || !trackRef.current || !progressRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 65%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }, trackRef);

    return () => ctx.revert();
  }, [filter, reducedMotion, recruiterMode]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter timeline milestones">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`border px-3.5 py-2 font-mono text-xs transition-colors ${
                active
                  ? "border-accent bg-accent text-accent-ink font-semibold"
                  : "border-border bg-bg-secondary text-text-secondary hover:border-border-strong hover:text-text"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Desktop & Mobile Chronological Timeline */}
      <div ref={trackRef} className="relative pl-6 md:pl-0">
        {/* Mobile vertical line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-2 top-0 w-px bg-border md:hidden"
        />

        {/* Desktop center vertical line + GSAP scroll progress */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-border"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-top bg-accent"
            style={{ transform: reducedMotion || recruiterMode ? "scaleY(1)" : "scaleY(0)" }}
          />
        </div>

        <div className="space-y-8 md:space-y-10">
          {visibleEntries.map((entry, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={entry.id}
                className="relative md:grid md:grid-cols-2 md:gap-12 items-start"
              >
                {/* Node dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[21px] top-6 h-2.5 w-2.5 border border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                />

                <div
                  className={`${
                    isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
                  }`}
                >
                  <article className="border border-border bg-bg-secondary/35 p-5 sm:p-6 space-y-2.5">
                    <div
                      className={`flex flex-wrap items-center gap-2 font-mono text-[11px] ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="text-accent font-semibold">
                        {entry.dateLabel}
                      </span>
                      <span className="border border-border bg-bg px-2 py-0.5 text-[10px] uppercase text-text-secondary">
                        {entry.category}
                      </span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-text">
                      {entry.title}
                    </h2>
                    <p className="text-xs font-medium text-text-secondary">
                      {entry.subtitle}
                    </p>
                    <p className="text-sm leading-relaxed text-text-secondary pt-1">
                      {entry.description}
                    </p>

                    {entry.linkHref && (
                      <div className="pt-2">
                        <Link
                          href={entry.linkHref}
                          className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                        >
                          <span>Inspect Details</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
