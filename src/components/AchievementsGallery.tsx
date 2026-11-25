"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Award, Download, Eye, FileBadge, X, ZoomIn, ZoomOut } from "lucide-react";
import { achievements } from "@/data/achievements";
import type { AchievementEntry } from "@/data/types";

const categories: ("All" | AchievementEntry["category"])[] = [
  "All",
  "Technical Mentorship",
  "University Festivals",
  "Social Awareness",
  "Hackathons",
];

export function AchievementsGallery() {
  const [filter, setFilter] = useState<"All" | AchievementEntry["category"]>("All");
  const [activeCert, setActiveCert] = useState<AchievementEntry | null>(null);
  const [zoom, setZoom] = useState(1);

  const visible = useMemo(() => {
    if (filter === "All") return achievements;
    return achievements.filter((a) => a.category === filter);
  }, [filter]);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCert]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter achievements">
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

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="border border-border bg-bg-secondary/30 p-6 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Award className="h-3.5 w-3.5" />
                  {item.type}
                </span>
                {item.date && <span className="text-text-secondary">{item.date}</span>}
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-text sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-text-secondary">
                  Issued by {item.issuer}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>

              {item.skillsDemonstrated && item.skillsDemonstrated.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.skillsDemonstrated.map((s) => (
                    <span
                      key={s}
                      className="border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Honest certificate preview area */}
            <div className="border-t border-border pt-4">
              {item.certificateImage ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setZoom(1);
                      setActiveCert(item);
                    }}
                    className="inline-flex items-center gap-2 border border-text bg-text px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Certificate</span>
                  </button>

                  {item.downloadFile && (
                    <a
                      href={item.downloadFile}
                      download
                      className="inline-flex items-center gap-2 border border-border-strong bg-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-text hover:border-accent"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2.5 border border-dashed border-border bg-bg/60 px-3.5 py-2.5 font-mono text-[11px] text-text-secondary">
                  <FileBadge className="h-4 w-4 text-accent shrink-0" />
                  <span>
                    Confirmed recognition — certificate image slot ready under{" "}
                    <code className="text-text">/public/images/certificates/</code>.
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Full-screen zoomable certificate modal (when real certificate image is available) */}
      {activeCert && activeCert.certificateImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          className="fixed inset-0 z-[80] flex flex-col bg-black/90 p-4 sm:p-6"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-border pb-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-display text-sm font-semibold">{activeCert.title}</p>
              <p className="font-mono text-[11px] text-neutral-400">{activeCert.issuer}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
                aria-label="Zoom out"
                className="border border-neutral-700 p-2 hover:border-accent"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
                aria-label="Zoom in"
                className="border border-neutral-700 p-2 hover:border-accent"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close viewer"
                className="border border-neutral-700 p-2 hover:border-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative transition-transform duration-150"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
            >
              <Image
                src={activeCert.certificateImage}
                alt={activeCert.title}
                width={1200}
                height={850}
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
