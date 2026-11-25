"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Info } from "lucide-react";
import type { ArchitectureNode } from "@/data/types";

interface SaraArchitectureProps {
  disclaimer: string;
  nodes: ArchitectureNode[];
  defaultExpanded?: boolean;
}

export function SaraArchitecture({
  disclaimer,
  nodes,
  defaultExpanded = false,
}: SaraArchitectureProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [selectedId, setSelectedId] = useState<string>(nodes[0]?.id ?? "");

  const selectedNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  return (
    <div className="border border-border bg-bg-secondary/60">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-bg-secondary transition-colors"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
            Interactive Architecture Map
          </p>
          <p className="text-sm font-medium text-text">
            Inspect S.A.R.A. System Layers &amp; Confirmed Stack
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-text-secondary shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border p-4 space-y-4">
          <div className="flex items-start gap-2 border border-border bg-bg px-3 py-2 text-xs text-text-secondary">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <p>{disclaimer}</p>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
            {nodes.map((node, index) => {
              const active = node.id === selectedNode?.id;
              return (
                <div key={node.id} className="flex flex-1 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    className={`w-full h-full border p-3 text-left transition-colors ${
                      active
                        ? "border-accent bg-bg"
                        : "border-border bg-bg/50 hover:border-border-strong"
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                      0{index + 1} · {node.layer}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold text-text">
                      {node.label}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {node.confirmedTech.map((tech) => (
                        <span
                          key={tech}
                          className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-text"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                  {index < nodes.length - 1 && (
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden h-4 w-4 shrink-0 text-text-secondary lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {selectedNode && (
            <div className="border border-border bg-bg p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-sm font-semibold text-text">
                  {selectedNode.label}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                  Conceptual Flow Stage
                </span>
              </div>
              <p className="mt-1.5 text-sm text-text-secondary">
                {selectedNode.conceptualRole}
              </p>
              <p className="mt-2 font-mono text-xs text-text">
                Confirmed Technologies: {selectedNode.confirmedTech.join(", ")}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
