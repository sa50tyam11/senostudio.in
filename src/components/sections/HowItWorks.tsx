import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export function HowItWorks() {
  const steps = [
    { num: '01', title: 'You share your idea', txt: 'Tell us your vision and goals.' },
    { num: '02', title: 'We design & develop', txt: 'Iterative, transparent progress.' },
    { num: '03', title: 'We launch your website', txt: 'Deployment & optimizations.' }
  ];

  return (
    <section id="process" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-instrument italic mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Clear process. Reliable delivery.
          </motion.h2>
          <motion.p 
            className="text-white/60 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We handle everything from idea to deployment so you don't deal with technical complexity.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card className="h-full flex flex-col justify-between group">
                <div className="mb-12">
                  <span className="text-5xl font-instrument italic text-white/20 group-hover:text-white/40 transition-colors">
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.txt}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
