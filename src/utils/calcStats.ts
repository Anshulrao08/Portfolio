/*
 * Utility to calculate portfolio statistics.
 * This implementation provides a basic placeholder that counts
 * entries based on the current codebase. For a production scenario,
 * you would replace the static numbers with real calculations that
 * inspect your data sources (e.g., projects JSON, markdown files, etc.).
 */

type Stats = {
  projects: number;
  events: number;
  certifications: number;
  achievements: number;
  leadership: number;
  workshops: number;
  mentorship: number;
  hackathons: number;
};

/**
 * Returns an object containing the portfolio statistics.
 * Currently returns static counts; adapt to your data sources as needed.
 */
export function getStats(): Stats {
  // TODO: replace static values with dynamic calculations.
  return {
    projects: 5,
    events: 3,
    certifications: 4,
    achievements: 7,
    leadership: 2,
    workshops: 3,
    mentorship: 5,
    hackathons: 2,
  };
}
