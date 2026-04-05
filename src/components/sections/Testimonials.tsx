import React from 'react';
import { motion } from 'framer-motion';

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white/[0.01] border-y border-white/5 text-center">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <div className="text-3xl md:text-4xl font-instrument italic text-white/40 leading-snug">
            "We are focused on building long-term client relationships."
          </div>
          <div className="text-white/30 text-sm tracking-[0.2em] uppercase font-bold mt-8">
            • Testimonials coming soon •
          </div>
        </motion.div>
      </div>
    </section>
  );
}
