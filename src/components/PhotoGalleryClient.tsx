"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FolderOpen, X } from "lucide-react";
import {
  galleryCategories,
  galleryPhotos,
  getPopulatedGalleryCategories,
} from "@/data/gallery";
import type { GalleryCategory } from "@/data/types";

export function PhotoGalleryClient() {
  const populatedCategories = useMemo(() => getPopulatedGalleryCategories(), []);
  const [selectedCategory, setSelectedCategory] = useState<"All" | GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const visiblePhotos = useMemo(() => {
    if (selectedCategory === "All") return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visiblePhotos.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visiblePhotos.length) % visiblePhotos.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, visiblePhotos.length]);

  if (galleryPhotos.length === 0) {
    return (
      <div className="border border-border bg-bg-secondary/30 p-8 sm:p-12 space-y-6">
        <div className="flex items-start gap-3">
          <FolderOpen className="mt-1 h-5 w-5 text-accent shrink-0" />
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-text">
              Personal photo archive is ready for uploads.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              To keep this portfolio authentic, stock photos are never used to represent campus events, hackathons, or travel memories. Empty gallery categories stay hidden from visitors until real photographs are added to{" "}
              <code className="text-text">public/images/</code> and registered in{" "}
              <code className="text-text">src/data/gallery.ts</code>.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-6 space-y-3">
          <p className="font-mono-label text-[11px] text-text-secondary">
            Configured Archive Categories (Hidden until populated)
          </p>
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <span
                key={cat}
                className="border border-dashed border-border-strong bg-bg px-3 py-1.5 font-mono text-xs text-text-secondary"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activePhoto = lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`border px-3.5 py-2 font-mono text-xs transition-colors ${
            selectedCategory === "All"
              ? "border-accent bg-accent text-accent-ink font-semibold"
              : "border-border bg-bg-secondary text-text-secondary hover:text-text"
          }`}
        >
          All ({galleryPhotos.length})
        </button>
        {populatedCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`border px-3.5 py-2 font-mono text-xs transition-colors ${
              selectedCategory === cat
                ? "border-accent bg-accent text-accent-ink font-semibold"
                : "border-border bg-bg-secondary text-text-secondary hover:text-text"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Columns */}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {visiblePhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className="break-inside-avoid border border-border bg-bg-secondary/30 p-3"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="block w-full text-left"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={900}
                height={700}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </button>
            <figcaption className="mt-2.5 flex items-baseline justify-between gap-2">
              <span className="text-xs text-text">{photo.caption}</span>
              <span className="font-mono text-[10px] uppercase text-text-secondary shrink-0">
                {photo.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Full-screen Lightbox with Keyboard & Touch Swipe */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.caption}
          className="fixed inset-0 z-[85] flex flex-col justify-between bg-black/95 p-4 sm:p-6 text-white"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            const end = e.changedTouches[0]?.clientX ?? null;
            if (start === null || end === null) return;
            const delta = start - end;
            if (delta > 50) {
              setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length);
            } else if (delta < -50) {
              setLightboxIndex(
                (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length
              );
            }
          }}
        >
          <div
            className="flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-xs text-neutral-400">
              {lightboxIndex + 1} / {visiblePhotos.length} · {activePhoto.category}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="border border-neutral-700 p-2 hover:border-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + visiblePhotos.length) % visiblePhotos.length
                )
              }
              aria-label="Previous photo"
              className="hidden sm:inline-flex border border-neutral-700 bg-black/60 p-2.5 hover:border-accent mr-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={1400}
              height={1000}
              className="max-h-[75vh] w-auto object-contain"
            />

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % visiblePhotos.length)
              }
              aria-label="Next photo"
              className="hidden sm:inline-flex border border-neutral-700 bg-black/60 p-2.5 hover:border-accent ml-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <p className="text-center text-sm text-neutral-200">{activePhoto.caption}</p>
        </div>
      )}
    </div>
  );
}
