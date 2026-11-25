"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { getConfiguredSocials } from "@/data/socials";
import { ContactForm } from "./ContactForm";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const linkedin = getConfiguredSocials().find((s) => s.id === "linkedin");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore if clipboard permission denied
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="09"
          eyebrow="Contact"
          title="Let's Build Something Meaningful Together."
          description="I am always interested in exploring new opportunities, collaborating on innovative projects, connecting with technology enthusiasts and contributing to meaningful initiatives."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              Whether it&apos;s web development, artificial intelligence, technical projects, community building or leadership opportunities, I would love to connect and explore what we can create together.
            </p>

            <div className="divide-y divide-border border border-border bg-bg-secondary/30">
              <div className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-text hover:text-accent"
                  >
                    <Mail className="h-3.5 w-3.5 text-accent" />
                    <span>{profile.email}</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 border border-border bg-bg px-2.5 py-1.5 font-mono text-[11px] text-text-secondary hover:border-border-strong hover:text-text"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-accent" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {linkedin?.href && (
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                    LinkedIn
                  </p>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-accent"
                  >
                    <span>{linkedin.displayValue}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
                  </a>
                </div>
              )}

              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                  Location
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-text">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span>{profile.location}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
