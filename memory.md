# SENO Studio Project Memory

This document serves as the permanent brain of the SENO Studio project, detailing its purpose, architecture, and complete operational model.

## Project Overview
SENO Studio is a creative web development agency website designed to showcase the agency's portfolio, outline its services, and capture leads from prospective clients. It is built as a high-performance, animation-rich, static/server-rendered web application.

## Business Purpose
**What business problem is solved?** It acts as the digital storefront for SENO Studio (founded by Satyam Kumar Jha). It establishes credibility through case studies, clearly outlines pricing and services, and provides a direct communication channel (contact form).
**Who uses this?** Prospective clients (founders, startups, businesses) looking for web development, MVP sprints, and UI/UX engineering services.
**Major features:** Interactive animated Hero, Portfolio Showcase, Service & Pricing tiers, Contact lead-generation form.
**Primary workflow:** User lands on home -> Explores services/work -> Reviews pricing -> Navigates to Contact page -> Submits inquiry -> Agency receives email.

## Tech Stack
- **Frontend Framework**: Next.js 14 (App Router), React 18.
- **Styling**: Tailwind CSS, CSS Modules (PostCSS setup).
- **Animation**: Framer Motion, GSAP.
- **Smooth Scrolling**: Lenis.
- **Backend Framework**: Next.js API Routes (Edge/Serverless).
- **Database**: None (Statically defined in code).
- **Authentication**: None.
- **Infrastructure**: Vercel.

## Repository Structure
```
senostudioin/
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/         # Reusable React components (UI, sections, shared)
│   ├── lib/                # Core logic, static content (content.ts), utilities
│   ├── assets/             # Static assets
│   └── styles/             # Global CSS and Tailwind directives
├── public/                 # Public assets served at root
├── package.json            # Project dependencies and scripts
└── next.config.mjs         # Next.js configuration
```

## System Architecture
The application is a monolith deployed on Vercel. It primarily serves static and server-rendered React components. The only backend functionality is a single serverless route (`/api/contact`) that proxies form submissions to the Resend Email API.

## Routing Map
- `/` — Home (Hero, Featured Work, Services Preview)
- `/about` — Agency philosophy, process, founder details
- `/work` — Full portfolio and case studies
- `/services` — Detailed service breakdowns and pricing tiers
- `/contact` — Contact form
- `/api/contact` — API route for processing contact forms

## Frontend Architecture
The frontend is heavily componentized:
- **`src/app/layout.tsx`**: Root layout initializing Lenis smooth scrolling, Preloader, global Navbar, and Footer.
- **`src/components/shared/`**: Generic components (Navbar, Preloader, SmoothScroll).
- **`src/components/sections/`**: Reusable page sections (Hero, PortfolioSection, ServicesSection, CtaSection).
- **`src/lib/content.ts`**: The single source of truth for all text, pricing, and case studies, imported by components to render data dynamically.

## Backend Architecture
The backend is minimal, consisting of Next.js Route Handlers:
- **Controller/Route**: `src/app/api/contact/route.ts` handles the POST request.
- **Business Logic**: Validates payload (name, email, message), initializes Resend client, sends internal notification email, and sends customer confirmation email.

## Database Architecture
**None**. The project currently operates without a database.
All data (Case Studies, Services, Pricing, Tech Stack) is statically declared in `src/lib/content.ts`.

## Authentication Flow
**None**. The site is entirely public. There is no user login, session management, or role-based access control.

## API Inventory
- `POST /api/contact`
  - Input: JSON `{ name, email, company, service, message, budget, tier }`
  - Output: JSON `{ ok: true }` or `{ ok: false, error: ... }`
  - Integration: Resend.

## Data Flow Diagrams
**Contact Form Flow:**
User fills form -> Clicks Submit -> Frontend POSTs JSON to `/api/contact` -> Server validates data -> Server calls Resend API -> Resend sends email to `senowebstudio@gmail.com` and confirmation to User -> Server responds 200 OK -> Frontend shows success state.

## Environment Variables
- `RESEND_API_KEY`: Secret key required to authenticate with the Resend email service. Used only on the server side in the `/api/contact` route.

## Third Party Integrations
- **Resend**: Transactional email API used for routing contact form submissions to the agency owner's inbox.

## Feature Inventory
- **Interactive Hero**: Complex animations using GSAP/Framer Motion on the landing page.
- **Smooth Scrolling**: Lenis implemented globally for fluid UX.
- **Dynamic Content Rendering**: Components read from `content.ts` to map over services and projects.
- **Lead Generation Form**: Connected to Resend for immediate email delivery.
- **WhatsApp Widget**: Floating action button for direct client messaging (assumed from `WhatsAppWidget.tsx`).

## Dependency Graph
- **Critical Files**: `src/lib/content.ts` (Data), `src/app/layout.tsx` (App Shell).
- **External Libs**: `framer-motion`, `gsap`, `lenis`, `tailwindcss`, `resend`.
- Modifying `content.ts` impacts almost all frontend pages.

## Important Files
- `src/lib/content.ts`: Update this file to change site copy, add projects, or modify pricing.
- `src/app/api/contact/route.ts`: Core backend logic for contact form.
- `src/app/layout.tsx`: Global layout and providers.

## Performance Notes
- The site heavily utilizes CSS animations and JavaScript libraries (Framer Motion, GSAP, Lenis).
- **Risk**: Overuse of JS animations could impact time-to-interactive (TTI) and overall Core Web Vitals on lower-end mobile devices.
- **Optimization**: The use of Next.js server components helps minimize the JS bundle sent to the client, but client components (marked with `"use client"`) are required for animations.

## Technical Debt
- **Hardcoded Data**: As the portfolio grows, maintaining `content.ts` will become cumbersome.
- **Missing Tests**: No unit or end-to-end testing frameworks (Jest, Cypress, Playwright) are currently configured.

## Development Workflow
- **Run Locally**: `npm run dev` or `next dev`.
- **Build**: `npm run build` or `next build`.
- **Lint**: `npm run lint`.

## Deployment Process
- Deployed via **Vercel**. Pushing to the main branch automatically triggers a build and deployment.
- Requires configuring the `RESEND_API_KEY` in Vercel's Environment Variables dashboard.

## Known Risks
- **Email Delivery Failure**: If the Resend API key is invalid or quota is exceeded, lead generation forms will silently fail or return a 500 error, potentially losing client inquiries.
- **Performance Overhead**: Heavy reliance on WebGL/Three.js (listed in `package.json`) and GSAP could cause performance issues on older devices.

## Future Recommendations
- **Headless CMS Integration**: Migrate `content.ts` to Sanity, Supabase, or Contentful to allow non-developer updates to the portfolio.
- **Analytics & Tracking**: Implement PostHog or Google Analytics to track user flow and form drop-off rates.
- **Testing**: Implement Playwright for E2E testing of the contact form.
