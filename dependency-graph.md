# Dependency Graph

This document highlights the critical dependencies and file structures within the SENO Studio application.

## Core System Files
- `package.json`: Defines the project dependencies (Next.js, React, Tailwind CSS, Framer Motion, GSAP, Lenis, Resend).
- `src/app/layout.tsx`: The root layout wrapping the entire application. Initializes `SmoothScroll`, `Preloader`, `Navbar`, and `HoverFooter`.
- `src/lib/content.ts`: The central data store for all site copy, services, pricing, and case studies. This file should be treated with care as many components depend on it.

## Frontend Dependencies
- **Styling**: `tailwindcss` via PostCSS (`postcss.config.mjs`, `tailwind.config.js`).
- **Animation/Motion**: 
  - `framer-motion` (used extensively for React component animations).
  - `gsap` / `@gsap/react` (used for scroll-linked and complex sequencing).
- **Scrolling**: `@studio-freight/lenis` / `lenis` for smooth scrolling effects.
- **UI Components**: `@radix-ui/react-slot`, `lucide-react` (icons), `clsx`, `tailwind-merge` (class management).

## Backend Dependencies
- **Email Service**: `resend` is used in `/api/contact` to dispatch emails.

## High Impact Components
- `src/components/shared/SmoothScroll.tsx`: Wraps the app layout, affecting all scroll behavior.
- `src/components/Navbar.tsx` & `src/components/HoverFooter.tsx`: Present on every page.
- Components in `src/components/home/` and `src/components/sections/`: Compose the core content blocks of the site (Hero, Portfolio, Services, etc.).

## Dependency Flow
1. **Pages** (`src/app/**/page.tsx`) import **Components** (`src/components/**`).
2. **Components** import **Content** (`src/lib/content.ts`) and **Motion Variants** (`src/lib/motion-variants.ts`).
3. **Components** use external libraries (Framer Motion, Lucide, Tailwind classes) for rendering.
