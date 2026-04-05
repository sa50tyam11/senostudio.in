import React from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  const stats = [
    "10+ Projects Delivered",
    "Multiple Industries Served",
    "Global Client Exposure",
    "End-to-End Development"
  ];

  return (
    <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-12 text-center sm:text-left">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat}
            className="flex-1 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="text-xl md:text-2xl font-instrument italic text-white/80">
              {stat}
            </div>
            <div className="w-12 h-px bg-white/20 mt-4 mx-auto sm:mx-0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
