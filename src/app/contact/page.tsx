/**
 * pages/Contact.tsx — /contact
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio contact page.
 *
 * Layout (split desktop):
 *  Left col  — headline, why-contact copy, direct contact details,
 *              a decorative SignalLine + Lime dot
 *  Right col — ContactForm (with URL pre-fill magic)
 *
 * Also: eyebrow marquee strip (smaller, one-direction) above the fold.
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SignalLine }   from '../../components/shared/SignalLine';
import { RevealText }   from '../../components/shared/RevealText';
import { ContactForm }  from '../../components/contact/ContactForm';
import { staggerContainer, fadeUp, fadeIn, listItem, EASE_SIGNAL } from '../../lib/motion-variants';

// ─── Contact sidebar details ──────────────────────────────────────

const CONTACT_DETAILS = [
  { label: 'Email', value: 'hello@senostudio.in', href: 'mailto:hello@senostudio.in' },
  { label: 'Location', value: 'Muzaffarpur, Bihar — India', href: null },
  { label: 'Response time', value: '1–2 business days', href: null },
];

const WHY_POINTS = [
  { id: 'SIG_C_01', text: 'Free discovery call — no commitment, no pitch deck.' },
  { id: 'SIG_C_02', text: 'We respond to every brief. No ghosting.' },
  { id: 'SIG_C_03', text: 'One team from Figma to deployed product.' },
];

// ─── Page ─────────────────────────────────────────────────────────

const Contact: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <main id="contact-main">
        {/* ────────────────────────────────────────────────────────
            HERO STRIP
        ──────────────────────────────────────────────────────── */}
        <section
          className="pt-28 pb-0 overflow-hidden"
          aria-labelledby="contact-heading"
        >
          {/* Eyebrow + headline */}
          <div className="px-6 md:px-10 mb-14">
            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden"
              animate={anim}
              className="mx-auto max-w-7xl flex flex-col gap-5"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <span className="label-micro-primary tracking-[0.14em]">/ Switch It On</span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <RevealText
                  as="h1"
                  text="Start The Conversation."
                  className="font-display italic text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.0] tracking-tight"
                  style={{ color: 'var(--color-ink)' } as React.CSSProperties}
                  stagger={0.055}
                  id="contact-heading"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Thin signal line divider */}
          <div
            className="border-t pointer-events-none"
            style={{ borderColor: 'rgba(10,10,10,0.07)' }}
            aria-hidden="true"
          >
            <div style={{ marginTop: '-1px' }}>
              <SignalLine
                height={40}
                amplitude={12}
                strokeWidth={0.8}
                opacity={0.12}
                speed={5}
                showDot
                animate={!prefersReduced}
                drawOnMount={false}
              />
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            SPLIT LAYOUT — sidebar + form
        ──────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-16 md:py-24">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">

            {/* ── Left: sidebar ── */}
            <motion.div
              variants={staggerContainer(0.09, 0.1)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-10 lg:sticky lg:top-28"
            >
              {/* Sub-headline */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  Tell us what you're building and we'll tell you if we're the right team to build it with you.
                </p>
              </motion.div>

              {/* Why points */}
              <motion.div variants={staggerContainer(0.07, 0.05)} className="flex flex-col gap-4">
                {WHY_POINTS.map((pt) => (
                  <motion.div
                    key={pt.id}
                    variants={listItem}
                    className="flex items-start gap-3"
                  >
                    {/* Lime dot */}
                    <motion.span
                      className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      animate={prefersReduced ? {} : {
                        opacity: [1, 0.4, 1],
                        scale: [1, 0.7, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                    >
                      {pt.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact details */}
              <motion.div variants={listItem} className="flex flex-col gap-4">
                <span className="label-micro" style={{ color: 'var(--color-ink-muted)' }}>
                  Direct signal
                </span>
                {CONTACT_DETAILS.map((d) => (
                  <div key={d.label} className="flex flex-col gap-0.5">
                    <span className="label-micro" style={{ color: 'var(--color-ink-muted)' }}>
                      {d.label}
                    </span>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-sm font-medium transition-colors duration-150 hover:text-[color:var(--color-primary)]"
                        style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                      >
                        {d.value}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Decorative signal line */}
              <motion.div
                variants={fadeIn}
                className="mt-4"
                aria-hidden="true"
              >
                <SignalLine
                  height={48}
                  amplitude={16}
                  strokeWidth={1.2}
                  opacity={0.25}
                  speed={3}
                  showDot
                  animate={!prefersReduced}
                  drawOnMount={false}
                />
              </motion.div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-40px' }}
              className="rounded-2xl border p-6 md:p-8"
              style={{
                borderColor: 'rgba(10,10,10,0.08)',
                backgroundColor: 'var(--color-bg)',
                boxShadow: '0 4px 40px -10px rgba(108,99,255,0.08)',
              }}
            >
              {/* Form header */}
              <div className="mb-6">
                <p className="label-micro-primary mb-2">/ Your Brief</p>
                <h2
                  className="font-display italic text-2xl tracking-tight"
                  style={{ color: 'var(--color-ink)' }}
                >
                  What are you building?
                </h2>
              </div>

              <Suspense fallback={<div className="h-40 w-full animate-pulse bg-gray-100 rounded-lg"></div>}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────────
            BOTTOM SIGNAL + FAQ MICRO-STRIP
        ──────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="pointer-events-none mb-16" aria-hidden="true">
              <SignalLine
                height={56}
                amplitude={18}
                strokeWidth={1}
                opacity={0.1}
                speed={4}
                showDot
                animate={!prefersReduced}
                drawOnMount={false}
              />
            </div>

            {/* Mini FAQ */}
            <motion.div
              variants={staggerContainer(0.07, 0.05)}
              initial="hidden"
              whileInView={anim}
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  q: 'How quickly do you start?',
                  a: 'Usually within 1–2 weeks of signing. We keep a short queue so we can actually commit.',
                },
                {
                  q: 'Do you work with early-stage founders?',
                  a: 'Yes. Some of our best work has been with pre-revenue founders who have a clear vision and a tight timeline.',
                },
                {
                  q: 'What if I just have an idea?',
                  a: 'That\'s fine — the discovery call is for turning fuzzy ideas into clear briefs. No polished spec required.',
                },
              ].map((item) => (
                <motion.div key={item.q} variants={listItem} className="flex flex-col gap-2">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.q}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
  );
};

export default Contact;
