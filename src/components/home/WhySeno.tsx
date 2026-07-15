'use client';
/**
 * components/home/WhySeno.tsx
 * ─────────────────────────────────────────────────────────────────
 * "/ Why Founders Choose Current → Built for Founders Who Move Fast."
 *
 * Layout: 2×2 grid of stat/feature cards (desktop) / 1-col (mobile)
 * Each card has an ID tag, bold headline, muted description,
 * and a Lime accent dot + Indigo hover glow.
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealText }  from '../shared/RevealText';
import { SignalLine }  from '../shared/SignalLine';
import { whyCards, whySectionMeta } from '../../lib/content';
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  cardHoverLift,
  EASE_SIGNAL,
} from '../../lib/motion-variants';

export const WhySeno: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="why-seno"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="why-heading"
    >
      {/* Decorative Violet corner glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 rounded-full blur-[150px] opacity-60"
        style={{
          width: '500px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139,108,255,0.07) 0%, transparent 70%)',
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
          <motion.div variants={fadeIn} className="flex items-center gap-3">
            <span className="label-micro-primary">{whySectionMeta.eyebrow}</span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <RevealText
              as="h2"
              text={whySectionMeta.headline}
              className="font-display italic text-[clamp(2rem,4.5vw,3.8rem)] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' } as React.CSSProperties}
              stagger={0.055}
              id="why-heading"
            />
          </motion.div>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
        >
          {whyCards.map((card, i) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
            >
              <motion.div
                className="group relative flex flex-col gap-4 rounded-2xl border p-7 md:p-8 h-full"
                style={{
                  backgroundColor: 'var(--color-sand)',
                  borderColor: 'var(--border-light)',
                }}
                variants={cardHoverLift}
                initial="rest"
                whileHover={prefersReduced ? 'rest' : 'hover'}
                transition={{ duration: 0.2, ease: EASE_SIGNAL }}
              >
                {/* ID tag + violet dot */}
                <div className="flex items-center gap-2">
                  <motion.span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-violet)' }}
                    animate={prefersReduced ? {} : {
                      opacity: [1, 0.3, 1],
                      scale: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="label-micro"
                    style={{ color: 'var(--color-muted)' }}
                    aria-label={`Feature ID: ${card.id}`}
                  >
                    {card.id}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  className="font-display italic text-2xl md:text-3xl leading-tight tracking-tight"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {card.headline}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                >
                  {card.description}
                </p>

                {/* Mini signal line */}
                <div className="mt-auto pt-4" aria-hidden="true">
                  <SignalLine
                    height={16}
                    amplitude={5}
                    strokeWidth={0.7}
                    opacity={0.2}
                    showDot={false}
                    animate={false}
                  />
                </div>

                {/* Hover: Violet top-border accent */}
                <span
                  className="absolute inset-x-4 top-0 h-[2px] rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: 'var(--color-violet)' }}
                  aria-hidden="true"
                />
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

export default WhySeno;
