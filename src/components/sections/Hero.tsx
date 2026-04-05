import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-black -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge className="mb-8 border border-white/20">Full-Stack Web Development Team — SENO</Badge>
        </motion.div>

        <motion.h1 
          className="text-6xl sm:text-7xl md:text-8xl font-instrument italic mb-8 leading-[0.9] tracking-tight text-white"
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        >
          We Build Websites That Grow Your Business
        </motion.h1>

        <motion.p 
          className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          A small, focused team delivering high-performance websites and custom solutions. Trusted by startups and companies with global reach.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Button variant="primary">Start Your Project</Button>
          <Button variant="glass">View Work</Button>
        </motion.div>

        <motion.div 
          className="p-4 rounded-xl glass-panel text-sm text-white/50 border border-white/5 inline-flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>10+ projects delivered • Worked with globally operating clients like Soft Campus • Fast turnaround</span>
        </motion.div>
      </div>
    </section>
  );
}
