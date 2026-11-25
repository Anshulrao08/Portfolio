import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Image as ImageIcon,
} from "lucide-react";
import { MobileDeviceFrame } from "@/components/MobileDeviceFrame";
import { SaraArchitecture } from "@/components/SaraArchitecture";
import { VoiceWaveform } from "@/components/VoiceWaveform";
import { profile } from "@/data/profile";
import { getProjectBySlug, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — ${project.fullName}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.fullName} | ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projects[(currentIdx - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIdx + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.fullName,
    applicationCategory: project.category,
    description: project.description,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <header className="grid gap-10 border-b border-border pb-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-accent font-semibold">PROJECT {project.number}</span>
            <span className="text-border-strong">/</span>
            <span className="text-text-secondary">{project.category}</span>
            {project.projectType && (
              <span className="border border-border bg-bg-secondary px-2 py-0.5 text-[11px] text-text">
                {project.projectType}
              </span>
            )}
            {project.duration && (
              <span className="border border-border bg-bg-secondary px-2 py-0.5 text-[11px] text-text">
                {project.duration}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="font-mono text-sm text-accent">{project.fullName}</p>
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
            {project.description}
          </p>

          {/* Action links (only active when real URLs exist) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-text bg-text px-4 py-2 font-mono text-xs uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              project.githubNote && (
                <div className="inline-flex items-center gap-2 border border-border bg-bg-secondary px-3.5 py-2 font-mono text-xs text-text-secondary">
                  <FolderGit2 className="h-3.5 w-3.5 text-accent" />
                  <span>{project.githubNote}</span>
                </div>
              )
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border-strong bg-bg px-4 py-2 font-mono text-xs uppercase tracking-wider text-text hover:border-accent"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          {project.visualTheme === "mobile-fitness" ? (
            <MobileDeviceFrame
              title={project.title}
              screenshots={project.screenshots}
              features={project.features}
              techStack={project.techStack}
            />
          ) : (
            <div className="space-y-4">
              <VoiceWaveform
                label={`${project.title} — Speech & Command Interface`}
                variant={project.slug === "sara" ? "sara" : "jaarvis"}
              />
              {project.statusNote && (
                <p className="border border-border bg-bg-secondary/40 px-4 py-3 font-mono text-xs text-text-secondary">
                  Milestone: <span className="text-text">{project.statusNote}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Case Study Breakdown */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <p className="font-mono-label text-xs text-accent">01 / Overview</p>
            <p className="text-base leading-relaxed text-text">
              {project.caseStudy.overview}
            </p>
          </div>
          <div className="space-y-2 border-t border-border pt-6">
            <p className="font-mono-label text-xs text-accent">02 / Problem Context</p>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {project.caseStudy.problemContext}
            </p>
          </div>
          <div className="space-y-2 border-t border-border pt-6">
            <p className="font-mono-label text-xs text-accent">03 / Engineering Approach</p>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {project.caseStudy.approach}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="border border-border bg-bg-secondary/30 p-6 space-y-4">
            <p className="font-mono-label text-xs text-accent">Key Features</p>
            <ul className="space-y-2.5 text-sm text-text">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 bg-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-bg p-6 space-y-4">
            <p className="font-mono-label text-xs text-accent">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border bg-bg-secondary px-3 py-1.5 font-mono text-xs text-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Diagram for S.A.R.A. */}
      {project.architecture && (
        <section className="space-y-4">
          <SaraArchitecture
            disclaimer={project.architecture.disclaimer}
            nodes={project.architecture.nodes}
            defaultExpanded
          />
        </section>
      )}

      {/* Honest Screenshot Gallery */}
      <section className="space-y-4 border-t border-border pt-10">
        <div className="flex items-center justify-between">
          <p className="font-mono-label text-xs text-accent">Screenshot Gallery</p>
          <span className="font-mono text-[11px] text-text-secondary">
            /public/images/projects/{project.slug}/
          </span>
        </div>

        {project.screenshots.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <figure key={shot.src} className="border border-border bg-bg-secondary p-3">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 font-mono text-xs text-text-secondary">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border-strong bg-bg-secondary/20 p-8 text-center space-y-2">
            <ImageIcon className="mx-auto h-6 w-6 text-text-secondary" />
            <p className="font-display text-base font-semibold text-text">
              Verified application screenshots pending upload
            </p>
            <p className="mx-auto max-w-xl text-xs leading-relaxed text-text-secondary">
              No synthetic or mock screenshots are generated for {project.title}. Real captures can be placed inside{" "}
              <code className="text-text">public/images/projects/{project.slug}/</code> and listed in{" "}
              <code className="text-text">src/data/projects.ts</code>.
            </p>
          </div>
        )}
      </section>

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Project Navigation"
        className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
      >
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group border border-border bg-bg-secondary/30 p-5 hover:border-accent transition-colors"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary group-hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous Project
          </span>
          <p className="mt-2 font-display text-xl font-bold text-text">
            {prevProject.number} — {prevProject.title}
          </p>
          <p className="text-xs text-text-secondary">{prevProject.subtitle}</p>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group border border-border bg-bg-secondary/30 p-5 text-right hover:border-accent transition-colors"
        >
          <span className="inline-flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary group-hover:text-accent">
            Next Project
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <p className="mt-2 font-display text-xl font-bold text-text">
            {nextProject.number} — {nextProject.title}
          </p>
          <p className="text-xs text-text-secondary">{nextProject.subtitle}</p>
        </Link>
      </nav>
    </div>
  );
}
