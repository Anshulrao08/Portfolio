import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="border border-border bg-bg-secondary/40 p-8 sm:p-12">
        <p className="font-mono-label text-xs text-accent">Error 404 // Route Not Found</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          This page doesn&apos;t exist in the archive.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          The link may have moved or been mistyped. You can head back to the main portfolio or jump directly to projects, leadership, or the command palette (Ctrl+K).
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-text bg-text px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border border-border-strong bg-bg px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text hover:border-accent transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
