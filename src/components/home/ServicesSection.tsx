'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../shared/SectionHeader';
import { useRouter } from 'next/navigation';

const services = [
  {
    id: 'SIG_UI_01',
    name: 'Interface Engineering',
    description: 'Pixel-precise Next.js interfaces built for fluid motion and layout fidelity, not just responsive breakpoints.',
  },
  {
    id: 'SIG_FS_02',
    name: 'Full-Stack Builds',
    description: 'End-to-end apps pairing React frontends with Supabase-backed, production-grade backends.',
  },
  {
    id: 'SIG_IX_03',
    name: 'Motion & Micro-Interaction',
    description: 'Framer Motion-driven interactions engineered to make every click feel intentional.',
  },
  {
    id: 'SIG_MVP_04',
    name: 'MVP Sprints',
    description: 'Fast, focused builds that take a founder\'s idea from sketch to shippable product.',
  },
  {
    id: 'SIG_API_05',
    name: 'Backend & Auth Systems',
    description: 'Clerk-secured, Supabase-powered systems built for real users from day one, not prototypes.',
  },
  {
    id: 'SIG_OPT_06',
    name: 'Performance Tuning',
    description: 'Core Web Vitals audits, load-time surgery, and technical SEO that compounds traffic over time.',
  },
];

export const ServicesSection: React.FC = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 md:py-32 bg-[var(--color-electric-white)] relative border-t border-[var(--border-light)]">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeader
          eyebrow="/ Signal Lines"
          title="What We Transmit."
          subtext="Every engagement runs on the same current — clarity in, precision out."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => router.push(`/contact?service=${service.id}`)}
              className="group cursor-pointer p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--border-light)] hover:border-[var(--color-lime-green)] shadow-sm hover:shadow-[0_8px_30px_rgb(108,99,255,0.12)] transition-all flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-xs tracking-widest text-[var(--color-electric-indigo)] font-bold uppercase">
                    {service.id}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[var(--color-electric-indigo)] group-hover:bg-[var(--color-lime-green)] transition-colors" />
                </div>
                <h3 className="font-body text-xl font-semibold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-electric-indigo)] transition-colors">
                  {service.name}
                </h3>
                <p className="font-body text-[var(--color-muted)] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                <span className="text-xs font-bold tracking-wider uppercase text-[var(--color-electric-indigo)]">Inquire</span>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-electric-indigo)]"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
