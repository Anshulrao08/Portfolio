import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { LeadershipShowcase } from "@/components/LeadershipShowcase";
import { PhilosophyAndGoals } from "@/components/PhilosophyAndGoals";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { SkillsShowcase } from "@/components/SkillsShowcase";
import { StatsAndEducation } from "@/components/StatsAndEducation";

import ImpactCounters from "@/components/ImpactCounters";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsAndEducation />
      <SkillsShowcase />
      <ProjectsShowcase />
      <LeadershipShowcase />
      <PhilosophyAndGoals />
      <ContactSection />
    </>
  );
}
