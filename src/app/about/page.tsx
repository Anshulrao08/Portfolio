import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass, Gamepad2, Globe, Users } from "lucide-react";
import { getPublicEducation } from "@/data/education";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Anshul Yadav — MCA student, aspiring web developer, FOSS Club President, TechSpace Founder, and campus community builder.",
};

function LifeIcon({ title }: { title: string }) {
  const cls = "h-4 w-4 text-accent";
  switch (title) {
    case "Gaming":
      return <Gamepad2 className={cls} />;
    case "Travelling":
      return <Compass className={cls} />;
    case "Technology":
      return <Globe className={cls} />;
    default:
      return <Users className={cls} />;
  }
}

export default function AboutPage() {
  const education = getPublicEducation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 space-y-20">
      {/* Header + Story */}
      <section className="space-y-10">
        <div className="border-b border-border pb-8 space-y-4">
          <p className="font-mono-label text-xs text-accent">Profile // About Anshul Yadav</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl max-w-4xl">
            {profile.secondaryTagline}
          </h1>
          <p className="font-mono text-xs sm:text-sm text-text-secondary">
            {profile.identityLine} · {profile.location}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-5">
            {profile.aboutIntro.map((paragraph, idx) => (
              <p
                key={idx}
                className={`leading-relaxed ${
                  idx === 0
                    ? "text-lg font-medium text-text"
                    : "text-base text-text-secondary"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border border-border bg-bg-secondary/40 divide-y divide-border">
              {profile.pillars.map((pillar) => (
                <div key={pillar.code} className="p-5 space-y-2">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {pillar.code}
                  </span>
                  <h2 className="font-display text-lg font-bold text-text">
                    {pillar.title} — {pillar.subtitle}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <SectionHeading
          index="02"
          eyebrow="Academic Journey"
          title="Education & milestones."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="border border-border bg-bg-secondary/30 p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-accent">{edu.period}</span>
                  <span className="border border-border px-2 py-0.5 text-[10px] uppercase text-text-secondary">
                    {edu.status}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-text">
                  {edu.degree}
                </h3>
                <p className="text-sm font-medium text-text-secondary">
                  {edu.institution}
                </p>
              </div>
              {edu.streamOrNotes && (
                <p className="border-t border-border pt-3 text-xs leading-relaxed text-text-secondary">
                  {edu.streamOrNotes}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Life Beyond Code */}
      <section id="beyond-code">
        <SectionHeading
          index="03"
          eyebrow="Life Beyond Code"
          title="What keeps curiosity alive."
          description="Personal interests that shape perspective, energy, and how I connect with people."
          actionHref="/gallery"
          actionLabel="Photo Gallery"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.lifeBeyondCode.map((item, idx) => (
            <div
              key={item.title}
              className={`border border-border p-6 flex flex-col justify-between gap-6 ${
                idx % 2 === 0 ? "bg-bg-secondary/40" : "bg-bg"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <LifeIcon title={item.title} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-text">
                  {item.title}
                </h3>
                <p className="font-mono text-[11px] text-accent">{item.tag}</p>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Goals & Philosophy */}
      <section className="grid gap-10 border-t border-border pt-14 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-4">
          <p className="font-mono-label text-xs text-accent">Personal Philosophy</p>
          <blockquote className="font-display text-2xl font-bold leading-snug text-text sm:text-3xl">
            &ldquo;{profile.philosophy.statement}&rdquo;
          </blockquote>
          <p className="text-sm leading-relaxed text-text-secondary">
            {profile.philosophy.supporting}
          </p>
        </div>

        <div className="lg:col-span-6 space-y-4 border border-border bg-bg-secondary/30 p-6 sm:p-8">
          <p className="font-mono-label text-xs text-accent">Career Aspirations</p>
          <h2 className="font-display text-xl font-bold text-text">
            {profile.careerGoals.headline}
          </h2>
          {profile.careerGoals.paragraphs.map((p, idx) => (
            <p key={idx} className="text-sm leading-relaxed text-text-secondary">
              {p}
            </p>
          ))}
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent hover:underline"
            >
              <span>Connect for opportunities</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
