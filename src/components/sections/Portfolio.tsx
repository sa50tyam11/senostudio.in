import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function Portfolio() {
  const projects = [
    {
      name: "Soft Campus",
      desc: "Global educational platform operating in India, Russia, USA, and Armenia.",
      tech: "React, Node.js, Next.js, Tailwind",
      img: "bg-neutral-800"
    },
    {
      name: "Bangle Store",
      desc: "E-commerce platform with seamless payment integrations and aesthetic minimal design.",
      tech: "Next.js, Stripe, Tailwind CSS",
      img: "bg-neutral-900"
    },
    {
      name: "Architect Portfolio",
      desc: "High-performance dynamic portfolio showcasing modern architectural works.",
      tech: "Vite, React, Framer Motion",
      img: "bg-[length:200%_200%] bg-gradient-to-tr from-stone-900 to-black"
    }
  ];

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-instrument italic mb-16 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Work
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <Card className="p-0 overflow-hidden flex flex-col h-full bg-white/[0.02]">
                {/* Image Placeholder */}
                <div className={`h-56 w-full ${proj.img} relative border-b border-white/10 flex items-center justify-center`}>
                   <span className="text-white/20 font-instrument italic text-xl">{proj.name} Preview</span>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl text-white mb-2 font-instrument italic">{proj.name}</h3>
                  <p className="text-white/50 text-sm mb-6 flex-1 leading-relaxed">
                    {proj.desc}
                  </p>
                  
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-widest text-white/30 mb-2 font-semibold">Tech Stack</p>
                    <p className="text-sm text-white/60">{proj.tech}</p>
                  </div>
                  
                  <Button variant="glass" className="w-full">View Project</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
