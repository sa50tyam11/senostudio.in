import React from 'react';
import { motion } from 'framer-motion';

export function ProcessSection() {
  const steps = [
    { num: '01', title: 'Strategic Discovery', desc: 'We initiate with a comprehensive forensic breakdown of your business objectives, technical constraints, and competitive landscape to engineer a bulletproof architecture.' },
    { num: '02', title: 'Visual Architecture', desc: 'Our design and engineering core crafts high-fidelity, luxury-standard interfaces mapped meticulously to user psychology and rigorous conversion metrics.' },
    { num: '03', title: 'Deployment & Scale', desc: 'We construct your digital infrastructure using next-generation frontend frameworks and secure, rapidly scalable backend ecosystems.' }
  ];

  return (
    <section id="process" className="py-24 md:py-40 relative border-t border-white/5 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-24 relative z-10">
          
          {/* Left Column: Sticky Title */}
          <div className="md:col-span-5 lg:col-span-5 relative">
            <div className="md:sticky md:top-40 mb-4 md:mb-0">
               <motion.span 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="text-emerald-400 font-medium tracking-widest text-sm mb-4 flex items-center gap-4 uppercase"
               >
                 <span className="w-12 h-[1px] bg-emerald-500/50 block"></span>
                 Our Methodology
               </motion.span>
               <motion.h2 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-5xl md:text-7xl lg:text-8xl font-instrument italic leading-none drop-shadow-xl"
               >
                 Precision <br/> Engineering.
               </motion.h2>
               <motion.p
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="mt-8 text-gray-400 font-light max-w-sm text-lg leading-relaxed hidden md:block"
               >
                 We refuse to rely on templates. Every project is a bespoke orchestration of ruthless performance and uncompromising aesthetic value.
               </motion.p>
            </div>
          </div>

          {/* Right Column: Scrolling Process List */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group relative py-12 md:py-16 border-t border-white/10 hover:border-emerald-500/40 transition-colors duration-500"
              >
                {/* Hover Line Highlight */}
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-20"></div>

                {/* Huge Background Number Revealed on Hover */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-instrument italic leading-none text-emerald-500/[0.00] group-hover:text-emerald-500/[0.08] transition-colors duration-700 pointer-events-none select-none mix-blend-screen">
                   {step.num}
                </div>

                <div className="relative z-10 pr-12 md:pr-0">
                  <span className="text-emerald-400/80 font-medium tracking-widest text-sm mb-4 block group-hover:text-emerald-400 transition-colors duration-300">PHASE {step.num}</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-instrument italic mb-6 text-white group-hover:text-emerald-50 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light max-w-xl group-hover:text-gray-300 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
