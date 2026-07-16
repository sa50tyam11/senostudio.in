'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    name: 'Interface Engineering',
    description: 'Pixel-precise Next.js interfaces built for fluid motion & layout fidelity.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Full-Stack Builds',
    description: 'End-to-end apps pairing React frontends with Supabase-backed backends.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Motion & Visual',
    description: 'Framer Motion-driven interactions engineered for intentional experiences.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'MVP Sprints',
    description: 'Fast, focused builds that take ideas from sketch to shippable product.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Backend & Systems',
    description: 'Secure, scalable auth & database systems built for real users from day one.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'
  },
];

export const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the image
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Center the image on the cursor (width 260px, height 360px)
    mouseX.set(e.clientX - 130);
    mouseY.set(e.clientY - 180);
  };

  return (
    <section 
      className="py-24 md:py-32 bg-gradient-to-br from-[#FFF9F2] via-[#F6F7F0] to-[#EAF2EC] relative border-t border-[var(--border-light)] overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Floating Image Preview */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ x, y }}
            className="fixed top-0 left-0 w-[260px] h-[360px] pointer-events-none z-50 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hidden md:block"
          >
            <Image 
              src={services[hoveredIndex].image} 
              alt={services[hoveredIndex].name}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="mb-20">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#0a0a0a]">
             Engineering Excellence
           </h2>
        </div>

        <div className="w-full flex flex-col border-t border-black/20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group border-b border-black/20 flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-14 cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial="initial"
              whileHover="hover"
            >
              {/* Title with Roll-up effect */}
              <div className="relative overflow-hidden h-[40px] md:h-[50px] flex items-center md:w-1/2">
                <motion.div 
                  className="absolute inset-0 flex items-center text-3xl md:text-4xl font-extrabold tracking-tight text-black"
                  variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {service.name}
                </motion.div>
                <motion.div 
                  className="absolute inset-0 flex items-center text-3xl md:text-4xl font-extrabold tracking-tight text-black"
                  variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {service.name}
                </motion.div>
              </div>

              {/* Description */}
              <div className="mt-4 md:mt-0 md:w-1/2 md:text-right">
                <p className="text-[#333] text-lg md:text-xl font-normal md:ml-auto">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
