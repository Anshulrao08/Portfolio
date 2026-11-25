import { achievements } from "./achievements";
import { getPublicEducation } from "./education";
import { events } from "./events";
import { leadershipRoles } from "./leadership";
import { projects } from "./projects";
import { skillCategories } from "./skills";
import { workshops } from "./workshops";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  type: "Page" | "Project" | "Event" | "Achievement" | "Skill" | "Education" | "Leadership" | "Workshop";
  href: string;
  keywords: string;
}

export function getSearchIndex(): SearchItem[] {
  const pages: SearchItem[] = [
    { id: "nav-home", title: "Home", subtitle: "Main editorial portfolio overview", type: "Page", href: "/", keywords: "home overview hero" },
    { id: "nav-about", title: "About Me", subtitle: "Story, pillars, career goals & life beyond code", type: "Page", href: "/about", keywords: "about bio pillars hobbies gaming travelling" },
    { id: "nav-projects", title: "Projects", subtitle: "S.A.R.A., Pursuit, Jaarvis", type: "Page", href: "/projects", keywords: "projects portfolio software ai android python" },
    { id: "nav-leadership", title: "Leadership", subtitle: "FOSS Club, TechSpace, Internal Committee", type: "Page", href: "/leadership", keywords: "leadership president founder gender champion" },
    { id: "nav-events", title: "Events & Workshops", subtitle: "HackPrix, Four Days of AI, VERGE, DSA Workshop", type: "Page", href: "/events", keywords: "events workshops hackathons mentorship" },
    { id: "nav-journey", title: "Journey Timeline", subtitle: "Chronological milestone archive (2021 – Present)", type: "Page", href: "/journey", keywords: "journey timeline history" },
    { id: "nav-achievements", title: "Achievements & Certificates", subtitle: "Verified recognitions and mentorship", type: "Page", href: "/achievements", keywords: "achievements certificates awards" },
    { id: "nav-gallery", title: "Photo Gallery", subtitle: "Campus memories and community moments", type: "Page", href: "/gallery", keywords: "gallery photos images" },
    { id: "nav-resume", title: "Resume", subtitle: "Printable recruiter-ready curriculum vitae", type: "Page", href: "/resume", keywords: "resume cv print pdf" },
    { id: "nav-contact", title: "Contact", subtitle: "Email, LinkedIn & direct inquiry form", type: "Page", href: "/contact", keywords: "contact email linkedin hire collaborate" },
  ];

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: `proj-${p.slug}`,
    title: `${p.title} — ${p.fullName}`,
    subtitle: p.category,
    type: "Project",
    href: `/projects/${p.slug}`,
    keywords: `${p.title} ${p.fullName} ${p.description} ${p.techStack.join(" ")} ${p.features.join(" ")}`,
  }));

  const eventItems: SearchItem[] = events.map((e) => ({
    id: `evt-${e.id}`,
    title: e.name,
    subtitle: `${e.organization}${e.date ? ` · ${e.date}` : ""}`,
    type: "Event",
    href: `/events#${e.id}`,
    keywords: `${e.name} ${e.organization} ${e.category} ${e.role} ${e.description} ${(e.subEvents ?? []).join(" ")}`,
  }));

  const achievementItems: SearchItem[] = achievements.map((a) => ({
    id: `ach-${a.id}`,
    title: a.title,
    subtitle: a.issuer,
    type: "Achievement",
    href: `/achievements#${a.id}`,
    keywords: `${a.title} ${a.type} ${a.issuer} ${a.description}`,
  }));

  const leadershipItems: SearchItem[] = leadershipRoles.map((l) => ({
    id: `lead-${l.id}`,
    title: `${l.role} — ${l.organization}`,
    subtitle: l.duration ?? "University Initiative",
    type: "Leadership",
    href: `/leadership#${l.id}`,
    keywords: `${l.role} ${l.organization} ${l.description} ${l.responsibilities.join(" ")}`,
  }));

  const workshopItems: SearchItem[] = workshops.map((w) => ({
    id: `ws-${w.id}`,
    title: w.title,
    subtitle: `${w.role} · Instructor: ${w.instructor}`,
    type: "Workshop",
    href: `/events#${w.id}`,
    keywords: `${w.title} ${w.instructor} ${w.role} ${w.learnings.join(" ")}`,
  }));

  const educationItems: SearchItem[] = getPublicEducation().map((ed) => ({
    id: `edu-${ed.id}`,
    title: ed.degree,
    subtitle: `${ed.institution} · ${ed.period}`,
    type: "Education",
    href: `/about#education`,
    keywords: `${ed.degree} ${ed.institution} ${ed.period} ${ed.status}`,
  }));

  const skillItems: SearchItem[] = skillCategories.map((cat) => ({
    id: `skill-${cat.id}`,
    title: cat.title,
    subtitle: cat.items.map((i) => i.name).join(", "),
    type: "Skill",
    href: `/#skills`,
    keywords: `${cat.title} ${cat.subtitle} ${cat.items.map((i) => i.name).join(" ")}`,
  }));

  return [
    ...pages,
    ...projectItems,
    ...leadershipItems,
    ...eventItems,
    ...achievementItems,
    ...workshopItems,
    ...educationItems,
    ...skillItems,
  ];
}
