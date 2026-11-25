import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/JourneyTimeline";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Chronological timeline of Anshul Yadav's education, software projects, leadership roles, workshops, and campus achievements from 2021 to Present.",
};

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-12">
      <header className="border-b border-border pb-8 space-y-4">
        <p className="font-mono-label text-xs text-accent">Chronological Archive</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Journey (2021 – Present).
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          Milestones across academic education, software projects, club leadership, workshops, and recognitions—ordered strictly by confirmed dates.
        </p>
      </header>

      <JourneyTimeline />
    </div>
  );
}
