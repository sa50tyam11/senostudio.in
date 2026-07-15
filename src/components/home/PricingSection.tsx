'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';
import { useRouter } from 'next/navigation';

const tiers = [
  {
    id: 'SIG_SPARK_01',
    name: 'Spark',
    positioning: 'Core Foundation',
    timeline: '1–2 weeks',
    features: [
      'Up to 5 pages',
      'Figma-to-Next.js build',
      'Mobile-first responsive',
      'Framer Motion micro-interactions',
      'Basic SEO & Contact form',
      '14-day post-launch support'
    ],
    cta: 'Discuss Your Build',
    isPopular: false,
  },
  {
    id: 'SIG_CURRENT_02',
    name: 'Current',
    positioning: 'Full Engine',
    timeline: '3–5 weeks',
    features: [
      'Everything in Spark',
      'CMS / Blog integration',
      'Custom Supabase schema',
      'Advanced motion & interactions',
      'Analytics setup',
      '30-day post-launch support'
    ],
    cta: 'Start a Project',
    isPopular: true,
  },
  {
    id: 'SIG_GRID_03',
    name: 'Grid',
    positioning: 'Full-Scale System',
    timeline: '6–10 weeks',
    features: [
      'Everything in Current',
      'Full SaaS / Product architecture',
      'Custom admin dashboard',
      'CI/CD + Vercel deploy pipeline',
      'Auth & permissions (Clerk)',
      '60-day support / Retainer option'
    ],
    cta: 'Book a Discovery Call',
    isPopular: false,
  },
];

export const PricingSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="py-24 md:py-32 bg-[var(--color-surface)] relative border-t border-[var(--border-light)]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="/ Power Tiers"
          title="Pick Your Voltage."
          subtext="Every tier includes a free discovery call. No pressure, just current."
          className="mb-16 md:mb-24 text-center items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              className={`relative flex flex-col p-8 md:p-10 rounded-[2rem] border ${
                tier.isPopular 
                  ? 'bg-[var(--color-electric-indigo)] border-[var(--color-electric-indigo)] text-[var(--color-electric-white)] shadow-2xl scale-105 z-10' 
                  : 'bg-[var(--color-electric-white)] border-[var(--border-light)] text-[var(--color-ink)]'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-lime-green)] text-[var(--color-ink)] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${tier.isPopular ? 'text-[var(--color-lime-green)]' : 'text-[var(--color-electric-indigo)]'}`}>
                  {tier.id}
                </div>
                <h3 className="font-display italic text-4xl mb-2">{tier.name}</h3>
                <div className={`font-semibold ${tier.isPopular ? 'text-[var(--color-electric-white)]/80' : 'text-[var(--color-muted)]'}`}>
                  {tier.positioning}
                </div>
                <div className={`text-sm mt-1 ${tier.isPopular ? 'text-[var(--color-electric-white)]/60' : 'text-[var(--color-muted)]/70'}`}>
                  Timeline: {tier.timeline}
                </div>
              </div>

              <ul className="flex-grow space-y-4 mb-10">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className={`flex-shrink-0 w-5 h-5 mt-0.5 ${tier.isPopular ? 'text-[var(--color-lime-green)]' : 'text-[var(--color-electric-indigo)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm leading-relaxed ${tier.isPopular ? 'text-[var(--color-electric-white)]/90' : 'text-[var(--color-ink)]/80'}`}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => router.push(`/contact?tier=${tier.id}`)}
                className={`w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-colors ${
                  tier.isPopular
                    ? 'bg-[var(--color-lime-green)] text-[var(--color-ink)] hover:bg-white'
                    : 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-electric-indigo)]'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
