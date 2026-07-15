'use client';
/**
 * components/shared/RevealText.tsx
 * ─────────────────────────────────────────────────────────────────
 * Staggered word-by-word (or line-by-line) reveal wrapper.
 *
 * Each word is clipped below a baseline inside an overflow:hidden
 * span parent, then rises into view — the classic "lifting text"
 * technique. Triggered by `whileInView` (fires slightly before the
 * element is fully on-screen via viewport margin).
 *
 * ─── Props API ───────────────────────────────────────────────────
 *
 *  text          string    — The text to reveal
 *  as?           keyof JSX — HTML element to render as (default: "p")
 *  className?    string    — Class names applied to the root element
 *  stagger?      number    — Seconds between word reveals (default: 0.045)
 *  delay?        number    — Seconds before first word fires (default: 0.05)
 *  once?         boolean   — Only animate the first time in view (default: true)
 *  splitBy?      "word" | "line" — How to split the text (default: "word")
 *
 * ─── Usage ───────────────────────────────────────────────────────
 *
 *  // Headline
 *  <RevealText
 *    as="h1"
 *    text="Let's put a charge through your next idea."
 *    className="text-5xl font-display italic"
 *    stagger={0.04}
 *  />
 *
 *  // Subtext paragraph
 *  <RevealText
 *    as="p"
 *    text="SENO Studio designs and engineers..."
 *    className="text-base text-ink-muted"
 *    stagger={0.025}
 *    delay={0.2}
 *  />
 * ─────────────────────────────────────────────────────────────────
 */

import React, { ElementType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_SIGNAL } from "../../lib/motion-variants";

// ─── Types ────────────────────────────────────────────────────────

type SplitMode = "word" | "line";

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  splitBy?: SplitMode;
  /** Optional aria-label if the element needs an accessible label override */
  ariaLabel?: string;
}

// ─── Sub-variants (inline to keep component self-contained) ───────

const containerVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
  reducedMotion: {},
});

const wordVariants = {
  hidden: {
    opacity: 0,
    y: "102%",          // slightly beyond 100% to avoid anti-aliasing bleed
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.58, ease: EASE_SIGNAL },
  },
  reducedMotion: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.2 },
  },
};

// ─── Component ────────────────────────────────────────────────────

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  as: Tag = "p",
  className = "",
  stagger = 0.045,
  delay = 0.05,
  once = true,
  splitBy = "word",
  ariaLabel,
}) => {
  const prefersReduced = useReducedMotion();
  const tokens = splitBy === "line" ? text.split("\n") : text.split(" ");

  // ── Reduced-motion: render plain text, no splitting ──
  if (prefersReduced) {
    const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: "-80px" }}
        transition={{ duration: 0.3 }}
        aria-label={ariaLabel}
      >
        {text}
      </MotionTag>
    );
  }

  // ── Full animation: split into overflow-clipped word spans ──
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.p;

  return (
    <MotionTag
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      aria-label={ariaLabel ?? text}
      // Hide individual word spans from AT — aria-label carries the full text
      aria-hidden="false"
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            // Tiny bottom padding prevents descenders being clipped
            paddingBottom: "0.1em",
            verticalAlign: "bottom",
          }}
        >
          <motion.span
            variants={wordVariants}
            style={{ display: "inline-block" }}
            aria-hidden="true"
          >
            {token}
            {/* Re-add the space stripped by split(" ") */}
            {splitBy === "word" && i < tokens.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default RevealText;
