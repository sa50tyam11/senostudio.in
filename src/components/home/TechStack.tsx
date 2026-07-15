'use client';
/**
 * components/home/TechStack.tsx
 * ─────────────────────────────────────────────────────────────────
 * "/ What Powers Us → Our Circuit Board."
 *
 * Layout: category headers with pill rows beneath.
 * Pills start grayscale / muted → full-color + Lime glow on hover
 * ("power on" effect from Section 3 of the brief).
 *
 * Data source: techStack[] from lib/content.ts
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealText } from '../shared/RevealText';
import { SignalLine } from '../shared/SignalLine';
import { techStack, techSectionMeta } from '../../lib/content';
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  listItem,
  EASE_SIGNAL,
} from '../../lib/motion-variants';

// ─── Category icons (emoji fallback — swap for SVGs later) ────────

const CATEGORY_ICONS: Record<string, string> = {
  'Frontend': '⚡',
  'Backend & Data': '🗄',
  'Infrastructure': '☁',
};

// ─── Tech pill ────────────────────────────────────────────────────

const TechPill: React.FC<{ name: string; prefersReduced: boolean | null }> = ({
  name,
  prefersReduced,
}) => (
  <motion.span
    className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium cursor-default select-none"
    style={{
      fontFamily: 'var(--font-body)',
      borderColor: 'var(--border-light)',
      color: 'var(--color-ink)',
      backgroundColor: 'var(--color-sand)',
      // Start muted (power-off state)
      filter: prefersReduced ? 'none' : 'grayscale(80%) opacity(0.55)',
    }}
    whileHover={
      prefersReduced
        ? {}
        : {
            filter: 'grayscale(0%) opacity(1)',
            boxShadow: '0 4px 20px -4px rgba(139,108,255,0.4)',
            borderColor: 'rgba(139,108,255,0.5)',
            y: -3,
          }
    }
    transition={{ duration: 0.2, ease: EASE_SIGNAL }}
    tabIndex={0}
    role="listitem"
    aria-label={name}
  >
    {name}
  </motion.span>
);

// ─── Section ──────────────────────────────────────────────────────

export const TechStack: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="tech-stack"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="tech-heading"
    >
      {/* Faint circuit grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Lime glow — bottom right */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 rounded-full blur-[120px] opacity-30"
        style={{
          width: '400px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(235,213,184,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14 flex flex-col gap-4"
        >
          <motion.div variants={fadeIn}>
            <span className="label-micro-primary">{techSectionMeta.eyebrow}</span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <RevealText
              as="h2"
              text={techSectionMeta.headline}
              className="font-display italic text-[clamp(2rem,4.5vw,3.8rem)] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' } as React.CSSProperties}
              stagger={0.06}
              id="tech-heading"
            />
            <p
              className="text-sm md:max-w-[30ch] md:text-right"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
            >
              Hover any chip to switch it on.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Categories ── */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-12"
        >
          {techStack.map((category) => (
            <motion.div key={category.category} variants={listItem}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-base"
                  role="presentation"
                  aria-hidden="true"
                >
                  {CATEGORY_ICONS[category.category] ?? '◆'}
                </span>
                <span
                  className="label-micro"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {category.category}
                </span>
                {/* Connecting line */}
                <span
                  className="flex-1 h-px"
                  style={{ backgroundColor: 'var(--border-light)' }}
                  aria-hidden="true"
                />
              </div>

              {/* Pills */}
              <motion.div
                variants={staggerContainer(0.05, 0.02)}
                initial="hidden"
                whileInView={anim}
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
                role="list"
                aria-label={`${category.category} technologies`}
              >
                {category.items.map((item) => (
                  <motion.div key={item} variants={fadeUp}>
                    <TechPill name={item} prefersReduced={prefersReduced} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div className="mt-20 pointer-events-none" aria-hidden="true">
          <SignalLine
            height={48}
            amplitude={14}
            strokeWidth={0.9}
            opacity={0.1}
            showDot={false}
            animate={false}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
