'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';

const stackCategories = [
  {
    name: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js 14', 'Tailwind CSS', 'Framer Motion', 'TanStack Query'],
  },
  {
    name: 'Backend & Data',
    items: ['Supabase', 'PostgreSQL', 'Clerk (auth)', 'Resend (email)', 'Node.js'],
  },
  {
    name: 'Infrastructure',
    items: ['Vercel', 'Vercel Edge', 'GitHub Actions/CI', 'Netlify'],
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-electric-white)] relative border-t border-[var(--border-light)]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="/ What Powers Us"
          title="Our Circuit Board."
          className="mb-16 md:mb-24 text-center items-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
          {stackCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <h3 className="font-display italic text-2xl mb-8 text-[var(--color-ink)] border-b border-[var(--border-light)] pb-4">
                {cat.name}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="group px-4 py-2 rounded-full border border-[var(--border-light)] bg-[var(--color-surface)] hover:bg-[var(--color-ink)] hover:border-[var(--color-lime-green)] transition-all cursor-default"
                  >
                    <span className="font-body text-sm font-medium text-[var(--color-muted)] group-hover:text-[var(--color-lime-green)] transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
