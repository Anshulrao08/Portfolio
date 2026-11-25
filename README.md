# Anshul Yadav — Personal Portfolio

A custom-designed, editorial-first personal portfolio for **Anshul Yadav** built with Next.js (App Router), TypeScript, Tailwind CSS, GSAP, Lenis, React Hook Form, Zod, and Resend.

## Routes

- `/` — Main portfolio experience
- `/about` — Full story, three personal pillars (`BUILD`, `LEAD`, `GROW`), education, life beyond code, philosophy, and career vision
- `/projects` — Featured software projects overview
- `/projects/sara` — S.A.R.A. (Smart Automated Response Assistant) case study & interactive architecture map
- `/projects/pursuit` — Pursuit Android fitness tracker case study
- `/projects/jaarvis` — Jaarvis Python desktop voice assistant case study
- `/leadership` — FOSS Club, TechSpace, Internal Committee (Gender Champion), and Technical Mentorship
- `/events` — Categorized events, expandable 3-phase Six-Day DSA Workshop timeline, and technical workshops
- `/journey` — Scroll-driven chronological timeline (2021 – Present) with category filters
- `/achievements` — Certificates of Appreciation, Certificate of Mentorship, and SRM Builds 4.0 hackathon participation
- `/gallery` — Masonry photo gallery with keyboard/touch lightbox (empty categories remain hidden until photos are added)
- `/resume` — Printable, recruiter-ready HTML resume (plus real PDF download once uploaded)
- `/contact` — Direct email/LinkedIn & validated contact form with Resend delivery and `mailto:` fallback

## Centralized Content System (`src/data/`)

All personal details live separately from UI components:
- `src/data/profile.ts` — Bio, taglines, pillars, stats, life beyond code, career goals, philosophy, portrait & resume PDF paths
- `src/data/socials.ts` — Email, LinkedIn, and optional configurable social placeholders
- `src/data/education.ts` — Education records (`confirmed: false` keeps unconfirmed entries like Class XII hidden until confirmed)
- `src/data/skills.ts` — Categorized skills distinguishing project stack vs. workshop exposure
- `src/data/projects.ts` — Project case studies, features, tech stacks, architecture layers, screenshots
- `src/data/leadership.ts` — Club leadership & committee roles
- `src/data/events.ts` — Events organized and coordinated
- `src/data/workshops.ts` — Technical workshops attended and coordinated
- `src/data/achievements.ts` — Recognitions, certificates, and hackathon participation
- `src/data/timeline.ts` — Chronological milestones
- `src/data/gallery.ts` — Photo gallery registry

## Asset Checklist (`public/`)

Place real files in these folders and register their paths in `src/data/`:

- `public/images/profile/` — Portrait photograph (`profile.profileImage.src` in `src/data/profile.ts`)
- `public/images/projects/sara/` — S.A.R.A. application screenshots (`screenshots` in `src/data/projects.ts`)
- `public/images/projects/pursuit/` — Pursuit Android app screenshots (`screenshots` in `src/data/projects.ts`)
- `public/images/projects/jaarvis/` — Jaarvis screenshots (`screenshots` in `src/data/projects.ts`)
- `public/images/events/foss/` — FOSS Club event photos
- `public/images/events/techspace/` — TechSpace event photos
- `public/images/events/verge/` — VERGE 2026 event photos
- `public/images/events/internal-committee/` — Internal Committee event photos
- `public/images/certificates/` — Scanned/PDF certificates (`certificateImage` & `downloadFile` in `src/data/achievements.ts`)
- `public/images/travel/` — Travel photographs (`src/data/gallery.ts`)
- `public/images/personal/` — Personal moments (`src/data/gallery.ts`)
- `public/documents/` — Resume PDF (`profile.resumePdfPath` in `src/data/profile.ts`)

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

See `.env.example`:
- `NEXT_PUBLIC_SITE_URL` — Production URL for canonical metadata, Open Graph, sitemap, and robots.txt
- `RESEND_API_KEY` — Optional Resend API key for contact form email delivery (if unset, visitors are honestly informed and given a pre-filled `mailto:` button)
- `CONTACT_FROM_EMAIL` — Verified sender address for Resend
- `CONTACT_TO_EMAIL` — Recipient inbox (`anshulydv08@gmail.com`)

## Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket (or run `vercel` CLI directly).
2. Import the project in Vercel (framework preset: **Next.js**).
3. Configure environment variables (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`).
4. Deploy. Static pages prerender automatically and `/api/contact` runs as a serverless route handler.
