"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Code2,
  Cpu,
  Database,
  Globe,
  Monitor,
  Shield,
  Smartphone,
  Users,
  Workflow,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import type { SkillBasis } from "@/data/types";
import { SectionHeading } from "./SectionHeading";

const basisLabels: { key: "all" | SkillBasis; label: string }[] = [
  { key: "all", label: "All Areas" },
  { key: "project", label: "Applied in Projects" },
  { key: "workshop", label: "Workshop Exposure" },
  { key: "fundamentals", label: "CS Fundamentals" },
  { key: "leadership", label: "Leadership & Ops" },
];

const basisBadgeText: Record<SkillBasis, string> = {
  project: "Project Stack",
  workshop: "Workshop Topic",
  fundamentals: "CS Core",
  leadership: "Leadership",
};

function CategoryIcon({ id }: { id: string }) {
  const cls = "h-4 w-4 text-accent";
  switch (id) {
    case "languages":
      return <Code2 className={cls} />;
    case "web":
      return <Globe className={cls} />;
    case "mobile":
      return <Smartphone className={cls} />;
    case "desktop":
      return <Monitor className={cls} />;
    case "ai":
      return <Bot className={cls} />;
    case "automation":
      return <Workflow className={cls} />;
    case "databases":
      return <Database className={cls} />;
    case "cs-fundamentals":
      return <Cpu className={cls} />;
    case "additional-exposure":
      return <Shield className={cls} />;
    default:
      return <Users className={cls} />;
  }
}

export function SkillsShowcase() {
  const [basisFilter, setBasisFilter] = useState<"all" | SkillBasis>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const visibleCategories = useMemo(() => {
    return skillCategories
      .filter((cat) => selectedCategoryId === "all" || cat.id === selectedCategoryId)
      .map((cat) => ({
        ...cat,
        items:
          basisFilter === "all"
            ? cat.items
            : cat.items.filter((item) => item.basis === basisFilter),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [basisFilter, selectedCategoryId]);

  return (
    <section id="skills" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Capabilities"
          title="Technologies & Technical Exposure"
          description="My technical experience comes from hands‑on projects, academic learning, experimentation, and continuous exploration. The technologies listed here represent tools and concepts I have worked with or explored, rather than a claim of advanced proficiency in every area."
        />

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by experience basis">
            {basisLabels.map((b) => {
              const active = basisFilter === b.key;
              return (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setBasisFilter(b.key)}
                  className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                    active
                      ? "border-accent bg-accent text-accent-ink font-semibold"
                      : "border-border bg-bg-secondary text-text-secondary hover:border-border-strong hover:text-text"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by skill category">
            <button
              type="button"
              onClick={() => setSelectedCategoryId("all")}
              className={`border px-2.5 py-1 text-xs transition-colors ${
                selectedCategoryId === "all"
                  ? "border-text bg-text text-bg font-medium"
                  : "border-border text-text-secondary hover:text-text"
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`border px-2.5 py-1 text-xs transition-colors ${
                  selectedCategoryId === cat.id
                    ? "border-text bg-text text-bg font-medium"
                    : "border-border text-text-secondary hover:text-text"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Layout */}
        <div className="divide-y divide-border border border-border bg-bg">
          {visibleCategories.map((cat) => (
            <div
              key={cat.id}
              className="grid gap-4 p-5 sm:p-6 md:grid-cols-12 md:items-start"
            >
              <div className="md:col-span-4 space-y-1">
                <div className="flex items-center gap-2">
                  <CategoryIcon id={cat.id} />
                  <h3 className="font-display text-base font-semibold text-text">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary">{cat.subtitle}</p>
              </div>

              <div className="md:col-span-8 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <div
                    key={`${cat.id}-${item.name}`}
                    className="group border border-border bg-bg-secondary/50 px-3 py-2 hover:border-border-strong transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text">{item.name}</span>
                      <span className="font-mono text-[10px] uppercase text-text-secondary">
                        · {basisBadgeText[item.basis]}
                      </span>
                    </div>
                    {item.note && (
                      <p className="mt-0.5 font-mono text-[10px] text-text-secondary">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
