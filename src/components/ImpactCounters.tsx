"use client";
import React, { useEffect, useRef, useState } from "react";
import { getStats } from "@/utils/calcStats";

// Simple counter component that animates from 0 to target value when visible.
function Counter({ label, value }: { label: string; value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReduced) {
              setDisplay(value);
            } else {
              const start = performance.now();
              const duration = 1200; // ms
              const step = (timestamp: number) => {
                const progress = Math.min((timestamp - start) / duration, 1);
                setDisplay(Math.floor(progress * value));
                if (progress < 1) requestAnimationFrame(step);
                else setDisplay(value);
              };
              requestAnimationFrame(step);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, prefersReduced]);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-4xl font-bold text-primary-accent dark:text-primary-accent">{display}</div>
      <div className="text-sm text-secondary-text dark:text-secondary-text mt-1">{label}</div>
    </div>
  );
}

export default function ImpactCounters() {
  const stats = getStats();
  const items = [
    { label: "Projects", value: stats.projects },
    { label: "Events", value: stats.events },
    { label: "Certifications", value: stats.certifications },
    { label: "Achievements", value: stats.achievements },
    { label: "Leadership", value: stats.leadership },
    { label: "Workshops", value: stats.workshops },
    { label: "Mentorship", value: stats.mentorship },
    { label: "Hackathons", value: stats.hackathons },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8" aria-label="Impact statistics">
      {items.map((item) => (
        <Counter key={item.label} label={item.label} value={item.value} />
      ))}
    </section>
  );
}
