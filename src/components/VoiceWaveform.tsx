"use client";

import { useState } from "react";
import { Mic, Pause, Play } from "lucide-react";

interface VoiceWaveformProps {
  label: string;
  variant?: "sara" | "jaarvis";
}

const BAR_HEIGHTS_SARA = [22, 42, 68, 36, 84, 52, 92, 46, 74, 30, 86, 58, 40, 76, 32, 62, 44, 28];
const BAR_HEIGHTS_JAARVIS = [18, 34, 54, 72, 40, 62, 48, 28, 56, 36, 22];

export function VoiceWaveform({ label, variant = "sara" }: VoiceWaveformProps) {
  const [active, setActive] = useState(true);
  const bars = variant === "sara" ? BAR_HEIGHTS_SARA : BAR_HEIGHTS_JAARVIS;

  return (
    <div className="border border-border bg-bg p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-secondary">
          <Mic className="h-3.5 w-3.5 text-accent" />
          <span className="uppercase tracking-wider">{label}</span>
        </div>
        <button
          type="button"
          onClick={() => setActive((prev) => !prev)}
          aria-label={active ? "Pause conceptual waveform" : "Animate conceptual waveform"}
          className="inline-flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-text-secondary hover:border-border-strong hover:text-text"
        >
          {active ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
          <span>{active ? "Active" : "Paused"}</span>
        </button>
      </div>

      <div
        className="flex h-16 items-end gap-1.5 border-y border-border/70 py-2"
        aria-hidden="true"
      >
        {bars.map((height, idx) => (
          <span
            key={idx}
            className={`flex-1 bg-text/75 transition-all duration-500 ${
              active ? "animate-pulse" : ""
            }`}
            style={{
              height: active ? `${height}%` : "24%",
              animationDelay: `${idx * 90}ms`,
              backgroundColor: idx % 4 === 2 ? "var(--accent)" : undefined,
            }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] text-text-secondary">
        Conceptual speech-pipeline indicator (not an audio recording).
      </p>
    </div>
  );
}
