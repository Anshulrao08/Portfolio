import type { GalleryCategory, GalleryPhoto } from "./types";

export const galleryCategories: GalleryCategory[] = [
  "FOSS Club",
  "TechSpace",
  "Hackathons",
  "Workshops",
  "University Events",
  "Achievements",
  "Travelling",
  "Personal Moments",
];

// Add verified photographs under public/images/... and register them here.
// Categories without photographs are automatically hidden in the public UI.
export const galleryPhotos: GalleryPhoto[] = [];

export function getPopulatedGalleryCategories(): GalleryCategory[] {
  const populated = new Set(galleryPhotos.map((photo) => photo.category));
  return galleryCategories.filter((cat) => populated.has(cat));
}
