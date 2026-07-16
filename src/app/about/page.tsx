/**
 * pages/About.tsx — /about
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — About page.
 *
 * Sections:
 *  1. Hero     — manifesto headline + sub-copy
 *  2. Manifesto — 3-column principle cards with Lime dots
 *  3. Numbers  — quick stat strip (years, projects, LH score target)
 *  4. Process  — reused Process component
 *  5. Stack    — reused TechStack component
 *  6. Closing CTA
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ClosingCTA } from '../../components/shared/ClosingCTA';
import { SignalLine } from '../../components/shared/SignalLine';
import { RevealText } from '../../components/shared/RevealText';
import { Process }    from '../../components/home/Process';
import { TechStack }  from '../../components/home/TechStack';
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  listItem,
  cardHoverLift,
  EASE_SIGNAL,
} from '../../lib/motion-variants';

// ─── Data ─────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    id: 'SIG_P_01',
    title: 'Signal, not noise.',
    body: 'We ask more questions before we open a code editor than most agencies ask in the whole project. Understanding the real problem is half the build.',
  },
  {
    id: 'SIG_P_02',
    title: 'Precision over polish.',
    body: 'A 96 Lighthouse score matters more than a gradient that took 3 hours. We obsess over what actually ships, loads, and converts.',
  },
  {
    id: 'SIG_P_03',
    title: 'One team. Full stack.',
    body: 'No handoffs. The person who designs it builds it. The person who builds the frontend writes the backend schema. No gaps.',
  },
];

const STATS = [
  { value: '90+', label: 'Target Lighthouse score on every build' },
  { value: '2–6 wk', label: 'Average kickoff-to-live timeline' },
  { value: '100%', label: 'Modern stack — nothing legacy' },
  { value: '∞', label: 'Curiosity about what you\'re building' },
];

// ─── Page ─────────────────────────────────────────────────────────

const About: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <main id="about-main">

        {/* ────────────────────────────────────────────────────────
            1. HERO — Manifesto headline
        ──────────────────────────────────────────────────────── */}
        {/* ────────────────────────────────────────────────────────
            1. HERO — Manifesto headline (Redesigned Editorial Style)
        ──────────────────────────────────────────────────────── */}
        <section
          className="relative pt-32 pb-20 px-6 md:px-10 overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-[var(--border-light)]"
          aria-labelledby="about-heading"
        >
          {/* Subtle graph paper background grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.3]"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--border-light) 1px, transparent 1px), linear-gradient(to bottom, var(--border-light) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />

          <div className="relative mx-auto max-w-[1440px] w-full flex flex-col lg:flex-row">
            
            {/* Vertical Studio Label */}
            <div className="hidden lg:flex flex-col items-center justify-start w-12 border-r border-[var(--border-light)] pr-8 mr-8">
              <span 
                className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-muted)] font-bold whitespace-nowrap mt-32"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                S E N O ( S T U D I O )
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              
              {/* Top horizontal divider & labels */}
              <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-5 mb-12 md:mb-20">
                <div className="flex items-center gap-4">
                  <div className="h-px w-10 bg-[var(--color-lime-green)] opacity-60" />
                  <span className="label-micro-primary tracking-[0.25em] text-[var(--color-lime-green)] font-bold">
                    / STUDIO PROFILE
                  </span>
                </div>
                <span className="label-micro text-[9px] text-[var(--color-muted)] tracking-[0.15em] opacity-60">
                  ESTABLISHED_SEPT 2024
                </span>
              </div>

              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-end">
                {/* Left side: Massive Typography */}
                <motion.div
                  variants={staggerContainer(0.1, 0.15)}
                  initial="hidden"
                  animate={anim}
                  className="flex-1 w-full"
                >
                  <motion.div variants={fadeUp}>
                    <RevealText
                      as="h1"
                      text="We build the internet for founders who move at speed."
                      className="font-display italic text-[clamp(4rem,9vw,9.5rem)] leading-[0.95] tracking-tight"
                      style={{ color: 'var(--color-ink)' } as React.CSSProperties}
                      stagger={0.03}
                      id="about-heading"
                    />
                  </motion.div>
                </motion.div>

                {/* Right side: Structured Meta-data & Sub-copy */}
                <motion.div 
                  variants={fadeIn}
                  initial="hidden"
                  animate={anim}
                  className="w-full lg:w-[420px] flex flex-col gap-10 shrink-0 lg:pb-6 relative z-10"
                >
                  <div className="grid grid-cols-2 gap-8 border-b border-[var(--border-light)] pb-8 relative">
                    {/* Subtle structural connecting line mimicking the tree roots */}
                    <div className="absolute top-1/2 -left-[200%] right-0 h-px bg-[var(--border-light)] -z-10 hidden lg:block" />
                    
                    <div className="flex flex-col gap-2 bg-[var(--color-electric-white)]">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Core Focus</span>
                      <span className="font-display italic text-4xl md:text-5xl text-[var(--color-ink)] leading-none mt-1">01</span>
                    </div>
                    <div className="flex flex-col gap-2 bg-[var(--color-electric-white)]">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">HQ</span>
                      <span className="font-body font-bold text-xl text-[var(--color-ink)] uppercase tracking-widest leading-none mt-3">MUZAFFARPUR</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-b border-[var(--border-light)] pb-8">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Architecture</span>
                    <span className="text-[11px] font-bold text-[var(--color-lime-green)] uppercase tracking-[0.15em] mt-1 leading-relaxed">
                      STRATEGY • ENGINEERING • HIGH-FIDELITY UI
                    </span>
                  </div>

                  <p className="text-[14px] md:text-[15px] leading-[1.8] text-[var(--color-muted)]">
                    SENO Studio is a small, focused web design and engineering practice based in Muzaffarpur, India. We work with founders and teams who have a clear idea, a tight timeline, and no patience for agencies that over-promise and under-deliver.
                  </p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            2. PRINCIPLES
        ──────────────────────────────────────────────────────── */}
        <section
          className="py-20 md:py-28 px-6 md:px-10"
          aria-labelledby="principles-heading"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer(0.08, 0.05)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-80px' }}
              className="mb-12 flex flex-col gap-4"
            >
              <motion.div variants={fadeIn}>
                <span className="label-micro-primary">/ How We Think</span>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                id="principles-heading"
                className="font-display italic text-[clamp(2rem,4.5vw,3.8rem)] leading-tight tracking-tight"
                style={{ color: 'var(--color-ink)' }}
              >
                The way current flows.
              </motion.h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1, 0.08)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
            >
              {PRINCIPLES.map((p, i) => (
                <motion.div key={p.id} variants={listItem}>
                  <motion.div
                    className="group relative flex flex-col gap-4 rounded-2xl border p-7 h-full"
                    style={{
                      backgroundColor: 'var(--color-sand)',
                      borderColor: 'var(--border-light)',
                    }}
                    variants={cardHoverLift}
                    initial="rest"
                    whileHover={prefersReduced ? 'rest' : 'hover'}
                    transition={{ duration: 0.2, ease: EASE_SIGNAL }}
                  >
                    {/* ID + pulse dot */}
                    <div className="flex items-center gap-2">
                      <motion.span
                        className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-violet)' }}
                        animate={prefersReduced ? {} : { opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                        aria-hidden="true"
                      />
                      <span className="label-micro" style={{ color: 'var(--color-muted)' }}>
                        {p.id}
                      </span>
                    </div>

                    <h3
                      className="font-display italic text-xl md:text-2xl leading-tight"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {p.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {p.body}
                    </p>

                    {/* Hover top-border */}
                    <span
                      className="absolute inset-x-4 top-0 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ backgroundColor: 'var(--color-violet)' }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            3. STATS STRIP (Redesigned Editorial Style)
        ──────────────────────────────────────────────────────── */}
        <section
          className="border-y border-[var(--border-light)]"
          style={{ backgroundColor: 'var(--color-surface)' }}
          aria-label="Key metrics"
        >
          <div className="mx-auto max-w-[1440px]">
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-[var(--border-light)] border-x border-[var(--border-light)]"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex flex-col gap-4 p-10 lg:p-14 hover:bg-[var(--color-electric-white)] transition-colors duration-500"
                >
                  <span
                    className="font-display italic text-5xl md:text-6xl leading-none tracking-tight"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            4 & 5. Process + TechStack (reused components)
        ──────────────────────────────────────────────────────── */}
        <Process />
        <TechStack />

        {/* ────────────────────────────────────────────────────────
            6. CLOSING CTA
        ──────────────────────────────────────────────────────── */}
        <ClosingCTA />
      </main>
  );
};

export default About;
