'use client';
/**
 * components/shared/Marquee.tsx
 * ─────────────────────────────────────────────────────────────────
 * Infinite horizontal ticker — "SENO STUDIO · MUZAFFARPUR ✦ ..."
 *
 * Implementation:
 *  • Content block duplicated 3× inside a flex row
 *  • Outer wrapper clips overflow-hidden
 *  • Animates translateX(0%) → translateX(-33.33%) linearly so the
 *    loop is truly seamless (works for any content length)
 *  • Pause-on-hover (desktop only) via CSS animation-play-state
 *  • Fully paused if prefers-reduced-motion
 *
 * ─── Props API ───────────────────────────────────────────────────
 *
 *  text?        string   — ticker text (default: MARQUEE_TEXT from content.ts)
 *  speed?       number   — duration in seconds (default: 28)
 *  direction?   "left" | "right"   (default: "left")
 *  pauseOnHover? boolean (default: true)
 *  className?   string   — extra classes on the root wrapper
 *  textStyle?   "normal" | "large"  (default: "normal")
 *
 * ─── Usage ───────────────────────────────────────────────────────
 *
 *  // Work page hero
 *  <Marquee speed={26} textStyle="large" />
 *
 *  // Subtle footer-style ticker
 *  <Marquee speed={40} textStyle="normal" pauseOnHover={false} />
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MARQUEE_TEXT } from '../../lib/content';

type Direction = 'left' | 'right';
type TextStyle = 'normal' | 'large';

interface MarqueeProps {
  text?: string;
  speed?: number;
  direction?: Direction;
  pauseOnHover?: boolean;
  className?: string;
  textStyle?: TextStyle;
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = MARQUEE_TEXT,
  speed = 28,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  textStyle = 'normal',
}) => {
  const prefersReduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // We duplicate content 3× so the visual wrap is always off-screen
  const repeats = 3;
  const content = Array.from({ length: repeats }, (_, i) => (
    <span
      key={i}
      className="flex-shrink-0 whitespace-nowrap pr-0"
      aria-hidden={i > 0 ? 'true' : undefined}
    >
      {text}&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
  ));

  const translateTarget = direction === 'left' ? '-33.333%' : '0%';
  const translateStart  = direction === 'left' ? '0%'       : '-33.333%';

  // Inject the keyframe dynamically so speed/direction props are reactive
  const animName = `marquee-${direction}-${speed}`;
  useEffect(() => {
    if (prefersReduced) return;
    const styleId = `seno-marquee-${animName}`;
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ${animName} {
        from { transform: translateX(${translateStart}); }
        to   { transform: translateX(${translateTarget}); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.getElementById(styleId)?.remove(); };
  }, [animName, translateStart, translateTarget, prefersReduced]);

  const isLarge = textStyle === 'large';

  const textClasses = isLarge
    ? 'text-4xl md:text-6xl font-display italic tracking-tight'
    : 'label-micro tracking-[0.18em]';

  const textColor = isLarge
    ? 'var(--color-ink)'
    : 'var(--color-ink-muted)';

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="marquee"
      aria-label={text}
      aria-live="off"
    >
      {/* Top + bottom gradient fade-out edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{
          background: `linear-gradient(to right, var(--color-bg) 0%, transparent 100%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{
          background: `linear-gradient(to left, var(--color-bg) 0%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      {/* Track */}
      <div
        ref={trackRef}
        className={`flex ${textClasses}`}
        style={{
          color: textColor,
          fontFamily: isLarge ? 'var(--font-display)' : 'var(--font-body)',
          animation: prefersReduced
            ? 'none'
            : `${animName} ${speed}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          // Start at beginning so we get seamless loop
          transform: prefersReduced ? `translateX(${translateStart})` : undefined,
          willChange: 'transform',
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Marquee;
