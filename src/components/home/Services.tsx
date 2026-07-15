'use client';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MonitorSmartphone, LayoutGrid, Cpu, Code, Server, TrendingUp } from 'lucide-react';
import { services } from '../../lib/content';
import { fadeUp, staggerContainer } from '../../lib/motion-variants';

const icons = [
  MonitorSmartphone,
  LayoutGrid,
  Cpu,
  Code,
  Server,
  TrendingUp,
];

const ServiceCard = ({ service, index, prefersReduced }: any) => {
  const Icon = icons[index % icons.length];
  const [isHovered, setIsHovered] = useState(false);
  const anim = prefersReduced ? 'rest' : 'hover';
  
  // Bento grid logic: index 0 -> 1 col, index 1 -> 2 cols, index 2 -> 2 cols, index 3 -> 1 col, etc.
  const spanClass = index % 4 === 0 || index % 4 === 3 ? 'md:col-span-1' : 'md:col-span-2';
  
  return (
    <motion.div 
      className={`relative flex flex-col rounded-[2rem] p-8 md:p-10 overflow-hidden cursor-pointer ${spanClass}`}
      style={{
        backgroundColor: 'var(--color-sand)',
        border: '1px solid var(--border-light)',
        borderColor: isHovered ? 'var(--color-violet)' : 'var(--border-light)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: prefersReduced ? 0 : -4, boxShadow: '0 10px 40px -10px rgba(139, 108, 255, 0.15)' }}
      transition={{ duration: 0.3 }}
      variants={fadeUp}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Faint gradient overlay to fade grid at bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--color-sand) 90%)`
        }} 
      />

      {/* Content wrapper to stay above grid */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar with Icon and Coords */}
        <div className="flex justify-between items-start mb-12 md:mb-16">
          <Icon className="w-7 h-7 md:w-8 md:h-8 stroke-[1.5]" style={{ color: 'var(--color-muted)' }} />
          <div className="flex flex-col items-end text-[8px] md:text-[9px] tracking-[0.2em] font-mono uppercase" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>
            <span>COORD_X: {(index + 1) * 10}</span>
            <span>COORD_Y: {(index + 1) * 25}</span>
          </div>
        </div>

        {/* Status line */}
        <div className="flex items-center gap-3 md:gap-4 mb-4 text-[9px] md:text-[10px] tracking-widest font-semibold uppercase">
          <span style={{ color: 'var(--color-violet)' }}>/ {service.id}</span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: 'var(--border-light)' }} />
          <span style={{ color: 'var(--color-muted)', opacity: 0.6 }}>STATUS: READY</span>
        </div>

        {/* Title & Desc */}
        <h3 className="font-instrument text-[2rem] md:text-[2.5rem] leading-[1.1] mb-4" style={{ color: 'var(--color-ink)' }}>
          {service.name}
        </h3>
        <p className="font-body font-light text-sm md:text-base leading-relaxed max-w-[95%] mb-12" style={{ color: 'var(--color-muted)' }}>
          {service.description}
        </p>

        {/* Action Button Space */}
        <div className="mt-auto h-12" />

        {/* Action Button Absolute to bottom right */}
        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex items-end justify-end">
          <motion.div 
            className="flex items-center justify-center rounded-full overflow-hidden"
            animate={{
              width: isHovered ? 130 : 48,
              height: 48,
              backgroundColor: isHovered ? 'var(--color-violet)' : 'var(--color-sand)',
              borderColor: isHovered ? 'var(--color-violet)' : 'var(--border-light)'
            }}
            style={{
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {isHovered ? (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[9px] tracking-widest whitespace-nowrap px-4 font-semibold uppercase"
                style={{ color: 'var(--color-ivory)' }}
              >
                CHAT WITH US
              </motion.span>
            ) : (
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }} />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const anim = prefersReduced ? 'reducedMotion' : 'visible';

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-8"
      style={{ backgroundColor: 'var(--color-ivory)' }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16 md:mb-24">
          <div className="flex-1">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="h-[1px] w-8 md:w-12" style={{ backgroundColor: 'var(--color-violet)', opacity: 0.3 }} />
              <span className="text-[10px] md:text-xs tracking-[0.2em] font-semibold uppercase" style={{ color: 'var(--color-violet)' }}>
                / SERVICES
              </span>
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              id="services-heading"
              className="font-instrument text-[3.25rem] sm:text-[4rem] md:text-[5.5rem] leading-[0.95] tracking-tight"
              style={{ color: 'var(--color-ink)' }}
            >
              What We<br />
              <span className="italic" style={{ color: 'var(--color-violet)' }}>Transmit.</span>
            </motion.h2>
          </div>
          
          <div className="md:w-[40%] flex items-end">
            <motion.div 
              variants={fadeUp}
              className="rounded-[1.5rem] p-6 md:p-8"
              style={{ backgroundColor: 'var(--color-sand)' }}
            >
              <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                We build structural foundations that scale naturally, bridging the gap between artistic vision and technical precision.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((svc, idx) => (
            <ServiceCard 
              key={svc.id} 
              service={svc} 
              index={idx} 
              prefersReduced={prefersReduced} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
