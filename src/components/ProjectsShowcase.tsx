import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects } from "@/data/projects";
import { MobileDeviceFrame } from "./MobileDeviceFrame";
import { SaraArchitecture } from "./SaraArchitecture";
import { SectionHeading } from "./SectionHeading";
import { VoiceWaveform } from "./VoiceWaveform";

export function ProjectsShowcase() {
  const sara = projects.find((p) => p.slug === "sara")!;
  const pursuit = projects.find((p) => p.slug === "pursuit")!;
  const jaarvis = projects.find((p) => p.slug === "jaarvis")!;

  return (
    <section id="projects" className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          index="05"
          eyebrow="Selected Work"
          title="Software built with practical intent."
          description="Three distinct engineering efforts spanning AI desktop automation, native Android fitness tracking, and voice-driven utility computing."
          actionHref="/projects"
          actionLabel="All Project Case Studies"
        />

        {/* PROJECT 01 — S.A.R.A. (Full-width feature dossier) */}
        <article className="border border-border bg-bg-secondary/35 p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="text-accent font-semibold">PROJECT {sara.number}</span>
                <span className="text-border-strong">/</span>
                <span className="text-text-secondary">{sara.category}</span>
                {sara.projectType && (
                  <span className="border border-border bg-bg px-2 py-0.5 text-[11px] text-text">
                    {sara.projectType}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  {sara.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-text-secondary">
                  {sara.fullName}
                </p>
              </div>

              <p className="text-base leading-relaxed text-text-secondary">
                {sara.description}
              </p>

              <div className="grid gap-2 sm:grid-cols-2 pt-1">
                {sara.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 border-l-2 border-accent/70 pl-3 text-sm text-text"
                  >
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {sara.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <VoiceWaveform label="S.A.R.A. Voice & Response Engine" variant="sara" />

              <div className="border border-border bg-bg p-4 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                  <FolderGit2 className="h-3.5 w-3.5 text-accent" />
                  <span>{sara.githubNote}</span>
                </div>
                <Link
                  href="/projects/sara"
                  className="inline-flex w-full items-center justify-between border border-text bg-text px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
                >
                  <span>Read S.A.R.A. Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {sara.architecture && (
            <SaraArchitecture
              disclaimer={sara.architecture.disclaimer}
              nodes={sara.architecture.nodes}
            />
          )}
        </article>

        {/* PROJECTS 02 & 03 — Asymmetric Dual Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* PROJECT 02 — Pursuit (7 cols, Mobile Frame + Specs) */}
          <article className="lg:col-span-7 border border-border bg-bg p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="text-accent font-semibold">PROJECT {pursuit.number}</span>
                  <span className="text-border-strong">/</span>
                  <span className="text-text-secondary">{pursuit.duration}</span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-text sm:text-3xl">
                    {pursuit.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-text-secondary">
                    {pursuit.fullName}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {pursuit.description}
                </p>

                <ul className="space-y-1.5 text-sm text-text">
                  {pursuit.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-accent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {pursuit.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-border bg-bg-secondary px-2.5 py-1 font-mono text-[11px] text-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <MobileDeviceFrame
                  title={pursuit.title}
                  screenshots={pursuit.screenshots}
                  features={pursuit.features}
                  techStack={pursuit.techStack}
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 flex items-center justify-between">
              <span className="font-mono text-[11px] text-text-secondary">
                {pursuit.category}
              </span>
              <Link
                href="/projects/pursuit"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-text hover:text-accent transition-colors"
              >
                <span>Open Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>

          {/* PROJECT 03 — Jaarvis (5 cols, Minimal Voice Utility Dossier) */}
          <article className="lg:col-span-5 border border-border bg-bg-secondary/40 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-accent font-semibold">PROJECT {jaarvis.number}</span>
                <span className="text-border-strong">/</span>
                <span className="text-text-secondary">{jaarvis.duration}</span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-text sm:text-3xl">
                  {jaarvis.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-text-secondary">
                  {jaarvis.category}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                {jaarvis.description}
              </p>

              <VoiceWaveform label="Jaarvis Command Listener" variant="jaarvis" />

              <div className="space-y-2">
                <p className="font-mono-label text-[10px] text-text-secondary">
                  Confirmed Capabilities
                </p>
                <ul className="space-y-1.5 text-sm text-text">
                  {jaarvis.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1 w-1 bg-accent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex flex-wrap gap-1.5">
                {jaarvis.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-bg px-2.5 py-1 font-mono text-[11px] text-text"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href="/projects/jaarvis"
                className="inline-flex w-full items-center justify-between border border-border-strong bg-bg px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors"
              >
                <span>Open Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
