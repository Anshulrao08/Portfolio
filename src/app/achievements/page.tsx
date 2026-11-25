import type { Metadata } from "next";
import { AchievementsGallery } from "@/components/AchievementsGallery";

export const metadata: Metadata = {
  title: "Achievements & Certificates",
  description:
    "Verified certificates of appreciation, technical mentorship recognition, and SRM Builds 4.0 hackathon participation for Anshul Yadav.",
};

export default function AchievementsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-12">
      <header className="border-b border-border pb-8 space-y-4">
        <p className="font-mono-label text-xs text-accent">Recognitions &amp; Honors</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          Achievements &amp; Certifications.
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          Confirmed Certificates of Appreciation, Technical Mentorship recognition, and 36-hour hackathon participation. Only verified awards are listed.
        </p>
      </header>

      <AchievementsGallery />
    </div>
  );
}
