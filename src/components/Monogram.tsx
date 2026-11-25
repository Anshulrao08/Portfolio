"use client";

import { useState } from "react";

interface MonogramProps {
  size?: number;
  interactive?: boolean;
  className?: string;
}

export function Monogram({ size = 32, interactive = false, className = "" }: MonogramProps) {
  const [clicks, setClicks] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);

  const handleInteract = () => {
    if (!interactive) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) {
      setHintVisible(true);
      setTimeout(() => setHintVisible(false), 3200);
      setClicks(0);
    }
  };

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        onClick={handleInteract}
        className={interactive ? "transition-transform duration-200 hover:scale-105 cursor-pointer" : ""}
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Architectural A */}
        <path
          d="M8.5 30L15.2 10H17.6L21.5 22.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
        />
        <path
          d="M11 23.5H19"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
        {/* Intersecting Y with accent node */}
        <path
          d="M20.5 10L26 19.5L31.5 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
        />
        <path
          d="M26 19.5V30"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
        />
        <rect x="24.5" y="28.5" width="3" height="3" fill="var(--accent)" />
      </svg>
      {hintVisible && (
        <span
          role="status"
          className="absolute left-0 top-full mt-2 whitespace-nowrap border border-border bg-bg-secondary px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase text-text shadow-sm z-50"
        >
          AY // Develop · Innovate · Lead (Press ~ for terminal)
        </span>
      )}
    </span>
  );
}
