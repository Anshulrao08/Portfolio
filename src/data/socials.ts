import type { SocialLink } from "./types";

export const socials: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: "mailto:anshulydv08@gmail.com",
    displayValue: "anshulydv08@gmail.com",
    configured: true,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anshul-yadav-3a7b4b293/",
    displayValue: "linkedin.com/in/anshul-yadav-3a7b4b293",
    configured: true,
    external: true,
  },
  // Configurable placeholders — remain hidden from UI until real URLs are provided
  {
    id: "github",
    label: "GitHub",
    href: null,
    displayValue: "Not configured yet",
    configured: false,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: null,
    displayValue: "Not configured yet",
    configured: false,
    external: true,
  },
];

export function getConfiguredSocials(): SocialLink[] {
  return socials.filter((item) => item.configured && Boolean(item.href));
}
