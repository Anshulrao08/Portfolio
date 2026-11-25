import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-2">
        <div className="flex items-center gap-3 font-mono text-xs text-text-secondary">
          <span className="text-accent font-semibold">{index}</span>
          <span>/</span>
          <span className="uppercase tracking-widest">{eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1.5 self-start border border-border-strong bg-bg-secondary px-4 py-2 font-mono text-xs uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors md:self-auto"
        >
          <span>{actionLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
