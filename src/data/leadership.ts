import type { LeadershipRole } from "./types";

export const leadershipRoles: LeadershipRole[] = [
  {
    id: "foss-club",
    role: "President",
    organization: "FOSS Club, SRM University, Sonepat",
    duration: "September 2026 – Present",
    current: true,
    description:
      "Leading the university's open-source student community—driving technical workshops, hackathons, collaborative engineering initiatives, and partnerships across students, faculty, and industry.",
    responsibilities: [
      "Leading the student leadership team",
      "Coordinating technical workshops",
      "Organizing hackathons",
      "Promoting open-source initiatives",
      "Working with faculty, students and industry partners",
      "Building an active and collaborative technical community",
      "Encouraging innovation and practical learning",
    ],
    websiteUrl: "https://foss-webpage.vercel.app/",
    websiteNote: "Official FOSS Club community website",
    highlights: ["Four Days of AI (1–4 September 2026)", "HackPrix 2026 (26 September 2026)"],
  },
  {
    id: "techspace",
    role: "Founder and Former President",
    organization: "TechSpace, SRM University, Sonepat",
    duration: "August 2025 – July 2026",
    current: false,
    description:
      "Founded and led TechSpace, a university technical society focused on practical learning, innovation, programming and student collaboration.",
    responsibilities: [
      "Establishing a technical student community",
      "Building and coordinating the core team",
      "Organizing technical workshops",
      "Supporting student mentorship",
      "Promoting collaborative learning",
      "Managing technical initiatives",
    ],
    websiteUrl: "https://techspacesrmuniversity.vercel.app/",
    websiteNote: "Official TechSpace club website",
    highlights: [
      "Six-Day DSA Using Java Workshop (3-phase initiative)",
      "DSA Using Java Bootcamp Mentorship",
    ],
  },
  {
    id: "gender-champion",
    role: "Gender Champion",
    organization: "Internal Committee, SRM University Delhi-NCR",
    duration: null,
    current: false,
    description:
      "Contributed to university initiatives that promote gender awareness, equality, mutual respect and a positive campus environment.",
    responsibilities: [
      "Short Film Competition 2026",
      "Myth & Reality on Social Issues panel discussion",
      "Student engagement",
      "Social awareness initiatives",
      "Event coordination",
    ],
    highlights: [
      "Certificate of Appreciation — Short Film Competition 2026",
      "Certificate of Appreciation — Myth & Reality on Social Issues",
    ],
  },
];
