'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Radio, Cpu, Zap, Monitor } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The horizontal line progress
  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const steps = [
    {
      num: '01',
      codename: 'Signal',
      label: 'Discovery',
      desc: 'We pick up the real signal — your goals, users, and constraints — before writing a single line of code.',
      icon: <Radio className="w-5 h-5 text-[#2A4737]" strokeWidth={1.5} />,
      progressStart: 0.05,
      progressEnd: 0.25
    },
    {
      num: '02',
      codename: 'Circuit',
      label: 'Architecture & Strategy',
      desc: 'We wire the core logic: tech stack, data flow, and the paths users will actually travel.',
      icon: <Cpu className="w-5 h-5 text-[#2A4737]" strokeWidth={1.5} />,
      progressStart: 0.25,
      progressEnd: 0.45
    },
    {
      num: '03',
      codename: 'Charge',
      label: 'Development',
      desc: 'Full power to the build — interface, backend, and motion, all running in one continuous current.',
      icon: <Zap className="w-5 h-5 text-[#2A4737]" strokeWidth={1.5} />,
      progressStart: 0.45,
      progressEnd: 0.65
    },
    {
      num: '04',
      codename: 'Output',
      label: 'Launch & Iteration',
      desc: 'We switch it on, measure what happens, and keep tuning the signal until the metrics move.',
      icon: <Monitor className="w-5 h-5 text-[#2A4737]" strokeWidth={1.5} />,
      progressStart: 0.65,
      progressEnd: 0.85
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-gradient-to-br from-[#FFF9F2] via-[#F6F7F0] to-[#EAF2EC]" 
      id="process"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
        
        {/* Header */}
        <div className="text-center mb-24 md:mb-32 relative z-10 px-6">
          <p className="text-[#3E6150] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center justify-center gap-3">
            <span className="text-[#3E6150] font-light">/</span> HOW CURRENT FLOWS
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-instrument text-[#1C362B] tracking-tight">
            From Signal to Output.
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative">
          
          {/* Background Line (Desktop only) */}
          <div className="hidden md:block absolute top-8 left-[64px] w-[calc(75%-16px)] h-[1px] bg-[#E5E3DB]" />
          
          {/* Animated Green Line (Desktop only) */}
          <motion.div 
            className="hidden md:block absolute top-8 left-[64px] h-[1px] bg-[#3E6150] origin-left z-0"
            style={{ width: lineWidth, maxWidth: 'calc(75% - 16px)' }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {steps.map((step, idx) => (
              <StepComponent 
                key={idx} 
                step={step} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function StepComponent({ step, scrollYProgress }: any) {
  const { progressStart, progressEnd } = step;

  // Icon animations
  const iconOpacity = useTransform(scrollYProgress, [progressStart, progressEnd], [0.3, 1]);
  const iconScale = useTransform(scrollYProgress, [progressStart, progressEnd], [0.8, 1]);
  const iconBorder = useTransform(scrollYProgress, [progressStart, progressEnd], ["rgba(229, 227, 219, 1)", "rgba(62, 97, 80, 0.4)"]);
  const iconBg = useTransform(scrollYProgress, [progressStart, progressEnd], ["rgba(253, 251, 247, 1)", "rgba(253, 251, 247, 1)"]);

  // Content animations
  const contentOpacity = useTransform(scrollYProgress, [progressStart, progressEnd], [0, 1]);
  const contentY = useTransform(scrollYProgress, [progressStart, progressEnd], [20, 0]);

  return (
    <div className="relative flex flex-col items-center md:items-start">
      {/* Icon Circle */}
      <motion.div 
        className="w-16 h-16 rounded-full flex items-center justify-center relative z-10 mb-8 border shadow-sm bg-white"
        style={{ 
          opacity: iconOpacity,
          scale: iconScale,
          borderColor: iconBorder,
          backgroundColor: iconBg
        }}
      >
        {step.icon}
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ 
          opacity: contentOpacity, 
          y: contentY 
        }}
        className="text-center md:text-left pr-0 md:pr-4"
      >
        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
          <span className="text-[#3E6150]/40 text-xl font-instrument italic">{step.num}</span>
          <h3 className="text-[#1C362B] text-3xl md:text-2xl lg:text-3xl font-instrument">{step.codename}</h3>
        </div>
        <p className="text-[#3E6150]/60 text-[10px] uppercase tracking-widest font-bold mb-3">{step.label}</p>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[260px] mx-auto md:mx-0">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}
