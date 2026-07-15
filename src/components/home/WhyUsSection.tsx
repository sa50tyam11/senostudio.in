'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

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
    <section className="py-24 md:py-32 bg-[var(--color-surface)] relative border-t border-[var(--border-light)]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="/ Why Founders Choose Current"
          title="Built for Founders Who Move Fast."
          subtext="We engineer for speed and precision — so your site never becomes the bottleneck."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {valueProps.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="group flex flex-col sm:flex-row gap-6 p-8 bg-[var(--color-electric-white)] rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)]"
            >
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-10 px-3 bg-[var(--color-electric-indigo)]/10 text-[var(--color-electric-indigo)] font-body text-xs font-bold tracking-widest uppercase rounded">
                  {prop.id}
                </span>
              </div>
              <div>
                <h3 className="font-body text-xl font-bold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-electric-indigo)] transition-colors">
                  {prop.title}
                </h3>
                <p className="font-body text-[var(--color-muted)] leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
