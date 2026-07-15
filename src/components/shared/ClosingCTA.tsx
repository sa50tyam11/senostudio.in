'use client';
/**
 * components/shared/ClosingCTA.tsx
 * ─────────────────────────────────────────────────────────────────
 * Shared closing call-to-action block — rendered verbatim at the
 * bottom of EVERY page. Do not rebuild per-page; import this once.
 *
 * Layout:
 *  • Eyebrow micro-label "/ Switch It On"
 *  • Large headline (Instrument Serif italic)
 *  • Primary button → /contact
 *  • Email address
 *  • Background: full-width SignalLine + subtle Indigo glow blob
 *
 * The entire block stagger-reveals on whileInView.
 * ─────────────────────────────────────────────────────────────────
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SignalLine } from "./SignalLine";
import { RevealText } from "./RevealText";
import { closingCta } from "../../lib/content";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  EASE_SIGNAL,
} from "../../lib/motion-variants";

export const ClosingCTA: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const animState = prefersReduced ? "reducedMotion" : "visible";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 md:py-36 px-6 md:px-10"
      aria-labelledby="closing-cta-heading"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* ── Decorative Indigo glow blob (desktop) ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            width: "600px",
            height: "320px",
            backgroundColor: "rgba(108,99,255,0.07)",
          }}
        />
      </div>

      {/* ── Signal lines — top and bottom ── */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" aria-hidden="true">
        <SignalLine
          height={50}
          amplitude={14}
          strokeWidth={0.7}
          opacity={0.12}
          showDot={false}
          animate={false}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 pointer-events-none" aria-hidden="true">
        <SignalLine
          height={50}
          amplitude={14}
          strokeWidth={0.7}
          opacity={0.12}
          showDot={false}
          animate={false}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView={animState}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-3"
          >
            <span
              className="inline-block h-px w-8"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.5 }}
              aria-hidden="true"
            />
            <span className="label-micro-primary tracking-[0.14em]">
              {closingCta.eyebrow}
            </span>
            <span
              className="inline-block h-px w-8"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.5 }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="w-full">
            <h2
              id="closing-cta-heading"
              className="font-display italic text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
              style={{ color: "var(--color-ink)" }}
            >
              {closingCta.headline}
            </h2>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            {/* Primary CTA */}
            <motion.a
              href={closingCta.ctaHref}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white"
              style={{
                backgroundColor: "var(--color-primary)",
                fontFamily: "var(--font-body)",
              }}
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      scale: 1.04,
                      boxShadow: "0 14px 40px -8px rgba(108,99,255,0.5)",
                    }
              }
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_SIGNAL }}
            >
              {closingCta.cta}
              <motion.span
                aria-hidden="true"
                style={{ color: "var(--color-accent)" }}
                animate={prefersReduced ? {} : { opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦
              </motion.span>
            </motion.a>

            {/* Email link */}
            <a
              href={`mailto:${closingCta.contact}`}
              className="text-sm font-medium transition-colors duration-200 hover:text-[color:var(--color-primary)]"
              style={{
                color: "var(--color-ink-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {closingCta.contact}
            </a>
          </motion.div>

          {/* Micro signal-line decoration below CTA */}
          <motion.div variants={fadeIn} className="w-40 mt-2" aria-hidden="true">
            <SignalLine
              height={24}
              amplitude={8}
              strokeWidth={1}
              speed={2.5}
              opacity={0.35}
              showDot
              animate={!prefersReduced}
              drawOnMount={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
