'use client';
/**
 * components/home/Pricing.tsx
 * ─────────────────────────────────────────────────────────────────
 * "/ Power Tiers → Pick Your Voltage."
 *
 * Layout: 3-column card row (desktop) / stacked (mobile)
 * The "Current" (Most Popular) card is elevated and highlighted.
 *
 * Data source: pricingTiers[] from lib/content.ts
 * All content is prop-driven — no hardcoded copy in this file.
 *
 * Each card:
 *  • ID micro-label
 *  • Tier name (Instrument Serif italic)
 *  • Tagline + timeline badge
 *  • Feature checklist (✓ / ✗ per item)
 *  • CTA button → /contact?tier=SIG_CURRENT_02
 *  • Hover: Indigo border glow + y lift
 *  • "Most Popular" badge on the featured tier
 * ─────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealText } from '../shared/RevealText';
import { SignalLine } from '../shared/SignalLine';
import {
  pricingTiers,
  pricingSectionMeta,
  type PricingTier,
  type PricingFeature,
} from '../../lib/content';
import {
  staggerContainer,
  fadeUp,
  fadeIn,
  cardHoverLift,
  EASE_SIGNAL,
} from '../../lib/motion-variants';

// ─── Feature row ─────────────────────────────────────────────────

const FeatureRow: React.FC<{ feature: PricingFeature }> = ({ feature }) => (
  <li className="flex items-start gap-3">
    <span
      className="mt-0.5 flex-shrink-0 text-xs font-semibold"
      style={{
        color: feature.included ? 'var(--color-gold)' : 'rgba(10,10,10,0.2)',
        fontFamily: 'var(--font-body)',
      }}
      aria-label={feature.included ? 'Included' : 'Not included'}
    >
      {feature.included ? '✓' : '✗'}
    </span>
    <span
      className="text-sm leading-snug"
      style={{
        color: feature.included ? 'var(--color-muted)' : 'rgba(10,10,10,0.3)',
        fontFamily: 'var(--font-body)',
        textDecoration: feature.included ? 'none' : 'none',
      }}
    >
      {feature.text}
    </span>
  </li>
);

// ─── Pricing card ────────────────────────────────────────────────

interface PricingCardProps {
  tier: PricingTier;
  prefersReduced: boolean | null;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, prefersReduced }) => {
  const isFeatured = !!tier.popular;

  return (
    <motion.div
      className={`relative flex flex-col rounded-2xl border p-7 md:p-8 ${
        isFeatured ? 'shadow-lg' : ''
      }`}
      style={{
        backgroundColor: isFeatured ? 'var(--color-violet)' : 'var(--color-sand)',
        borderColor: isFeatured
          ? 'var(--color-violet)'
          : 'var(--border-light)',
        // Featured card sits slightly taller (scale handled in container)
      }}
      variants={cardHoverLift}
      initial="rest"
      whileHover={prefersReduced ? 'rest' : 'hover'}
      transition={{ duration: 0.2, ease: EASE_SIGNAL }}
    >
      {/* "Most Popular" badge */}
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-ink)',
              fontFamily: 'var(--font-body)',
            }}
          >
            <span aria-hidden="true">✦</span> Most Popular
          </span>
        </div>
      )}

      {/* ID tag */}
      <span
        className="label-micro mb-5"
        style={{
          color: isFeatured ? 'rgba(255,255,255,0.5)' : 'var(--color-muted)',
          letterSpacing: '0.1em',
        }}
      >
        {tier.id}
      </span>

      {/* Tier name */}
      <h3
        className="font-display italic text-3xl leading-tight tracking-tight mb-1"
        style={{ color: isFeatured ? '#FFFFFF' : 'var(--color-ink)' }}
      >
        {tier.name}
      </h3>

      {/* Tagline */}
      <p
        className="text-sm mb-5"
        style={{
          color: isFeatured ? 'rgba(255,255,255,0.7)' : 'var(--color-muted)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {tier.tagline}
      </p>

      {/* Timeline badge */}
      <div className="mb-6">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: isFeatured
              ? 'rgba(255,255,255,0.15)'
              : 'rgba(139,108,255,0.08)',
            color: isFeatured ? '#FFFFFF' : 'var(--color-violet)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span aria-hidden="true">⚡</span> {tier.timeline}
        </span>
      </div>

      {/* Signal line divider */}
      <div className="mb-6" aria-hidden="true">
        <SignalLine
          height={20}
          amplitude={6}
          strokeWidth={0.7}
          strokeColor={isFeatured ? 'rgba(255,255,255,0.3)' : '#8b6cff'}
          opacity={isFeatured ? 0.5 : 0.2}
          showDot={false}
          animate={false}
        />
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1 mb-8" role="list">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex-shrink-0 text-xs font-semibold"
              style={{
                color: f.included
                  ? isFeatured ? 'var(--color-gold)' : 'var(--color-gold)'
                  : isFeatured ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,10,0.2)',
                fontFamily: 'var(--font-body)',
              }}
              aria-label={f.included ? 'Included' : 'Not included'}
            >
              {f.included ? '✓' : '✗'}
            </span>
            <span
              className="text-sm leading-snug"
              style={{
                color: f.included
                  ? isFeatured ? 'rgba(255,255,255,0.9)' : 'var(--color-muted)'
                  : isFeatured ? 'rgba(255,255,255,0.3)' : 'rgba(10,10,10,0.3)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <motion.a
        href={`/contact?tier=${tier.id}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-200"
        style={{
          backgroundColor: isFeatured ? '#FFFFFF' : 'var(--color-violet)',
          color: isFeatured ? 'var(--color-violet)' : '#FFFFFF',
          fontFamily: 'var(--font-body)',
        }}
        whileHover={prefersReduced ? {} : { scale: 1.02 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
      >
        {tier.cta}
        <span style={{ opacity: 0.7 }} aria-hidden="true">→</span>
      </motion.a>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────

export const Pricing: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-36 px-6 md:px-10 overflow-hidden"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="pricing-heading"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-[160px] opacity-50"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(139,108,255,0.08) 0%, transparent 70%)',
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
          className="mb-16 text-center flex flex-col items-center gap-4"
        >
          <motion.div variants={fadeIn}>
            <span className="label-micro-primary">{pricingSectionMeta.eyebrow}</span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <RevealText
              as="h2"
              text={pricingSectionMeta.headline}
              className="font-display italic text-[clamp(2.4rem,5vw,4.2rem)] leading-tight tracking-tight"
              style={{ color: 'var(--color-ink)' } as React.CSSProperties}
              stagger={0.06}
              id="pricing-heading"
            />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-sm"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
          >
            {pricingSectionMeta.subtext}
          </motion.p>
        </motion.div>

        {/* ── Cards — featured one is larger via mt offset ── */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-start"
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={fadeUp}
              // Featured card gets a slight upward offset on desktop
              className={tier.popular ? 'md:-mt-4 md:mb-4' : ''}
            >
              <PricingCard tier={tier} prefersReduced={prefersReduced} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Discovery note ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView={anim}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="label-micro" style={{ color: 'var(--color-muted)' }}>
            All tiers include a free discovery call — no commitment.{' '}
            <a
              href="mailto:senowebstudio@gmail.com"
              className="underline transition-colors hover:text-[color:var(--color-violet)]"
            >
              senowebstudio@gmail.com
            </a>
          </p>
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

export default Pricing;
