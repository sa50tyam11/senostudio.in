/**
 * lib/motion-variants.ts
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — "Project Current" animation primitive library.
 *
 * All variants ship a `reducedMotion` key. Components consume it via:
 *   const prefersReduced = useReducedMotion(); // from framer-motion
 *   animate={prefersReduced ? "reducedMotion" : "visible"}
 * ─────────────────────────────────────────────────────────────────
 */

import type { Variants, Transition } from "framer-motion";

// ─── Shared timing curves ─────────────────────────────────────────

/** Signature ease — slightly aggressive overshoot-free cubic */
export const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fast ease for micro-interactions (hover, tap) */
export const EASE_MICRO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard reveal transition */
export const transition: Transition = {
  duration: 0.65,
  ease: EASE_SIGNAL,
};

/** Snappy transition for cards / hover lifts */
export const transitionMicro: Transition = {
  duration: 0.2,
  ease: EASE_MICRO,
};

// ─── 1. Fade Up ───────────────────────────────────────────────────
/**
 * Basic fade + translate-Y reveal.
 * @example
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
 *     viewport={{ once: true, margin: "-100px" }} />
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SIGNAL },
  },
  reducedMotion: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "linear" },
  },
};

// ─── 2. Fade In (no movement) ─────────────────────────────────────
/**
 * Pure opacity fade — for decorative elements (backgrounds, dividers, signal lines).
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  reducedMotion: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

// ─── 3. Stagger Container ─────────────────────────────────────────
/**
 * Wrapper that staggers child animations.
 * Pair with `fadeUp`, `wordReveal`, or any child variant.
 *
 * @param staggerSec   delay between children in seconds (default 0.055)
 * @param delayStart   initial delay before first child fires (default 0.1)
 *
 * @example
 *   <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible"
 *     viewport={{ once: true, margin: "-100px" }}>
 *     {items.map(item => <motion.div variants={listItem} key={item.id} />)}
 *   </motion.div>
 */
export const staggerContainer = (
  staggerSec = 0.055,
  delayStart = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerSec,
      delayChildren: delayStart,
    },
  },
  reducedMotion: {
    opacity: 1,
    transition: { staggerChildren: 0 },
  },
});

// ─── 4. Word / Line Reveal ────────────────────────────────────────
/**
 * Child variant for per-word headline reveals — intended as a *child*
 * of `staggerContainer`. Clips from below a baseline and rises in view.
 *
 * Usage pattern (the overflow:hidden wrapper is what creates the clipping):
 *   const words = headline.split(" ");
 *   <motion.h1 variants={staggerContainer(0.04)} initial="hidden" whileInView="visible">
 *     {words.map((w, i) => (
 *       <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
 *         <motion.span variants={wordReveal} style={{ display: "inline-block" }}>
 *           {w}&nbsp;
 *         </motion.span>
 *       </span>
 *     ))}
 *   </motion.h1>
 */
export const wordReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
    willChange: "opacity, transform",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.6, ease: EASE_SIGNAL },
  },
  reducedMotion: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.2 },
  },
};

// ─── 5. Slide In From Left ────────────────────────────────────────
/**
 * Horizontal entrance from left. Good for process steps, labels, eyebrow lines.
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE_SIGNAL },
  },
  reducedMotion: { opacity: 1, x: 0 },
};

// ─── 6. Scale Up ──────────────────────────────────────────────────
/**
 * Subtle scale-in reveal. Use for cards, images, signal-line decorators.
 */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SIGNAL },
  },
  reducedMotion: { opacity: 1, scale: 1 },
};

// ─── 7. Card Hover Lift — Indigo glow (services, pricing) ─────────
/**
 * Applied via `whileHover="hover"` on service/pricing cards.
 * Also set `initial="rest"` (not "hidden") when using alongside whileInView.
 *
 * @example
 *   <motion.div initial="rest" whileHover="hover" variants={cardHoverLift}>
 */
export const cardHoverLift: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 0 0px 0px rgba(108, 99, 255, 0)",
    borderColor: "rgba(255,255,255,0.08)",
    transition: transitionMicro,
  },
  hover: {
    y: -6,
    boxShadow: "0 12px 40px -8px rgba(108, 99, 255, 0.35)",
    borderColor: "rgba(108, 99, 255, 0.5)",
    transition: transitionMicro,
  },
};

/** Same lift but with a Lime glow — for tech-stack pills ("power on" effect) */
export const cardHoverLiftLime: Variants = {
  rest: {
    y: 0,
    filter: "grayscale(100%) opacity(0.6)",
    boxShadow: "0 0 0px 0px rgba(132, 204, 22, 0)",
    transition: transitionMicro,
  },
  hover: {
    y: -4,
    filter: "grayscale(0%) opacity(1)",
    boxShadow: "0 8px 32px -6px rgba(132, 204, 22, 0.35)",
    transition: transitionMicro,
  },
};

// ─── 8. Preloader overlay exit ────────────────────────────────────
/**
 * AnimatePresence exit for the full-screen Preloader.
 * Wipes the screen upward, revealing the hero beneath.
 */
export const preloaderExit: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

// ─── 9. Signal Line draw-in (SVG pathLength) ──────────────────────
/**
 * Drives SVG `pathLength` animation — apply to `motion.path`.
 *
 * @example
 *   <motion.path
 *     d="M0,50 Q250,0 500,50 Q750,100 1000,50"
 *     variants={signalLineDraw}
 *     initial="hidden"
 *     animate="visible"
 *   />
 */
export const signalLineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.4, ease: EASE_SIGNAL },
      opacity: { duration: 0.3 },
    },
  },
  reducedMotion: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

// ─── 10. Pulse dot duration constant ──────────────────────────────
/**
 * Duration (seconds) for the Lime dot to complete one full traversal
 * of the signal path. Used in SignalLine.tsx and the CSS keyframe.
 */
export const PULSE_DOT_DURATION = 3;

// ─── 11. List Item ────────────────────────────────────────────────
/**
 * Individual item inside a stagger container — fade+Y lift.
 * Simpler than `wordReveal` (no overflow-clip trick needed).
 */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SIGNAL },
  },
  reducedMotion: { opacity: 1, y: 0 },
};

// ─── 12. Stat / number reveal ─────────────────────────────────────
/**
 * Clips stat blocks in from below — pair with a `useCountUp` hook
 * for the actual number animation.
 */
export const statReveal: Variants = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.65, ease: EASE_SIGNAL },
  },
  reducedMotion: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
  },
};
