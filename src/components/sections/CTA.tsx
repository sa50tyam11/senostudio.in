import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function CTA() {
  return (
    <section id="contact" className="py-40 px-6 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
        <motion.h2 
          className="text-5xl md:text-7xl font-instrument italic mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let's build something that works.
        </motion.h2>

        <motion.p 
          className="text-white/60 text-lg sm:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tell us your idea — we'll handle the design and development.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="primary">Contact Us</Button>
          <Button variant="glass">View Pricing</Button>
        </motion.div>
      </div>
    </section>
  );
}
