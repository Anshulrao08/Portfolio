import type { WorkshopEntry } from "./types";

export const workshops: WorkshopEntry[] = [
  {
    id: "ethical-hacking-bug-bounty",
    title: "Ethical Hacking & Practical Bug Bounty",
    organization: "Everhack",
    date: null,
    instructor: "Jnyandeep Koyya",
    role: "Participant",
    learnings: [
      "Vulnerability assessment",
      "Ethical hacking fundamentals",
      "Practical bug hunting",
      "Security research",
    ],
  },
  {
    id: "java-gui-development",
    title: "Java GUI Development Workshop",
    date: null,
    instructor: "Yatharth",
    role: "Participant and Coordinator",
    technology: "Java",
    tool: "NetBeans IDE",
    learnings: [
      "Graphical user interface development",
      "Desktop application development",
      "Practical implementation",
      "Event planning",
      "On-ground management",
      "Workshop coordination",
    ],
  },
  {
    id: "devops-workshop",
    title: "DevOps Workshop",
    date: "18 November 2025",
    instructor: "Sachin Davra",
    role: "Participant and Coordinator",
    learnings: [
      "DevOps fundamentals",
      "Development and operations practices",
      "Modern development workflows",
      "DevOps tools exposure",
      "Planning and coordination",
      "Teamwork",
    ],
  },
];
