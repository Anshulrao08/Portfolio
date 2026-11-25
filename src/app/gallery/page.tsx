import type { Metadata } from "next";
import { PhotoGalleryClient } from "@/components/PhotoGalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Authentic photography and memories from FOSS Club, TechSpace, hackathons, workshops, and university events.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-12">
      <header className="border-b border-border pb-8 space-y-4">
        <p className="font-mono-label text-xs text-accent">Visual Archive</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Photo Gallery.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          Moments from student communities, campus initiatives, hackathons, workshops, and travels—shown strictly from verified photographs.
        </p>
      </header>

      <PhotoGalleryClient />
    </div>
  );
}
