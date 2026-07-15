import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MessageSquare, Layers, Sparkles, Code2, Workflow } from 'lucide-react';

export function Services() {
  return (
    <section id="benefits" className="py-32 px-6 bg-[#030303] relative overflow-hidden border-y border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-6xl font-instrument italic mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The SENO Advantage
          </motion.h2>
          <motion.p 
            className="text-white/60 text-lg max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Where high-fidelity design meets uncompromising performance engineering. This is how we deliver real authority for every client.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] gap-6">
          
          {/* 1. Architecture First (Tall Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 md:row-span-2 rounded-[2rem] bg-neutral-900 border border-white/5 p-8 relative overflow-hidden group flex flex-col justify-end"
          >
            {/* Decorative Top Element */}
            <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-500">
              <Compass className="w-6 h-6" />
            </div>
            {/* Abstract visual background */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-b from-white/5 to-transparent rounded-full blur-3xl group-hover:translate-x-4 transition-transform duration-700" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-medium text-white mb-3">Architecture-First</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Every decision is rooted in clarity and scalable logic, not guesswork. We build technical foundations designed to dominate.
              </p>
            </div>
          </motion.div>

          {/* 2. Uncompromising Quality (Red Square, Middle Top) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-red-600 to-red-900 p-8 relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <h3 className="text-2xl font-medium text-white leading-tight">Elite Quality,<br />Always</h3>
              <p className="text-white/80 text-sm font-medium">
                We take on fewer projects to deliver uncompromising outcomes.
              </p>
            </div>
            {/* Subtle glow effect */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
          </motion.div>

          {/* 3. Bespoke Solutions (Tall Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 rounded-[2rem] bg-neutral-900 border border-white/5 p-8 relative overflow-hidden group flex flex-col"
          >
            <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-medium text-white mb-3">Bespoke Orchestration</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                No templates. No cut corners. Every interface and backend is mapped meticulously to your specific conversion metrics.
              </p>
            </div>

            {/* Mockup / Abstract Visual */}
            <div className="flex-1 mt-auto bg-black/50 border border-white/10 rounded-2xl relative overflow-hidden group-hover:border-red-500/30 transition-colors duration-500">
               {/* UI Lines simulating code/design */}
               <div className="absolute inset-x-4 top-6 h-2 bg-white/5 rounded-full" />
               <div className="absolute inset-x-4 top-12 h-2 w-2/3 bg-red-500/20 rounded-full" />
               <div className="absolute inset-x-4 top-18 h-2 w-4/5 bg-white/5 rounded-full" />
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500/10 blur-xl" />
            </div>
          </motion.div>

          {/* 4. Priority Support (Dark Square, Middle Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 relative overflow-hidden flex flex-col justify-center"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-instrument italic text-white mb-1">24/7</h3>
              <p className="text-white/50 text-sm">Direct Developer Access</p>
            </div>

            {/* Mock Support Ticket Element */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 bg-white text-black p-3 pr-6 rounded-xl shadow-2xl flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none mb-1">SENO Core</p>
                <p className="text-[10px] text-black/60 uppercase tracking-wider font-semibold">Priority Channel</p>
              </div>
            </div>
          </motion.div>

          {/* 5. Collaborative Process (Wide Bottom Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-neutral-900 border border-white/5 p-8 relative overflow-hidden group flex items-end"
          >
            {/* Placeholder for future background image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
            
            <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <h3 className="text-3xl font-medium text-white mb-2">Transparent Process</h3>
                <p className="text-white/50 text-sm max-w-sm">
                  We build alongside you, not just for you. Continuous deployment and rapid feedback loops.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-red-500 group-hover:border-red-500/30 transition-all duration-300">
                <Workflow className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* 6. Form Meets Function (Square Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-[#111] border border-white/5 p-8 relative overflow-hidden group"
          >
            <div className="flex gap-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500/50" />
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-red-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Form & Function</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Stunning aesthetics engineered with ruthless backend efficiency.
            </p>

            {/* Abstract floating elements simulating polaroids/cards */}
            <div className="absolute -bottom-6 -right-6 w-32 h-24 bg-neutral-800 border border-white/10 rounded-lg rotate-[-10deg] group-hover:rotate-[-5deg] transition-transform duration-500 shadow-2xl" />
            <div className="absolute -bottom-8 -right-2 w-32 h-24 bg-neutral-700 border border-white/10 rounded-lg rotate-[5deg] group-hover:rotate-[10deg] transition-transform duration-500 shadow-2xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}