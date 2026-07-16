'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ClosingCTA } from '../../components/shared/ClosingCTA';
import { RevealText } from '../../components/shared/RevealText';
import { staggerContainer, fadeUp, fadeIn } from '../../lib/motion-variants';

const TeamPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <main id="team-main">
        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden min-h-[70vh] flex flex-col justify-center border-b border-[var(--border-light)]"
          aria-labelledby="team-page-heading"
        >
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

          <div className="relative mx-auto max-w-[1440px] w-full flex flex-col lg:flex-row">
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-[var(--color-lime-green)] opacity-60" />
                <span className="label-micro-primary tracking-[0.25em] text-[var(--color-lime-green)] font-bold">
                  / OUR TEAM
                </span>
              </div>

              <motion.div
                variants={staggerContainer(0.1, 0.15)}
                initial="hidden"
                animate={anim}
                className="flex flex-col gap-6"
              >
                <motion.div variants={fadeUp}>
                  <RevealText
                    as="h1"
                    text="The people behind the pixels."
                    className="font-display italic text-[clamp(3rem,8vw,7rem)] leading-[1.0] tracking-tight"
                    style={{ color: 'var(--color-ink)' } as React.CSSProperties}
                    stagger={0.055}
                    id="team-page-heading"
                  />
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="text-base md:text-lg leading-relaxed max-w-[52ch]"
                  style={{ color: 'var(--color-ink-muted)', fontFamily: 'var(--font-body)' }}
                >
                  We are a small, focused team of engineers and designers based in Muzaffarpur, India. We believe in high-fidelity execution and moving fast.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <ClosingCTA />
      </main>
  );
};

export default TeamPage;
