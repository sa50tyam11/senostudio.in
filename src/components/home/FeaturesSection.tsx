'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Layout,
  Monitor,
  Palette,
  PenTool,
  Layers,
  Type,
  Aperture,
  Globe,
  Camera,
  Brush,
  Box,
  Wand2,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Projects data ─────────────────────────────────────────────────
const PROJECTS = [
  { year: '2024', title: 'Founder OS Dashboard', type: 'Full-Stack', href: '/work' },
  { year: '2024', title: 'Signal Agency Site', type: 'Interface Design', href: '/work' },
  { year: '2024', title: 'Volt Commerce MVP', type: 'MVP Sprint', href: '/work' },
  { year: '2023', title: 'Halo Wear', type: 'Backend & Auth', href: '/work' },
];

// ─── Tech icons ────────────────────────────────────────────────────
const ROW1_ICONS = [Layout, Monitor, Palette, PenTool, Layers, Type, Aperture, Globe];
const ROW2_ICONS = [Camera, Brush, Box, Wand2, Layout, Monitor, Type, Layers];

// ─── Eyebrow label ────────────────────────────────────────────────
const Eyebrow: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-1.5 mb-auto">
    <Sparkles className="h-3 w-3 text-white/40 shrink-0" strokeWidth={1.5} />
    <span className="uppercase tracking-[0.2em] text-[10px] text-white/50 font-medium">
      {text}
    </span>
  </div>
);

// ─── Project row ─────────────────────────────────────────────────
const ProjectRow: React.FC<{
  year: string; title: string; type: string; href: string; index: number;
}> = ({ year, title, type, href, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group/row relative flex items-center gap-3 border-t border-white/8 py-3 transition-colors hover:bg-white/[0.03] -mx-5 px-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index */}
      <span className="text-[11px] text-white/25 tabular-nums w-5 shrink-0">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Year */}
      <span className="text-[12px] text-white/40 tabular-nums w-9 shrink-0">{year}</span>

      {/* Title */}
      <span className="flex-1 text-[13px] sm:text-sm text-white/85 group-hover/row:text-white transition-colors truncate">
        {title}
      </span>

      {/* Type badge */}
      <span
        className="hidden sm:inline-block text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border border-white/10 text-white/40 shrink-0 transition-colors group-hover/row:border-[#6C63FF]/50 group-hover/row:text-[#6C63FF]/80"
      >
        {type}
      </span>

      {/* Arrow */}
      <motion.div
        animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0"
      >
        <ArrowUpRight className="h-3.5 w-3.5 text-[#6C63FF]" strokeWidth={1.5} />
      </motion.div>
    </Link>
  );
};

