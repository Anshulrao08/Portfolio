import type { EducationEntry } from "./types";

export const educationEntries: EducationEntry[] = [
  {
    id: "mca-srm",
    degree: "Master of Computer Applications (MCA)",
    institution: "SRM University Delhi-NCR, Sonepat",
    location: "Sonepat, Haryana",
    period: "July 2026 – July 2028 (Expected)",
    status: "Currently Pursuing",
    streamOrNotes: "Postgraduate studies in computer applications, software development, and leadership.",
    confirmed: true,
  },
  {
    id: "bca-srm",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "SRM University Delhi-NCR, Sonepat",
    location: "Sonepat, Haryana",
    period: "August 2023 – June 2026",
    status: "Completed",
    streamOrNotes:
      "Built foundational software engineering skills and completed the S.A.R.A. major project alongside campus leadership.",
    confirmed: true,
  },
  {
    id: "class-xii",
    degree: "Senior Secondary Education — Class XII",
    institution: "Dev Krishna Public School",
    period: "To be confirmed",
    status: "Pending Confirmation",
    streamOrNotes: "Passing year and stream to be confirmed.",
    // Kept in configuration and hidden from public UI until confirmed
    confirmed: false,
  },
  {
    id: "class-x",
    degree: "Secondary Education — Class X",
    institution: "Dev Krishna Public School",
    period: "2021",
    status: "Completed",
    confirmed: true,
  },
];

export function getPublicEducation(): EducationEntry[] {
  return educationEntries.filter((entry) => entry.confirmed);
}
