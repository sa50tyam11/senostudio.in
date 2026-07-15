'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

import TiltedCard from '../ui/TiltedCard';

const valueProps = [
  {
    id: 'SIG_ID_01',
    title: 'Shipped Fast',
    desc: 'Most builds go from kickoff to live in 2–6 weeks, not months.',
  },
  {
    id: 'SIG_ID_02',
    title: 'Performance First',
    desc: 'Targeting 90+ Lighthouse scores and sub-second load times on every build.',
  },
  {
    id: 'SIG_ID_03',
    title: 'Full-Stack Capable',
    desc: 'One team, from Figma to production database — no handoff gaps.',
  },
  {
    id: 'SIG_ID_04',
    title: 'Modern, No Debt',
    desc: 'Every build on current-gen stack (Next.js 14, Supabase, Clerk) — nothing legacy to inherit.',
  },
];

export const WhyUsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-[#FFF9F2] via-[#F6F7F0] to-[#EAF2EC] relative border-t border-[var(--border-light)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column - Header */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 h-fit flex flex-col gap-6 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-electric-indigo)]">
                / Why Founders Choose Current
              </span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              Built for Founders Who Move Fast.
            </h2>
            <div className="w-12 h-[1px] bg-[var(--color-electric-indigo)]/30 my-4" />
            <p className="font-body text-[var(--color-muted)] text-base md:text-lg leading-relaxed max-w-sm">
              We engineer for speed and precision — so your site never becomes the bottleneck.
            </p>
          </div>

          {/* Right Column - 2x2 Bento Grid with TiltedCard */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {valueProps.map((prop, idx) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  className="min-h-[220px] w-full"
                >
                  <TiltedCard
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    scaleOnHover={1.02}
                    rotateAmplitude={10}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    overlayContent={
                      <div className="flex flex-col gap-4 p-8 w-full h-full justify-center group pointer-events-none">
                        <div className="flex-shrink-0 mb-2">
                          <span className="inline-flex items-center justify-center h-8 px-3 bg-[var(--color-electric-indigo)]/10 text-[var(--color-electric-indigo)] font-body text-[10px] font-bold tracking-widest uppercase rounded">
                            {prop.id}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-body text-xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-electric-indigo)] transition-colors">
                            {prop.title}
                          </h3>
                          <p className="font-body text-sm text-[var(--color-muted)] leading-relaxed">
                            {prop.desc}
                          </p>
                        </div>
                      </div>
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
