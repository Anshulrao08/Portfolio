import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";
import { BootLoader } from "@/components/BootLoader";
import { CommandPalette } from "@/components/CommandPalette";
import { DeveloperTerminal } from "@/components/DeveloperTerminal";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import { RecruiterGate } from "@/components/RecruiterGate";
import { profile } from "@/data/profile";
import { getConfiguredSocials } from "@/data/socials";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anshul Yadav | Developer, Innovator & Tech Community Leader",
    template: "%s | Anshul Yadav",
  },
  description:
    "Explore Anshul Yadav's portfolio featuring software development projects, artificial intelligence, technical leadership, community initiatives, mentorship and university achievements.",
  keywords: [
    "Anshul Yadav",
    "Web Developer",
    "MCA Student",
    "SRM University Delhi-NCR Sonepat",
    "FOSS Club President",
    "TechSpace Founder",
    "S.A.R.A.",
    "Pursuit",
    "Jaarvis",
  ],
  authors: [{ name: profile.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Anshul Yadav Portfolio",
    title: "Anshul Yadav | Developer, Innovator & Tech Community Leader",
    description:
      "Explore Anshul Yadav's portfolio featuring software development projects, artificial intelligence, technical leadership, community initiatives, mentorship and university achievements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshul Yadav | Developer, Innovator & Tech Community Leader",
    description:
      "MCA Student, Aspiring Web Developer, Tech Community Leader & AI Enthusiast.",
  },
};

const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('ay-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const linkedin = getConfiguredSocials().find((s) => s.id === "linkedin")?.href;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    email: profile.email,
    jobTitle: "MCA Student, Aspiring Web Developer & President of FOSS Club",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baghpat",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "SRM University Delhi-NCR, Sonepat",
    },
    ...(linkedin ? { sameAs: [linkedin] } : {}),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-text">
        <Providers>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <div className="grain-overlay" aria-hidden="true" />
          <BootLoader />
          <Navbar />
          <main id="main-content" className="flex-1">
            <RecruiterGate>{children}</RecruiterGate>
          </main>
          <Footer />
          <CommandPalette />
          <DeveloperTerminal />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
