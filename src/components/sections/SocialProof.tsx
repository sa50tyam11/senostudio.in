import React from 'react';
import { motion } from 'framer-motion';

export function SocialProof() {
  return (
    <section className="py-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p 
          className="text-white/40 mb-10 text-sm uppercase tracking-widest font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projects delivered for:
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {[
            "Soft Campus (operating in India, Russia, USA, Armenia)",
            "Local businesses",
            "Startups & personal brands"
          ].map((client, idx) => (
            <motion.div
              key={client}
              className="text-xl sm:text-2xl font-light text-white/70 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              • {client}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