// ─── Main section ─────────────────────────────────────────────────
export const FeaturesSection: React.FC = () => {
  return (
    <section
      className="relative bg-[#0a0a0a] text-white font-body overflow-hidden"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(108,99,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(108,99,255,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-24 lg:py-28 max-w-[1440px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6 bg-[#6C63FF]/60" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#6C63FF]/80 font-medium">
                Featured Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] font-normal tracking-tight text-white">
              High-Signal<br />
              <span className="text-white/35">Builds.</span>
            </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-[1.7] text-white/50 max-w-lg">
              Precise web experiences for founders and teams who can&apos;t afford to wait. We pick up the real signal before writing a single line of code.
            </p>
          </div>

          <Link
            href="/contact"
            className="liquid-glass rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

          {/* ── Col 1: Featured Projects ── */}
          <div className="relative rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden flex flex-col p-5 md:p-6 min-h-[420px] lg:min-h-[520px]">
            {/* Hero image / video */}
            <div className="absolute inset-0">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
                autoPlay loop muted playsInline
                className="h-full w-full object-cover opacity-30"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              <Eyebrow text="Featured Projects" />

              {/* Project count badge */}
              <div className="mt-6 mb-auto">
                <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
                  <span className="text-[11px] text-white/60 tracking-wide">
                    {PROJECTS.length} Projects Delivered
                  </span>
                </div>
              </div>

              {/* Project list */}
              <div className="mt-auto">
                {PROJECTS.map((p, i) => (
                  <ProjectRow key={p.title} {...p} index={i} />
                ))}
                <div className="border-t border-white/8 pt-4 mt-1">
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1.5 text-[12px] text-[#6C63FF]/70 hover:text-[#6C63FF] transition-colors"
                  >
                    View all projects
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 2: Testimonial + Metric ── */}
          <div className="grid grid-rows-[1fr_auto] gap-4 md:gap-5">

            {/* Client voice */}
            <div className="relative rounded-2xl bg-[#0f1a1a] border border-white/[0.06] overflow-hidden p-5 md:p-6 flex flex-col">
              {/* Subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <Eyebrow text="Client Voice" />

                {/* Stars */}
                <div className="flex gap-0.5 mt-5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#6C63FF">
                      <path d="M6 1l1.3 2.6 2.9.4-2.1 2 .5 2.9L6 7.6 3.4 8.9l.5-2.9-2.1-2 2.9-.4z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[13.5px] leading-[1.7] text-white/75 flex-1">
                  &ldquo;SENO Studio reshaped our product with a degree of finesse and vision that surpassed what we&apos;d hoped for. The build felt incredibly fast, and the outcomes speak for themselves.&rdquo;
                </p>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#6C63FF]/40 to-[#6C63FF]/10 flex items-center justify-center text-[11px] font-semibold text-[#6C63FF] shrink-0">
                    SJ
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white">Sarah Jenkins</p>
                    <p className="text-[11px] text-white/40">Technical Founder — Volt Commerce</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance metric */}
            <div className="relative rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden flex flex-col items-center justify-center p-6 min-h-[200px]">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
                autoPlay loop muted playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
              <div className="relative z-10 text-center">
                <div className="text-[72px] sm:text-[80px] md:text-[88px] font-light tracking-tight text-white leading-none">
                  90<span className="text-[#6C63FF]">+</span>
                </div>
                <p className="mt-2 text-[13px] text-white/60 tracking-wide">Lighthouse Performance</p>
              </div>
            </div>
          </div>

          {/* ── Col 3: Tech stack + Contact ── */}
          <div className="grid grid-rows-[1fr_auto] gap-4 md:gap-5">

            {/* Tech stack */}
            <div className="relative rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden flex flex-col p-5 md:p-6 min-h-[240px]">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
                autoPlay loop muted playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/80 to-[#111111]/40 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <Eyebrow text="Tech Stack" />

                <div
                  className="mt-5 flex flex-col gap-3"
                  style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
                >
                  {/* Row 1 */}
                  <div className="flex overflow-hidden">
                    <div className="flex gap-3 animate-marquee-left whitespace-nowrap">
                      {[...ROW1_ICONS, ...ROW1_ICONS].map((Icon, i) => (
                        <div
                          key={i}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0 hover:bg-[#6C63FF]/10 hover:border-[#6C63FF]/30 transition-colors"
                        >
                          <Icon className="h-5 w-5 stroke-[1.5] text-white/60" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex overflow-hidden">
                    <div className="flex gap-3 animate-marquee-right whitespace-nowrap">
                      {[...ROW2_ICONS, ...ROW2_ICONS].map((Icon, i) => (
                        <div
                          key={i}
                          className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0 hover:bg-[#6C63FF]/10 hover:border-[#6C63FF]/30 transition-colors"
                        >
                          <Icon className="h-5 w-5 stroke-[1.5] text-white/60" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stack labels */}
                <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                  {['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Supabase', 'Clerk'].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40 tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact card */}
            <div className="relative rounded-2xl bg-[#0f1a1a] border border-white/[0.06] overflow-hidden p-5 md:p-6 flex flex-col justify-between min-h-[160px] group cursor-pointer">
              <Link href="/contact" className="absolute inset-0 z-20" aria-label="Contact SENO Studio" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/6 to-transparent pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-white/30" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Contact Us</span>
                </div>
                <div className="h-8 w-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-[#6C63FF]/20 group-hover:border-[#6C63FF]/30 transition-all duration-300">
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/60 group-hover:text-[#6C63FF] transition-colors" strokeWidth={1.5} />
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-base md:text-lg font-medium text-white group-hover:text-[#6C63FF] transition-colors">
                  hello@senostudio.in
                </p>
                <p className="mt-1 text-[12px] text-white/40">
                  Ready to put a charge through your next build?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
