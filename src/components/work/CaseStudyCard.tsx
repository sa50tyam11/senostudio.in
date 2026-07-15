'use client';
/**
 * components/work/CaseStudyCard.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — case study / portfolio card.
 *
 * Each card mirrors the "HUD ID-tag" micro-label style from the brief:
 *  • Project ID tag top-left (e.g. PRJ_01)
 *  • Category micro-label
 *  • Project name — Instrument Serif italic
 *  • Short description
 *  • Tag pills (tech stack used)
 *  • "View Project →" link (opens href or triggers onClick)
 *  • Hover: cardHoverLift — y:-6, Indigo glow
 *  • Image slot: fill-image with Indigo gradient fallback
 *
 * ─── CaseStudy type (also exported for the Work page) ───────────
 *
 *  id          string   — e.g. "PRJ_01"
 *  title       string
 *  category    string   — e.g. "Full-Stack Build"
 *  description string
 *  tags        string[] — e.g. ["Next.js","Supabase","Framer Motion"]
 *  href?       string   — external or internal URL
 *  imageSrc?   string   — optional hero image URL
 *  year?       string   — e.g. "2024"
 *  featured?   boolean  — renders larger on the grid
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SignalLine } from '../shared/SignalLine';
import { cardHoverLift, EASE_SIGNAL } from '../../lib/motion-variants';

// ─── Type ─────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  imageSrc?: string;
  year?: string;
  featured?: boolean;
}

// ─── Image / placeholder ──────────────────────────────────────────

const CardImage: React.FC<{ src?: string; title: string }> = ({ src, title }) => (
  <div
    className="relative w-full overflow-hidden rounded-xl"
    style={{ aspectRatio: '16/9' }}
    aria-hidden="true"
  >
    {src ? (
      <img
        src={src}
        alt={`${title} project preview`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
    ) : (
      /* Gradient placeholder — Indigo to deep Indigo */
      <div
        className="w-full h-full flex items-end p-5"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,108,255,0.12) 0%, rgba(139,108,255,0.04) 100%)',
          border: '1px solid rgba(139,108,255,0.12)',
          borderRadius: '0.75rem',
        }}
      >
        <SignalLine
          height={32}
          amplitude={10}
          strokeWidth={1}
          opacity={0.4}
          speed={3}
          showDot
          animate
          drawOnMount={false}
        />
      </div>
    )}
    {/* Subtle dark overlay for image legibility */}
    {src && (
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: 'rgba(13,11,23,0.4)' }}
      />
    )}
  </div>
);

// ─── Component ────────────────────────────────────────────────────

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Index in the grid — used to offset stagger animation delay */
  index?: number;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, index = 0 }) => {
  const prefersReduced = useReducedMotion();

  const Tag = study.href ? 'a' : 'div';
  const linkProps = study.href
    ? {
        href: study.href,
        target: study.href.startsWith('http') ? '_blank' : undefined,
        rel: study.href.startsWith('http') ? 'noopener noreferrer' : undefined,
        'aria-label': `${study.title} — view project`,
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <motion.div
        variants={cardHoverLift}
        initial="rest"
        whileHover={prefersReduced ? 'rest' : 'hover'}
        transition={{ duration: 0.2, ease: EASE_SIGNAL }}
        className="group h-full"
      >
        <Tag
          {...linkProps}
          className="flex flex-col gap-5 rounded-2xl border p-5 h-full cursor-pointer no-underline"
          style={{
            backgroundColor: 'var(--color-midnight)',
            borderColor: 'var(--border-dark)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {/* ── Image slot ── */}
          <CardImage src={study.imageSrc} title={study.title} />

          {/* ── Meta row ── */}
          <div className="flex items-center justify-between">
            <span
              className="label-micro-primary"
              style={{ letterSpacing: '0.1em' }}
              aria-label={`Project ID: ${study.id}`}
            >
              {study.id}
            </span>
            <div className="flex items-center gap-2">
              {study.year && (
                <span
                  className="label-micro"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {study.year}
                </span>
              )}
              <span
                className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--color-violet)', opacity: 0.7 }}
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </div>

          {/* ── Category micro-label ── */}
          <div>
            <span
              className="label-micro"
              style={{ color: 'var(--color-muted)' }}
            >
              {study.category}
            </span>
          </div>

          {/* ── Title ── */}
          <h3
            className="font-display italic text-2xl leading-tight tracking-tight -mt-1"
            style={{ color: 'var(--color-ivory)' }}
          >
            {study.title}
          </h3>

          {/* ── Description ── */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: 'var(--color-muted)' }}
          >
            {study.description}
          </p>

          {/* ── Tag pills ── */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  backgroundColor: 'rgba(139,108,255,0.07)',
                  color: 'var(--color-violet)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ── CTA row ── */}
          <div
            className="flex items-center gap-1.5 text-sm font-medium mt-auto pt-1"
            style={{ color: 'var(--color-violet)' }}
            aria-hidden={!study.href}
          >
            <span>View Project</span>
            <motion.span
              animate={prefersReduced ? {} : { x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </div>
        </Tag>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudyCard;
