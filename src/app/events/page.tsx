import type { Metadata } from "next";
import { EventsExplorer } from "@/components/EventsExplorer";

export const metadata: Metadata = {
  title: "Events & Workshops",
  description:
    "Events organized, hackathons, technical festivals, social awareness initiatives, and hands-on workshops coordinated or attended by Anshul Yadav.",
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-12">
      <header className="border-b border-border pb-8 space-y-4">
        <p className="font-mono-label text-xs text-accent">Events &amp; Workshops</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Initiatives organized, coordinated &amp; explored.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          Filter across hackathons, technical workshops, university festivals, social awareness programs, and community initiatives.
        </p>
      </header>

      <EventsExplorer />
    </div>
  );
}
