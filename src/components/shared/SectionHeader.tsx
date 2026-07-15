'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtext?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtext, className = '' }: SectionHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`flex flex-col gap-4 ${className}`}
    >
      <motion.span variants={itemVariants} className="label-micro-primary">
        {eyebrow}
      </motion.span>
      <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-6xl text-ink leading-tight italic">
        {title}
      </motion.h2>
      {subtext && (
        <motion.p variants={itemVariants} className="font-body text-muted text-lg max-w-2xl">
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
