import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export function FeaturesGrid() {
  const features = [
    { title: "Fast Delivery", text: "Get your website ready in days, not weeks." },
    { title: "Full-Stack Expertise", text: "Complete development solution in one place." },
    { title: "Fully Responsive", text: "Optimized for all devices." },
    { title: "Dedicated Support", text: "Direct communication and ongoing support." }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-full bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
              <h4 className="text-white text-lg mb-3">{feat.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{feat.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
