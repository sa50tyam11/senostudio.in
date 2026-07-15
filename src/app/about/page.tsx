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
        <section
          className="relative pt-32 pb-0 px-6 md:px-10 overflow-hidden"
          aria-labelledby="about-heading"
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute left-0 top-0 rounded-full blur-[160px] opacity-50"
            style={{
              width: '500px', height: '500px',
              background: 'radial-gradient(circle, rgba(139,108,255,0.07) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 rounded-full blur-[120px] opacity-40"
            style={{
              width: '400px', height: '300px',
              background: 'radial-gradient(circle, rgba(235,213,184,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden"
              animate={anim}
              className="flex flex-col gap-7"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <span className="label-micro-primary tracking-[0.14em]">/ About SENO</span>
              </motion.div>

              {/* Large manifesto headline */}
              <motion.div variants={fadeUp}>
                <RevealText
                  as="h1"
                  text="We build the internet for founders who move at speed."
                  className="font-display italic text-[clamp(2.4rem,6vw,5.5rem)] leading-[1.07] tracking-tight max-w-[18ch]"
                  style={{ color: 'var(--color-ink)' } as React.CSSProperties}
                  stagger={0.038}
                  id="about-heading"
                />
              </motion.div>

              {/* Sub-copy */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg leading-relaxed max-w-[52ch]"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
              >
                SENO Studio is a small, focused web design and engineering practice based in
                Muzaffarpur, India. We work with founders and teams who have a clear idea,
                a tight timeline, and no patience for agencies that over-promise and
                under-deliver.
              </motion.p>
            </motion.div>

            {/* Hero signal line */}
            <div className="mt-16 pointer-events-none" aria-hidden="true">
              <SignalLine
                height={60}
                amplitude={20}
                strokeWidth={1.2}
                opacity={0.14}
                speed={4}
                showDot
                animate={!prefersReduced}
                drawOnMount
              />
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
            3. STATS STRIP
        ──────────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 md:px-10 border-y"
          style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--color-ivory)' }}
          aria-label="Key metrics"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex flex-col gap-1"
                >
                  <span
                    className="font-display italic text-4xl md:text-5xl leading-none tracking-tight"
                    style={{ color: i % 2 === 0 ? 'var(--color-violet)' : 'var(--color-ink)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm leading-snug"
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
