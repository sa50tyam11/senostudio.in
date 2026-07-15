'use client';
/**
 * components/home/Testimonials.tsx
 * ─────────────────────────────────────────────────────────────────
 * Social proof / testimonials section.
 * Placeholder-ready: accepts a `testimonials` prop (empty array
 * renders a "signal incoming" state). When data is populated,
 * renders a horizontal scroll carousel of quote cards.
 *
 * Copy in the empty-state uses signal metaphor language.
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SignalLine } from '../shared/SignalLine';
import { staggerContainer, fadeUp, fadeIn } from '../../lib/motion-variants';

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

// ─── Empty state ──────────────────────────────────────────────────

const EmptyState: React.FC<{ prefersReduced: boolean | null }> = ({ prefersReduced }) => (
  <motion.div
    variants={staggerContainer(0.1, 0.1)}
    initial="hidden"
    whileInView={prefersReduced ? 'reducedMotion' : 'visible'}
    viewport={{ once: true, margin: '-60px' }}
    className="flex flex-col items-center gap-6 py-16"
    aria-label="Testimonials loading"
  >
    <motion.div variants={fadeIn} className="w-48" aria-hidden="true">
      <SignalLine
        height={32}
        amplitude={10}
        strokeWidth={1}
        opacity={0.3}
        speed={2}
        showDot
        animate={!prefersReduced}
        drawOnMount
      />
    </motion.div>
    <motion.p
      variants={fadeUp}
      className="label-micro text-center"
      style={{ color: 'var(--color-muted)' }}
    >
      Signal incoming — testimonials transmitting soon.
    </motion.p>
  </motion.div>
);

// ─── Quote card ───────────────────────────────────────────────────

const QuoteCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div
    className="flex-shrink-0 w-[min(380px,85vw)] flex flex-col gap-5 rounded-2xl border p-7 snap-start"
    style={{
      backgroundColor: 'var(--color-sand)',
      borderColor: 'var(--border-light)',
    }}
  >
    {/* Opening quote mark */}
    <span
      className="font-display italic text-5xl leading-none"
      style={{ color: 'var(--color-violet)', opacity: 0.2 }}
      aria-hidden="true"
    >
      "
    </span>

    <blockquote
      className="text-sm md:text-base leading-relaxed flex-1"
      style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
    >
      {t.quote}
    </blockquote>

    <div className="flex flex-col gap-0.5">
      <span
        className="text-sm font-semibold"
        style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
      >
        {t.name}
      </span>
      <span className="label-micro" style={{ color: 'var(--color-muted)' }}>
        {t.title} · {t.company}
      </span>
    </div>

    <div className="mt-auto" aria-hidden="true">
      <SignalLine
        height={16}
        amplitude={5}
        strokeWidth={0.7}
        opacity={0.18}
        showDot={false}
        animate={false}
      />
    </div>
  </div>
);

// ─── Section ──────────────────────────────────────────────────────

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = [],
}) => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex flex-col gap-4"
        >
          <motion.div variants={fadeIn}>
            <span className="label-micro-primary">/ What Founders Say</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            id="testimonials-heading"
            className="font-display italic text-[clamp(2rem,4.5vw,3.8rem)] leading-tight tracking-tight"
            style={{ color: 'var(--color-ink)' }}
          >
            Signal Received.
          </motion.h2>
        </motion.div>

        {/* ── Content: carousel or empty state ── */}
        {testimonials.length === 0 ? (
          <EmptyState prefersReduced={prefersReduced} />
        ) : (
          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
            role="list"
            aria-label="Testimonials"
            style={{ scrollbarWidth: 'none' }}
          >
            {testimonials.map((t) => (
              <QuoteCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
