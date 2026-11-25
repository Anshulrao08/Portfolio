"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Award, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { events } from "@/data/events";
import type { EventCategory } from "@/data/types";
import { workshops } from "@/data/workshops";

const categories: ("All" | EventCategory)[] = [
  "All",
  "Hackathons",
  "Technical Workshops",
  "University Festivals",
  "Social Awareness",
  "Community Initiatives",
];

export function EventsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | EventCategory>("All");
  const [expandedDSA, setExpandedDSA] = useState(true);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return events;
    return events.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-16">
      {/* Category Filters */}
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
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

        {/* Event Cards / Architectural Entries */}
        <div className="space-y-6">
          {filteredEvents.map((evt) => (
            <article
              key={evt.id}
              id={evt.id}
              className="border border-border bg-bg-secondary/30 p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="border border-accent/60 px-2 py-0.5 text-accent uppercase">
                      {evt.category}
                    </span>
                    {evt.format && (
                      <span className="border border-border bg-bg px-2 py-0.5 text-text-secondary">
                        {evt.format}
                      </span>
                    )}
                    {evt.date && (
                      <span className="inline-flex items-center gap-1 text-text-secondary">
                        <Calendar className="h-3 w-3 text-accent" />
                        {evt.date}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
                    {evt.name}
                  </h2>
                  <p className="text-sm font-medium text-text-secondary">
                    {evt.organization} · <span className="text-text">{evt.role}</span>
                  </p>
                </div>

                {evt.recognition && (
                  <Link
                    href={evt.certificateId ? `/achievements#${evt.certificateId}` : "/achievements"}
                    className="inline-flex items-center gap-1.5 border border-border-strong bg-bg px-3 py-1.5 font-mono text-xs text-accent hover:border-accent"
                  >
                    <Award className="h-3.5 w-3.5" />
                    <span>{evt.recognition}</span>
                  </Link>
                )}
              </div>

              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-text-secondary">
                {evt.description}
              </p>

              {evt.subEvents && evt.subEvents.length > 0 && (
                <div className="space-y-2">
                  <p className="font-mono-label text-[10px] text-text-secondary">
                    Events Coordinated
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {evt.subEvents.map((sub) => (
                      <span
                        key={sub}
                        className="border border-border bg-bg px-3 py-1 font-mono text-xs text-text"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {evt.highlights.map((h) => (
                  <span
                    key={h}
                    className="border-l-2 border-accent/70 bg-bg px-3 py-1 text-xs text-text"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Expandable 3-phase timeline for Six-Day DSA Workshop */}
              {evt.phases && evt.phases.length > 0 && (
                <div className="border border-border bg-bg">
                  <button
                    type="button"
                    onClick={() => setExpandedDSA((prev) => !prev)}
                    aria-expanded={expandedDSA}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                        Single Initiative · Three Progressive Phases
                      </p>
                      <p className="text-sm font-semibold text-text">
                        Expandable Three-Phase Workshop Timeline
                      </p>
                    </div>
                    {expandedDSA ? (
                      <ChevronUp className="h-4 w-4 text-text-secondary" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-text-secondary" />
                    )}
                  </button>

                  {expandedDSA && (
                    <div className="grid gap-px bg-border border-t border-border md:grid-cols-3">
                      {evt.phases.map((phase) => (
                        <div key={phase.phase} className="bg-bg p-5 space-y-3">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="text-accent font-semibold">{phase.phase}</span>
                            <span className="text-text-secondary">{phase.dates}</span>
                          </div>
                          <h3 className="font-display text-base font-bold text-text">
                            {phase.title}
                          </h3>
                          <ul className="space-y-1.5 text-xs text-text-secondary">
                            {phase.points.map((pt) => (
                              <li key={pt} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 bg-accent shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {(evt.eventWebsite || evt.linkedinPostUrl) && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {evt.eventWebsite && (
                    <a
                      href={evt.eventWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border-strong bg-bg px-3.5 py-2 font-mono text-xs text-text hover:border-accent hover:text-accent transition-colors"
                    >
                      <span>Event Website</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {evt.linkedinPostUrl && (
                    <a
                      href={evt.linkedinPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border-strong bg-bg px-3.5 py-2 font-mono text-xs text-text hover:border-accent hover:text-accent transition-colors"
                    >
                      <span>LinkedIn Post</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Technical Workshops Section */}
      <section id="workshops" className="border-t border-border pt-14 space-y-6">
        <div className="space-y-2">
          <p className="font-mono-label text-xs text-accent">Technical Workshops</p>
          <h2 className="font-display text-3xl font-bold text-text">
            Hands-on sessions attended &amp; coordinated.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {workshops.map((w) => (
            <article
              key={w.id}
              id={w.id}
              className="border border-border bg-bg p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-accent">{w.role}</span>
                  {w.date && <span className="text-text-secondary">{w.date}</span>}
                </div>
                <h3 className="font-display text-xl font-bold text-text">{w.title}</h3>
                <p className="text-xs text-text-secondary">
                  {w.organization ? `${w.organization} · ` : ""}
                  Speaker / Instructor: <span className="text-text">{w.instructor}</span>
                </p>
                {(w.technology || w.tool) && (
                  <p className="font-mono text-[11px] text-text-secondary">
                    {[w.technology, w.tool].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>

              <ul className="space-y-1.5 border-t border-border pt-4 text-xs text-text-secondary">
                {w.learnings.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 bg-accent shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
