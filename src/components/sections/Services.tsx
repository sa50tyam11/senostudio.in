import React from 'react';
import { motion } from 'framer-motion';

export function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-instrument italic mb-20 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built for performance. Designed for results.
        </motion.h2>

        <div className="space-y-16">
          {/* Block 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1 glass-panel rounded-3xl h-80 flex items-center justify-center p-8 overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Abstract Visual Placeholder */}
              <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10 blur-xl" />
              </div>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl text-white mb-4">Designed to convert</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                We create modern, clean interfaces that build trust and turn visitors into clients.
              </p>
            </motion.div>
          </div>

          {/* Block 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-1 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl text-white mb-4">Full-stack development</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                Frontend, backend, and deployment — everything handled by our team.
              </p>
            </motion.div>

            <motion.div 
              className="order-2 md:order-2 glass-panel rounded-3xl h-80 flex items-center justify-center p-8 overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
               {/* Abstract Visual Placeholder */}
               <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-end justify-end p-4">
                 <div className="w-1/2 h-1/2 rounded-tl-xl border-t border-l border-white/20 bg-white/5" />
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
