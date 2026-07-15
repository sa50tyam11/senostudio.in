/**
 * lib/content.ts
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — "Project Current" — single source of truth for all
 * site copy and data. Components import from here; touching this file
 * is the only change needed for copy/pricing/stack updates.
 * ─────────────────────────────────────────────────────────────────
 */

// ─── Type definitions ─────────────────────────────────────────────

export interface ServiceCard {
  id: string;           // e.g. "SIG_UI_01"
  name: string;
  description: string;
  contactParam: string; // appended to /contact?service=
}

export interface ProcessStep {
  number: string;       // e.g. "01"
  codename: string;     // e.g. "Signal"
  label: string;        // e.g. "Discovery"
  description: string;
}

export interface WhyCard {
  id: string;
  headline: string;
  description: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;           // e.g. "SIG_SPARK_01"
  name: string;         // e.g. "Spark"
  tagline: string;      // e.g. "Core Foundation"
  timeline: string;     // e.g. "1–2 weeks"
  cta: string;          // button label
  features: PricingFeature[];
  popular?: boolean;
}

export interface TechCategory {
  category: string;
  items: string[];
}

// ─── Preloader / Hero ─────────────────────────────────────────────

export const PRELOADER_TEXT = "Establishing signal...";

export const hero = {
  eyebrow: "/ SENO STUDIO",
  headline: "Let's put a charge through your next idea.",
  subtext:
    "SENO Studio designs and engineers fast, precise web experiences for founders and teams who don't want to wait for their website to catch up to their ambition.",
  contact: "hello@senostudio.in",
};

// ─── Services ─────────────────────────────────────────────────────

export const servicesSectionMeta = {
  eyebrow: "/ Signal Lines",
  headline: "What We Transmit.",
  subtext:
    "Every engagement runs on the same current — clarity in, precision out.",
};

export const services: ServiceCard[] = [
  {
    id: "SIG_UI_01",
    name: "Interface Engineering",
    description:
      "Pixel-precise Next.js interfaces built for fluid motion and layout fidelity, not just responsive breakpoints.",
    contactParam: "SIG_UI_01",
  },
  {
    id: "SIG_FS_02",
    name: "Full-Stack Builds",
    description:
      "End-to-end apps pairing React frontends with Supabase-backed, production-grade backends.",
    contactParam: "SIG_FS_02",
  },
  {
    id: "SIG_IX_03",
    name: "Motion & Micro-Interaction",
    description:
      "Framer Motion-driven interactions engineered to make every click feel intentional.",
    contactParam: "SIG_IX_03",
  },
  {
    id: "SIG_MVP_04",
    name: "MVP Sprints",
    description:
      "Fast, focused builds that take a founder's idea from sketch to shippable product.",
    contactParam: "SIG_MVP_04",
  },
  {
    id: "SIG_API_05",
    name: "Backend & Auth Systems",
    description:
      "Clerk-secured, Supabase-powered systems built for real users from day one, not prototypes.",
    contactParam: "SIG_API_05",
  },
  {
    id: "SIG_OPT_06",
    name: "Performance Tuning",
    description:
      "Core Web Vitals audits, load-time surgery, and technical SEO that compounds traffic over time.",
    contactParam: "SIG_OPT_06",
  },
];

// ─── Process ──────────────────────────────────────────────────────

export const processSectionMeta = {
  eyebrow: "/ How Current Flows",
  headline: "From Signal to Output.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    codename: "Signal",
    label: "Discovery",
    description:
      "We pick up the real signal — your goals, users, and constraints — before writing a line of code.",
  },
  {
    number: "02",
    codename: "Circuit",
    label: "Architecture & Strategy",
    description:
      "We wire the core logic: tech stack, data flow, and the paths users will actually travel.",
  },
  {
    number: "03",
    codename: "Charge",
    label: "Development",
    description:
      "Full power to the build — interface, backend, and motion, all live at once.",
  },
  {
    number: "04",
    codename: "Output",
    label: "Launch & Iteration",
    description:
      "We switch it on, measure what happens, and keep tuning the signal.",
  },
];

// ─── Why SENO ─────────────────────────────────────────────────────

export const whySectionMeta = {
  eyebrow: "/ Why Founders Choose Current",
  headline: "Built for Founders Who Move Fast.",
};

export const whyCards: WhyCard[] = [
  {
    id: "SIG_ID_01",
    headline: "Shipped Fast",
    description:
      "Most builds go from kickoff to live in 2–6 weeks, not months.",
  },
  {
    id: "SIG_ID_02",
    headline: "Performance First",
    description:
      "Targeting 90+ Lighthouse scores and sub-second load times on every build.",
  },
  {
    id: "SIG_ID_03",
    headline: "Full-Stack Capable",
    description:
      "One team, from Figma to production database — no handoff gaps.",
  },
  {
    id: "SIG_ID_04",
    headline: "Modern, No Debt",
    description:
      "Every build on current-gen stack — nothing legacy to inherit.",
  },
];

// ─── Pricing ──────────────────────────────────────────────────────

export const pricingSectionMeta = {
  eyebrow: "/ Power Tiers",
  headline: "Pick Your Voltage.",
  subtext:
    "Every tier includes a free discovery call. No pressure, just current.",
};

