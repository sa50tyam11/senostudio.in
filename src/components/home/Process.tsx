'use client';
/**
 * components/home/Process.tsx
 * ─────────────────────────────────────────────────────────────────
 * "/ How Current Flows → From Signal to Output."
 *
 * Layout: alternating left/right numbered steps with a vertical
 * connecting line (the "circuit wire") running between them.
 *
 * Each step:
 *  • Step number (huge, muted, Instrument Serif)
 *  • Codename micro-label (SIG-style)
 *  • Phase label (e.g. "Discovery")
 *  • Description body text
 *  • Lime accent dot on the vertical line
 *
 * The connecting wire draws in progressively as the user scrolls
 * past each step (clip-path approach, no IntersectionObserver needed).
 *
 * Mobile: single-column stacked layout.
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealText } from '../shared/RevealText';
import { SignalLine } from '../shared/SignalLine';
import {
  processSteps,
  processSectionMeta,
} from '../../lib/content';
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  slideInLeft,
  EASE_SIGNAL,
} from '../../lib/motion-variants';

export const Process: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="process"
      className="relative py-24 md:py-36 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-sand)' }}
      aria-labelledby="process-heading"
    >
      {/* Faint Indigo top-left glow */}
      <div
        className="pointer-events-none absolute left-0 top-0 rounded-full blur-[120px] opacity-40"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139,108,255,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20 flex flex-col gap-4"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-3">
            <span className="label-micro-primary">{processSectionMeta.eyebrow}</span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <RevealText
              as="h2"
              text={processSectionMeta.headline}
              className="font-display italic text-[clamp(2rem,4.5vw,3.8rem)] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' } as React.CSSProperties}
              stagger={0.06}
              id="process-heading"
            />
          </motion.div>
        </motion.div>

        {/* ── Steps ── */}
        <div className="relative">
          {/* Vertical wire — desktop only */}
          <div
            className="absolute left-1/2 top-4 bottom-4 hidden md:block"
            style={{
              width: '1px',
              transform: 'translateX(-50%)',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(139,108,255,0.2) 10%, rgba(139,108,255,0.2) 90%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16 md:gap-0">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0; // alternates L/R on desktop

              return (
                <motion.div
                  key={step.number}
                  variants={staggerContainer(0.1, 0.05)}
                  initial="hidden"
                  whileInView={anim}
                  viewport={{ once: true, margin: '-80px' }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 md:py-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* ── Step content ── */}
                  <motion.div
                    variants={isLeft ? slideInLeft : {
                      hidden: { opacity: 0, x: 32 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_SIGNAL } },
                      reducedMotion: { opacity: 1, x: 0 },
                    }}
                    className={`flex-1 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                  >
                    {/* Phase label */}
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        isLeft ? 'md:justify-end' : 'justify-start'
                      }`}
                    >
                      <span
                        className="label-micro"
                        style={{ color: 'var(--color-muted)' }}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Codename */}
                    <h3 className="font-display italic text-2xl md:text-3xl leading-tight mb-3"
                      style={{ color: 'var(--color-ink)' }}>
                      {step.codename}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base leading-relaxed max-w-[40ch]"
                      style={{
                        color: 'var(--color-muted)',
                        fontFamily: 'var(--font-body)',
                        marginLeft: isLeft ? 'auto' : undefined,
                      }}
                    >
                      {step.description}
                    </p>
                  </motion.div>

                  {/* ── Center node (wire dot + number) ── */}
                  <motion.div
                    variants={fadeUp}
                    className="hidden md:flex flex-col items-center gap-2 z-10 w-0"
                    aria-hidden="true"
                  >
                    {/* Lime accent dot */}
                    <motion.div
                      className="rounded-full border-2 flex items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderColor: 'var(--color-violet)',
                        backgroundColor: 'var(--color-ivory)',
                        position: 'relative',
                      }}
                      whileInView={prefersReduced ? {} : { scale: [0.7, 1.1, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, ease: EASE_SIGNAL }}
                    >
                      <span
                        className="font-body text-xs font-semibold"
                        style={{ color: 'var(--color-violet)' }}
                      >
                        {step.number}
                      </span>
                      {/* Lime pulse ring */}
                      {!prefersReduced && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ border: '1px solid var(--color-gold)', opacity: 0 }}
                          animate={{ opacity: [0, 0.6, 0], scale: [1, 1.6, 1.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.5 }}
                        />
                      )}
                    </motion.div>
                  </motion.div>

                  {/* ── Mobile step number ── */}
                  <motion.div
                    variants={fadeIn}
                    className="flex md:hidden items-center gap-3"
                    aria-hidden="true"
                  >
                    <span
                      className="font-display italic text-5xl font-light leading-none"
                      style={{ color: 'rgba(139,108,255,0.12)' }}
                    >
                      {step.number}
                    </span>
                    <span className="label-micro-primary">{step.codename}</span>
                  </motion.div>

                  {/* ── Spacer for right-side column ── */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Section divider ── */}
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

export default Process;
