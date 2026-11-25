export type TimelineCategory =
  | "Education"
  | "Projects"
  | "Leadership"
  | "Events"
  | "Achievements";

export type EventCategory =
  | "Hackathons"
  | "Technical Workshops"
  | "University Festivals"
  | "Social Awareness"
  | "Community Initiatives";

export type GalleryCategory =
  | "FOSS Club"
  | "TechSpace"
  | "Hackathons"
  | "Workshops"
  | "University Events"
  | "Achievements"
  | "Travelling"
  | "Personal Moments";

export interface ProfileData {
  name: string;
  monogram: string;
  location: string;
  email: string;
  primaryTagline: string;
  secondaryTagline: string;
  identityLine: string;
  animatedRoles: string[];
  heroSupporting: string;
  currentFocus: {
    label: string;
    items: string[];
  };
  profileImage: {
    src: string | null;
    alt: string;
  };
  resumePdfPath: string | null;
  aboutIntro: string[];
  pillars: {
    code: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  homepageStats: {
    value: number;
    suffix?: string;
    label: string;
    detail: string;
  }[];
  secondaryStats: {
    value: number;
    suffix?: string;
    label: string;
    context: string;
  }[];
  lifeBeyondCode: {
    title: string;
    tag: string;
    description: string;
  }[];
  careerGoals: {
    headline: string;
    paragraphs: string[];
  };
  philosophy: {
    statement: string;
    supporting: string;
  };
}

export interface SocialLink {
  id: string;
  label: string;
  href: string | null;
  displayValue: string;
  configured: boolean;
  external: boolean;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  status: "Currently Pursuing" | "Completed" | "Pending Confirmation";
  streamOrNotes?: string;
  confirmed: boolean;
}

export type SkillBasis = "project" | "workshop" | "fundamentals" | "leadership";

export interface SkillItem {
  name: string;
  basis: SkillBasis;
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  basisSummary: string;
  items: SkillItem[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  layer: "Input" | "Intelligence" | "Memory" | "Automation" | "Output";
  confirmedTech: string[];
  conceptualRole: string;
  isConceptualFlow: boolean;
}

export interface ProjectEntry {
  slug: "sara" | "pursuit" | "jaarvis";
  number: string;
  title: string;
  fullName: string;
  subtitle: string;
  category: string;
  projectType?: string;
  duration?: string;
  statusNote?: string;
  description: string;
  caseStudy: {
    overview: string;
    problemContext: string;
    approach: string;
  };
  features: string[];
  techStack: string[];
  visualTheme: "ai-terminal" | "mobile-fitness" | "voice-minimal";
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
  githubUrl: string | null;
  githubNote?: string;
  liveDemoUrl: string | null;
  architecture?: {
    disclaimer: string;
    nodes: ArchitectureNode[];
  };
}

export interface LeadershipRole {
  id: string;
  role: string;
  organization: string;
  duration: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  websiteUrl?: string;
  websiteNote?: string;
  highlights?: string[];
}

export interface WorkshopPhase {
  phase: string;
  dates: string;
  title: string;
  points: string[];
}

export interface EventEntry {
  id: string;
  name: string;
  date: string | null;
  organization: string;
  category: EventCategory;
  role: string;
  format?: string;
  description: string;
  highlights: string[];
  subEvents?: string[];
  recognition?: string;
  eventWebsite?: string;
  linkedinPostUrl: string | null;
  certificateId?: string;
  photos: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  phases?: WorkshopPhase[];
}

export interface WorkshopEntry {
  id: string;
  title: string;
  organization?: string;
  date: string | null;
  instructor: string;
  role: string;
  technology?: string;
  tool?: string;
  learnings: string[];
}

export interface AchievementEntry {
  id: string;
  title: string;
  type: "Certificate of Appreciation" | "Certificate of Mentorship" | "Hackathon Participation";
  category: "University Festivals" | "Social Awareness" | "Technical Mentorship" | "Hackathons";
  issuer: string;
  date: string | null;
  description: string;
  skillsDemonstrated?: string[];
  certificateImage: string | null;
  downloadFile: string | null;
}

export interface TimelineEntry {
  id: string;
  dateLabel: string;
  title: string;
  subtitle: string;
  category: TimelineCategory;
  description: string;
  linkHref?: string;
}

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  caption: string;
  date?: string;
}
