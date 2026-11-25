"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, X } from "lucide-react";
import { achievements } from "@/data/achievements";
import { getPublicEducation } from "@/data/education";
import { leadershipRoles } from "@/data/leadership";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { getConfiguredSocials } from "@/data/socials";
import { useApp } from "./Providers";

interface LogEntry {
  id: number;
  command?: string;
  lines: string[];
}

const HELP_LINES = [
  "Available commands:",
  "  help          List supported commands",
  "  about         Profile overview and personal pillars",
  "  skills        Categorized technical & leadership skills",
  "  projects      Featured software projects (S.A.R.A., Pursuit, Jaarvis)",
  "  education     Academic timeline (confirmed records)",
  "  leadership    FOSS Club, TechSpace, and Internal Committee",
  "  achievements  Certificates and hackathon participation",
  "  contact       Email, LinkedIn, and location",
  "  resume        Open printable resume page",
  "  clear         Clear terminal output",
  "  exit          Close terminal",
];

export function DeveloperTerminal() {
  const router = useRouter();
  const { terminalOpen, setTerminalOpen } = useApp();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: 0,
      lines: [
        "AY-SHELL // Anshul Yadav Portfolio Terminal",
        "Type `help` to inspect available commands. Arbitrary OS commands are disabled.",
      ],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (!terminalOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerminalOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [terminalOpen, setTerminalOpen]);

  if (!terminalOpen) return null;

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const append = (lines: string[]) =>
      setHistory((prev) => [...prev, { id: prev.length + 1, command: raw, lines }]);

    switch (cmd) {
      case "help":
        append(HELP_LINES);
        break;
      case "about":
        append([
          `${profile.name} — ${profile.identityLine}`,
          `Location: ${profile.location}`,
          `Tagline: "${profile.primaryTagline}"`,
          "",
          profile.aboutIntro[0],
        ]);
        break;
      case "skills":
        append(
          skillCategories.map(
            (cat) => `[${cat.title}] -> ${cat.items.map((i) => i.name).join(", ")}`
          )
        );
        break;
      case "projects":
        append(
          projects.map(
            (p) =>
              `${p.number}. ${p.title} (${p.fullName}) [${p.category}] — ${p.techStack.join(", ")}`
          )
        );
        break;
      case "education":
        append(
          getPublicEducation().map(
            (e) => `• ${e.degree} — ${e.institution} (${e.period}) [${e.status}]`
          )
        );
        break;
      case "leadership":
        append(
          leadershipRoles.map(
            (l) => `• ${l.role} @ ${l.organization}${l.duration ? ` (${l.duration})` : ""}`
          )
        );
        break;
      case "achievements":
        append(
          achievements.map((a) => `• ${a.title} — ${a.issuer}${a.date ? ` (${a.date})` : ""}`)
        );
        break;
      case "contact":
        append([
          `Location: ${profile.location}`,
          ...getConfiguredSocials().map((s) => `${s.label}: ${s.href ?? s.displayValue}`),
        ]);
        break;
      case "resume":
        append(["Opening /resume ..."]);
        setTimeout(() => {
          setTerminalOpen(false);
          router.push("/resume");
        }, 250);
        break;
      case "clear":
        setHistory([]);
        break;
      case "exit":
        setTerminalOpen(false);
        break;
      default:
        append([`Command not recognized: "${cmd}". Type "help" to list available commands.`]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal"
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4 backdrop-blur-xs"
      onClick={() => setTerminalOpen(false)}
    >
      <div
        className="flex h-[78vh] sm:h-[520px] w-full max-w-3xl flex-col border border-border-strong bg-[#0d0d0d] text-[#f4f2ed] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#292929] bg-[#141414] px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-xs text-[#a3a3a3]">
            <TerminalIcon className="h-3.5 w-3.5 text-[#c6f432]" />
            <span>anshul@portfolio:~</span>
          </div>
          <button
            type="button"
            onClick={() => setTerminalOpen(false)}
            aria-label="Close terminal"
            className="text-[#a3a3a3] hover:text-[#f4f2ed]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-4"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry) => (
            <div key={entry.id} className="space-y-1">
              {entry.command && (
                <div className="flex items-center gap-2 text-[#c6f432]">
                  <span>$</span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.lines.map((line, i) => (
                <p key={i} className="whitespace-pre-wrap text-[#e2e0da]">
                  {line}
                </p>
              ))}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(input);
            setInput("");
          }}
          className="flex items-center gap-2 border-t border-[#292929] bg-[#141414] px-4 py-3 font-mono text-xs"
        >
          <span className="text-[#c6f432]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (help, projects, skills, leadership, exit)..."
            aria-label="Terminal command input"
            className="w-full bg-transparent text-[#f4f2ed] placeholder:text-[#737373] focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