export const pricingTiers: PricingTier[] = [
  {
    id: "SIG_SPARK_01",
    name: "Spark",
    tagline: "Core Foundation",
    timeline: "1–2 weeks",
    cta: "Discuss Your Build",
    features: [
      { text: "Up to 5 responsive pages", included: true },
      { text: "Custom design system", included: true },
      { text: "Performance-optimised build", included: true },
      { text: "Contact / lead-capture form", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Custom backend / auth", included: false },
      { text: "API integrations", included: false },
      { text: "CMS integration", included: false },
    ],
  },
  {
    id: "SIG_CURRENT_02",
    name: "Current",
    tagline: "Full Engine",
    timeline: "3–5 weeks",
    cta: "Start a Project",
    popular: true,
    features: [
      { text: "Up to 15 pages + blog/CMS", included: true },
      { text: "Full motion & micro-interaction system", included: true },
      { text: "Supabase backend + auth (Clerk)", included: true },
      { text: "API integrations (Stripe, Resend, etc.)", included: true },
      { text: "Core Web Vitals audit & tuning", included: true },
      { text: "Advanced SEO + structured data", included: true },
      { text: "Dedicated Slack channel", included: true },
      { text: "30-day post-launch support", included: true },
    ],
  },
  {
    id: "SIG_GRID_03",
    name: "Grid",
    tagline: "Full-Scale System",
    timeline: "6–10 weeks",
    cta: "Book a Discovery Call",
    features: [
      { text: "Unlimited pages + full product build", included: true },
      { text: "Custom design system + component library", included: true },
      { text: "Complex backend architecture", included: true },
      { text: "Multi-role auth & permissions", included: true },
      { text: "Real-time features (WebSockets / Supabase Realtime)", included: true },
      { text: "Full test coverage (unit + E2E)", included: true },
      { text: "CI/CD pipeline + GitHub Actions", included: true },
      { text: "90-day post-launch support + retainer option", included: true },
    ],
  },
];

// ─── Tech Stack ───────────────────────────────────────────────────

export const techSectionMeta = {
  eyebrow: "/ What Powers Us",
  headline: "Our Circuit Board.",
};

export const techStack: TechCategory[] = [
  {
    category: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js 14",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
    ],
  },
  {
    category: "Backend & Data",
    items: ["Supabase", "PostgreSQL", "Clerk", "Resend", "Node.js"],
  },
  {
    category: "Infrastructure",
    items: ["Vercel", "Vercel Edge", "GitHub Actions"],
  },
];

// ─── Closing CTA (shared across all pages) ────────────────────────

export const closingCta = {
  eyebrow: "/ Switch It On",
  headline: "Ready to put a charge through your next build?",
  cta: "Start The Conversation",
  ctaHref: "/contact",
  contact: "hello@senostudio.in",
};

// ─── Marquee ticker (Work page) ───────────────────────────────────

export const MARQUEE_TEXT =
  "SENO STUDIO · MUZAFFARPUR ✦ FULL-STACK WEB DESIGN ✦ BRAND SYSTEMS ✦ MVP ENGINEERING ✦ HIGH-SIGNAL BUILDS ✦";

// ─── Nav links ────────────────────────────────────────────────────

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─── Case Studies (Projects) ──────────────────────────────────────

export const CASE_STUDIES = [
  {
    id: 'PRJ_01',
    title: 'Founder OS Dashboard',
    category: 'Full-Stack Build',
    description:
      'A real-time operational dashboard for a SaaS founder — Supabase backend, Clerk auth, live KPI tiles, and a mobile-first layout built in two weeks.',
    tags: ['Next.js', 'Supabase', 'Clerk', 'Framer Motion'],
    year: '2024',
    featured: true,
  },
  {
    id: 'PRJ_02',
    title: 'Signal Agency Site',
    category: 'Interface Engineering',
    description:
      'A motion-rich marketing site for a creative agency. Custom scroll-linked animations, magnetic cursor, and sub-1s LCP on cold load.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    year: '2024',
    featured: true,
  },
  {
    id: 'PRJ_03',
    title: 'Volt Commerce MVP',
    category: 'MVP Sprint',
    description:
      'End-to-end MVP for a DTC brand: custom storefront, Stripe checkout, order management backend, and analytics dashboard — shipped in 18 days.',
    tags: ['Next.js', 'Stripe', 'Supabase', 'PostgreSQL'],
    year: '2024',
    featured: true,
  },
  {
    id: 'PRJ_04',
    title: 'Halo Wear',
    category: 'Backend & Auth',
    description:
      'Multi-role Clerk auth system with Supabase RLS policies, edge functions, and a developer-facing REST API — built for a B2B SaaS product.',
    tags: ['Clerk', 'Supabase', 'Node.js', 'TypeScript'],
    year: '2023',
    featured: true,
  },
  {
    id: 'PRJ_05',
    title: 'Core Web Vitals Rescue',
    category: 'Performance Tuning',
    description:
      'Took a legacy Next.js site from 42 → 96 Lighthouse score. Identified render-blocking resources, optimised CLS, deferred heavy bundles, added ISR caching.',
    tags: ['Next.js', 'Lighthouse', 'WebPageTest'],
    year: '2023',
  },
  {
    id: 'PRJ_06',
    title: 'Motion Micro-system',
    category: 'Motion & Micro-Interaction',
    description:
      'Designed and implemented a reusable Framer Motion variant library + component set for a product team — 24 animations, fully typed, documented.',
    tags: ['Framer Motion', 'TypeScript', 'Storybook'],
    year: '2024',
  },
];
