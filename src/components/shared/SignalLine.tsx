'use client';
/**
 * components/shared/SignalLine.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio — "Project Current" — Signature signal/pulse motif.
 *
 * A reusable SVG waveform component with:
 *  • Animated path draw-in (SVG pathLength via Framer Motion)
 *  • A Lime pulse-dot that travels the path via SVG <animateMotion>
 *  • Full `prefers-reduced-motion` support (static render, no animation)
 *  • Flexible sizing, opacity, speed, and color via props
 *
 * ─── PROPS API ───────────────────────────────────────────────────
 *
 *  width?         number | string  — SVG width. Default: "100%"
 *  height?        number           — SVG height in px. Default: 80
 *  strokeColor?   string           — Waveform stroke color. Default: "var(--color-violet)"
 *  dotColor?      string           — Traveling dot color. Default: "var(--color-gold)"
 *  strokeWidth?   number           — Stroke weight. Default: 1.5
 *  speed?         number           — Dot traversal duration in seconds. Default: 3
 *  amplitude?     number           — Vertical peak of the wave (0–100 in viewBox units). Default: 30
 *  animate?       boolean          — Whether to animate at all. Default: true
 *  showDot?       boolean          — Show the traveling pulse dot. Default: true
 *  className?     string           — Additional className on the <svg> root
 *  viewBoxWidth?  number           — Internal viewBox width. Default: 1000
 *
 * ─── USAGE ───────────────────────────────────────────────────────
 *
 *  // Hero background (full width, subtle)
 *  <SignalLine opacity={0.18} amplitude={28} speed={4} className="absolute bottom-0" />
 *
 *  // Section divider
 *  <SignalLine height={40} amplitude={14} strokeWidth={1} showDot={false} />
 *
 *  // Preloader (bold, fast draw-in, visible dot)
 *  <SignalLine height={60} strokeWidth={2} speed={1.5} animate drawOnMount />
 *
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useId, useEffect, useRef } from "react";
import { motion, useReducedMotion, useAnimation } from "framer-motion";
import { signalLineDraw } from "../../lib/motion-variants";

// ─── Types ────────────────────────────────────────────────────────

interface SignalLineProps {
  /** SVG width — number (px) or CSS string like "100%". Default: "100%" */
  width?: number | string;
  /** SVG height in px. Default: 80 */
  height?: number;
  /** Main waveform stroke color. Default: var(--color-violet) */
  strokeColor?: string;
  /** Traveling pulse-dot color. Default: var(--color-gold) */
  dotColor?: string;
  /** Stroke weight in px. Default: 1.5 */
  strokeWidth?: number;
  /** How long (seconds) the dot takes per loop traversal. Default: 3 */
  speed?: number;
  /**
   * Vertical amplitude of the sine-like wave, expressed in internal viewBox
   * units (0–100 range is useful; 50 = half the viewBox height). Default: 30
   */
  amplitude?: number;
  /** Whether to run the draw-in and dot animations. Default: true */
  animate?: boolean;
  /** Whether to show the traveling Lime dot. Default: true */
  showDot?: boolean;
  /** Controls draw-in on mount (vs. whileInView). Default: true */
  drawOnMount?: boolean;
  /** CSS opacity on the root SVG element. Default: 1 */
  opacity?: number;
  /** Additional class names on the <svg> root */
  className?: string;
  /** Internal viewBox width — controls path density. Default: 1000 */
  viewBoxWidth?: number;
}

// ─── Path builder ─────────────────────────────────────────────────

/**
 * Generates a smooth S-curve (cubic bezier chain) SVG path string.
 * Produces two full sine periods across the viewBox width.
 *
 * @param vbWidth    — total internal width (default 1000)
 * @param vbHeight   — total internal height (matches height prop mapped to 100)
 * @param amplitude  — wave peak offset from the center line
 */
function buildWavePath(
  vbWidth: number,
  amplitude: number,
  vbHeight = 100
): string {
  const midY = vbHeight / 2;
  const seg = vbWidth / 4; // one quarter-period per segment

  // Two complete S-curve periods using cubic bezier
  // C controlX1,controlY1 controlX2,controlY2 endX,endY
  return [
    `M 0,${midY}`,
    `C ${seg * 0.5},${midY - amplitude} ${seg * 0.5},${midY - amplitude} ${seg},${midY}`,
    `C ${seg * 1.5},${midY + amplitude} ${seg * 1.5},${midY + amplitude} ${seg * 2},${midY}`,
    `C ${seg * 2.5},${midY - amplitude} ${seg * 2.5},${midY - amplitude} ${seg * 3},${midY}`,
    `C ${seg * 3.5},${midY + amplitude} ${seg * 3.5},${midY + amplitude} ${vbWidth},${midY}`,
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────

export const SignalLine: React.FC<SignalLineProps> = ({
  width = "100%",
  height = 80,
  strokeColor = "var(--color-violet)",
  dotColor = "var(--color-gold)",
  strokeWidth = 1.5,
  speed = 3,
  amplitude = 30,
  animate = true,
  showDot = true,
  drawOnMount = true,
  opacity = 1,
  className = "",
  viewBoxWidth = 1000,
}) => {
  const uid = useId(); // stable SSR-safe ID for SVG defs
  const pathId = `signal-path-${uid.replace(/:/g, "")}`;
  const prefersReduced = useReducedMotion();
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  // ViewBox height is always 100 units; amplitude maps into that space
  const vbHeight = 100;
  const pathD = buildWavePath(viewBoxWidth, amplitude, vbHeight);

  // Trigger draw-in animation on mount (for hero / preloader use)
  useEffect(() => {
    if (!animate || prefersReduced || !drawOnMount || hasAnimated.current) return;
    hasAnimated.current = true;

    controls.start("visible");
  }, [animate, prefersReduced, drawOnMount, controls]);

  // ── Determine which variant state to use ──
  const initialVariant = prefersReduced || !animate ? "visible" : "hidden";
  const animateVariant = prefersReduced ? "reducedMotion" : "visible";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${vbHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"          // purely decorative
      focusable="false"
      className={className}
      style={{ opacity, display: "block" }}
    >
      {/* ── Defs: glowing filter for the dot ── */}
      <defs>
        <filter id={`glow-${pathId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── The invisible path used as the motion track for the dot ── */}
      <path
        id={pathId}
        d={pathD}
        fill="none"
        stroke="none"
      />

      {/* ── Main waveform — animated draw-in via pathLength ── */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={signalLineDraw}
        initial={initialVariant}
        animate={drawOnMount ? controls : undefined}
        // When used whileInView (not drawOnMount), parent handles animation
      />

      {/* ── Lime pulse dot traveling along the path ── */}
      {showDot && animate && !prefersReduced && (
        <circle
          r={strokeWidth * 2.8}
          fill={dotColor}
          filter={`url(#glow-${pathId})`}
          style={{ willChange: "transform" }}
        >
          <animateMotion
            dur={`${speed}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath xlinkHref={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}

      {/* ── Reduced-motion: show a static dot at the path midpoint ── */}
      {showDot && prefersReduced && (
        <circle
          cx={viewBoxWidth / 2}
          cy={vbHeight / 2}
          r={strokeWidth * 2.2}
          fill={dotColor}
          opacity={0.7}
        />
      )}
    </svg>
  );
};

export default SignalLine;
