'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-electric-indigo)] text-[var(--color-electric-white)] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeader
          eyebrow="/ Client Signal"
          title="What Clients Say."
          className="mb-16 text-[var(--color-electric-white)] [&_h2]:text-[var(--color-electric-white)] [&_span]:text-[var(--color-lime-green)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Large Quote Mark */}
            <span className="absolute -top-12 -left-8 md:-left-16 text-[8rem] font-display italic text-[var(--color-ink)] opacity-20 pointer-events-none leading-none">
              "
            </span>
            
            <blockquote className="relative z-10">
              <p className="font-display italic text-3xl md:text-5xl leading-tight mb-8">
                "We were losing almost 40% of mobile traffic to load times. SENO re-engineered the front-end in Next.js, cutting load time to sub-second. Our conversion rate doubled overnight."
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-ink)] flex items-center justify-center font-bold text-[var(--color-electric-white)]">
                  F
                </div>
                <div>
                  <div className="font-bold font-body text-lg">Fuelist Team</div>
                  <div className="text-[var(--color-electric-white)]/70 text-sm tracking-wider uppercase">Healthy Meal Delivery</div>
                </div>
              </div>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
