"use client";

import { Download, Printer } from "lucide-react";

export function ResumeActions({ resumePdfPath }: { resumePdfPath: string | null }) {
  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 border border-text bg-text px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-bg hover:border-accent hover:bg-accent hover:text-accent-ink transition-colors"
      >
        <Printer className="h-3.5 w-3.5" />
        <span>Print / Save as PDF</span>
      </button>

      {resumePdfPath && (
        <a
          href={resumePdfPath}
          download
          className="inline-flex items-center gap-2 border border-border-strong bg-bg-secondary px-4 py-2 font-mono text-xs uppercase tracking-wider text-text hover:border-accent transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download Uploaded Resume PDF</span>
        </a>
      )}
    </div>
  );
}
