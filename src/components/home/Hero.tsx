'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SignalLine } from '../shared/SignalLine';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-[var(--color-electric-white)]">
      {/* Background Signal Motif */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <SignalLine width="100%" height={300} amplitude={50} speed={4} animate={true} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--color-electric-indigo)]"></span>
            <span className="label-micro-primary">/ SENO STUDIO</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="font-display italic text-5xl md:text-7xl lg:text-[7rem] text-[var(--color-ink)] leading-[0.95] tracking-tight mb-8"
          >
            Let&apos;s put a charge<br />
            through your next idea.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants} 
            className="font-body text-lg md:text-xl text-[var(--color-muted)] max-w-2xl leading-relaxed mb-12"
          >
            SENO Studio designs and engineers fast, precise web experiences for founders and teams who don&apos;t want to wait for their website to catch up to their ambition.
          </motion.p>

          {/* Contact Line */}
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <a 
              href="mailto:hello@senostudio.in" 
              className="group flex items-center gap-4 text-[var(--color-ink)] hover:text-[var(--color-electric-indigo)] transition-colors"
            >
              <span className="w-12 h-12 rounded-full border border-[var(--color-ink)] group-hover:border-[var(--color-electric-indigo)] flex items-center justify-center transition-colors">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                  <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-body font-medium uppercase tracking-widest text-sm">hello@senostudio.in</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Divider */}
      <motion.div 
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }} 
        transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 right-0 origin-left"
      >
        <SignalLine width="100%" height={1} showDot={true} />
      </motion.div>
    </section>
  );
};
