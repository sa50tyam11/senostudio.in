'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// ─── Data ─────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    codename: 'Signal',
    label: 'Discovery',
    desc: 'We pick up the real signal — your goals, users, and constraints — before writing a single line of code.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    num: '02',
    codename: 'Circuit',
    label: 'Architecture & Strategy',
    desc: 'We wire the core logic: tech stack, data flow, and the paths users will actually travel.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: '03',
    codename: 'Charge',
    label: 'Development',
    desc: 'Full power to the build — interface, backend, and motion, all running in one continuous current.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: '04',
    codename: 'Output',
    label: 'Launch & Iteration',
    desc: 'We switch it on, measure what happens, and keep tuning the signal until the metrics move.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

// ─── Step ranges ──────────────────────────────────────────────────
const STEP_START = 0.20;
const STEP_END   = 0.90;
const stepRange  = (STEP_END - STEP_START) / STEPS.length;

function getStepBounds(i: number) {
  const nodeStart    = STEP_START + i * stepRange;
  const nodeEnd      = nodeStart + stepRange * 0.55;
  const contentStart = nodeStart + stepRange * 0.05;
  const contentEnd   = nodeStart + stepRange * 0.7;
  return { nodeStart, nodeEnd, contentStart, contentEnd };
}

// ─── Step node (hooks at top-level of own component) ──────────────
const StepNode: React.FC<{
  step: typeof STEPS[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}> = ({ step, index, scrollYProgress }) => {
  const { nodeStart, nodeEnd, contentStart, contentEnd } = getStepBounds(index);

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  const nodeOpacity = useTransform(
    scrollYProgress,
    [clamp(nodeStart), clamp(nodeEnd)],
    [0, 1],
  );
  const nodeScale = useTransform(
    scrollYProgress,
    [clamp(nodeStart), clamp(nodeEnd)],
    [0.5, 1],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [clamp(contentStart), clamp(contentEnd)],
    [0, 1],
  );
  const contentY = useTransform(
    scrollYProgress,
    [clamp(contentStart), clamp(contentEnd)],
    [16, 0],
  );

  return (
    <div className="flex flex-col items-start" style={{ width: '23%' }}>

      {/* Circle */}
      <motion.div
        style={{ opacity: nodeOpacity, scale: nodeScale }}
        className="relative mb-7 flex h-11 w-11 items-center justify-center rounded-full z-10"
      >
        {/* Glow ring */}
        <div
          className="absolute inset-[-5px] rounded-full"
          style={{ border: '1px solid rgba(108,99,255,0.25)' }}
        />
        {/* Circle bg */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
        />
        <span className="relative z-10 text-white/60">
          {step.icon}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: contentOpacity, y: contentY }}>
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className="text-[12px] font-semibold tabular-nums"
            style={{ color: '#6C63FF', fontFamily: 'var(--font-body)' }}
          >
            {step.num}
          </span>
          <h3
            className="text-[clamp(1rem,1.8vw,1.4rem)] font-normal text-white tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {step.codename}
          </h3>
        </div>

        <p
          className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/30"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {step.label}
        </p>

        <p
          className="text-[12.5px] leading-[1.75] text-white/38"
          style={{ fontFamily: 'var(--font-body)', maxWidth: '190px' }}
        >
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
};

// ─── Main export ──────────────────────────────────────────────────
export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const TOTAL_SCREENS = STEPS.length + 1; // intro + one per step

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });

  // Heading: 0 → 18%
  const headingOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const headingY       = useTransform(scrollYProgress, [0, 0.18], [24, 0]);

  // Timeline line: 20% → 90%
  const lineWidth = useTransform(smooth, [0.18, 0.90], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL_SCREENS * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky panel ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a] flex flex-col justify-center">

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.05] z-20">
          <motion.div
            className="h-full bg-[#6C63FF]"
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          />
        </div>

        <div className="px-6 sm:px-10 md:px-14 lg:px-20 w-full max-w-7xl mx-auto">

          {/* ── Header ── */}
          <motion.div style={{ opacity: headingOpacity, y: headingY }} className="mb-16 md:mb-20">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-6 bg-[#6C63FF]/60" />
              <span
                className="text-[11px] uppercase tracking-[0.22em] font-medium"
                style={{ color: 'rgba(108,99,255,0.8)', fontFamily: 'var(--font-body)' }}
              >
                How Current Flows
              </span>
            </div>

            <h2
              className="text-[clamp(2rem,5vw,4.5rem)] font-light tracking-tight leading-[1.1] text-white"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              From Signal to Output.
            </h2>
          </motion.div>

          {/* ── Timeline ── */}
          <div className="relative">
            {/* Grey track */}
            <div
              className="absolute top-[22px] h-px bg-white/[0.07]"
              style={{ left: '22px', right: '22px' }}
            />

            {/* Indigo fill line */}
            <div
              className="absolute top-[22px] h-px overflow-hidden"
              style={{ left: '22px', right: '22px' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ width: lineWidth, background: 'rgba(108,99,255,0.5)' }}
              />
            </div>

            {/* Step nodes */}
            <div className="relative flex items-start justify-between">
              {STEPS.map((step, i) => (
                <StepNode
                  key={step.num}
                  step={step}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom vignette */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }}
        />
      </div>
    </div>
  );
};
