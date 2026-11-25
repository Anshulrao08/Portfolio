import type { Metadata } from "next";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore S.A.R.A. (Smart Automated Response Assistant), Pursuit (Android Fitness Tracker App), and Jaarvis (Python Desktop Voice Assistant).",
};

export default function ProjectsPage() {
  return (
    <div className="py-6">
      <ProjectsShowcase />
    </div>
  );
}
