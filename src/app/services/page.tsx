/**
 * pages/Services.tsx — /services
 * ─────────────────────────────────────────────────────────────────
 * Dedicated Services page — full detail on what SENO builds.
 * Reuses the Services section component plus adds:
 *  • Hero with large headline
 *  • Process section (how every engagement runs)
 *  • Why SENO section
 *  • Tech stack section
 *  • Closing CTA
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ClosingCTA } from '../../components/shared/ClosingCTA';
import { SignalLine } from '../../components/shared/SignalLine';
import { RevealText } from '../../components/shared/RevealText';
import { Services }   from '../../components/home/Services';
import { Process }    from '../../components/home/Process';
import { WhySeno }    from '../../components/home/WhySeno';
import { TechStack }  from '../../components/home/TechStack';
import { staggerContainer, fadeUp, fadeIn } from '../../lib/motion-variants';

const ServicesPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <main id="services-main">
        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden"
          aria-labelledby="services-page-heading"
        >
          {/* Indigo radial glow */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
              style={{
                width: '700px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden"
              animate={anim}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3">
                <span className="label-micro-primary tracking-[0.14em]">/ Signal Lines</span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <RevealText
                  as="h1"
                  text="What We Transmit."
                  className="font-display italic text-[clamp(3rem,8vw,7rem)] leading-[1.0] tracking-tight"
                  style={{ color: 'var(--color-ink)' } as React.CSSProperties}
                  stagger={0.055}
                  id="services-page-heading"
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg leading-relaxed max-w-[52ch]"
                style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
              >
                Every service runs on the same current — clarity in, precision out.
                Pick what you need, or let's scope it together.
              </motion.p>
            </motion.div>

            {/* Signal line divider */}
            <div className="mt-14 pointer-events-none" aria-hidden="true">
              <SignalLine
                height={50}
                amplitude={16}
                strokeWidth={1}
                opacity={0.13}
                speed={4}
                showDot
                animate={!prefersReduced}
                drawOnMount
              />
            </div>
          </div>
        </section>

        {/* ── Sections (reuse home components) ── */}
        <Services />
        <Process />
        <WhySeno />
        <TechStack />
        <ClosingCTA />
      </main>
  );
};

export default ServicesPage;
