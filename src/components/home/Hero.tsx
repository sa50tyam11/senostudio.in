'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import CursorGrid from '../shared/CursorGrid';

const captions = [
  "This website exists because standard templates felt boring.",
  "/ What Powers Us",
  "Engineering by day, more creative by midnight.",
  "Building digital experiences that actually matter."
];

export const Hero: React.FC = () => {
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captions.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100svh] bg-[#F7F6F0] overflow-hidden selection:bg-[#6C63FF] selection:text-[#F7F6F0]">

        {/* Background Soft Glows (Light theme friendly) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
          <div className="w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[100px] rounded-[100%] scale-150 transform -translate-y-10"></div>
          <div className="absolute w-[400px] h-[700px] bg-[#6C63FF]/10 blur-[60px] rounded-[40%] top-0 left-[20%] transform rotate-12"></div>
          <div className="absolute w-[300px] h-[500px] bg-[#84cc16]/10 blur-[70px] rounded-[30%] bottom-0 right-[20%] transform -rotate-12"></div>
        </div>

        {/* Interactive Cursor Grid Background */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
          <CursorGrid
            cellSize={80}
            color="#6C63FF"
            radius={200}
            falloff="smooth"
            holdTime={600}
            fadeDuration={1000}
            lineWidth={1.5}
            maxOpacity={0.6}
            fillOpacity={0.05}
            gridOpacity={0.05}
            cellRadius={0}
            clickPulse={true}
            pulseSpeed={800}
          />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 w-full h-10 md:h-12 flex z-40 border-b-2 border-black font-handwritten text-base md:text-xl">
          <div className="bg-[#111111] text-[#F7F6F0] px-4 md:px-8 py-2 flex items-center border-r-2 border-black w-auto whitespace-nowrap tracking-wide">
            SENO Web Studio
          </div>
          <div className="bg-[#F7F6F0] text-black px-4 md:px-6 py-2 flex-grow flex items-center justify-center border-r-2 border-black text-center whitespace-nowrap overflow-hidden text-ellipsis">
            <AnimatePresence mode="wait">
              <motion.span
                key={captionIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-black font-body text-sm font-semibold tracking-wider"
              >
                {captions[captionIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <a href="#contact" className="bg-[#6C63FF] text-white hover:bg-[#111111] transition-colors px-6 md:px-8 py-2 flex items-center font-body font-bold tracking-widest uppercase text-xs md:text-sm cursor-pointer hidden sm:flex group">
            Start Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-2 transform group-hover:translate-x-1 transition-transform" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>

        <div 
          className="relative z-10 w-full h-full flex flex-col justify-center px-4 md:px-12 pt-16"
        >
          {/* Timeline (Left) */}
          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-16 text-black/90 hidden lg:flex">
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1 font-body font-semibold">Started As</p>
              <p className="font-handwritten text-4xl text-[#6C63FF]">Freelancers</p>
              <div className="absolute left-6 top-16 h-10 border-l-[1.5px] border-dashed border-black/20"></div>
            </div>
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1 font-body font-semibold">Became</p>
              <p className="font-handwritten text-4xl text-[#6C63FF]">Web Agency</p>
              <div className="absolute left-6 top-16 h-10 border-l-[1.5px] border-dashed border-black/20"></div>
            </div>
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/50 mb-1 font-body font-semibold">Currently</p>
              <p className="font-handwritten text-4xl text-[#6C63FF]">Product Studio</p>
            </div>
          </div>

          {/* Central 3D Text */}
          <div className="flex justify-center items-center relative w-full mt-8 md:mt-0 group">
            
            {/* Sticky Note */}
            <motion.div 
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: -8, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-10 md:-top-16 left-[5%] md:left-[18%] bg-[#F7F6F0] text-black p-3 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] border-[1.5px] border-black z-20 w-32 md:w-40 transition-transform group-hover:-rotate-12 group-hover:-translate-y-2 group-hover:-translate-x-2 duration-300"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/60 backdrop-blur-md shadow-sm border border-black/10 rotate-[6deg]"></div>
              <p className="font-bold text-[#6C63FF] text-lg md:text-2xl tracking-tighter">EST. SEPT 2024</p>
              <p className="font-handwritten text-sm md:text-base font-bold text-black/80">India</p>
            </motion.div>

            <motion.h1 
              initial={{ scale: 0.8, opacity: 0, rotate: -8, y: 50 }}
              animate={{ scale: 1, opacity: 1, rotate: -4, y: 0 }}
              whileHover={{ scale: 1.05, rotate: -2, y: -10 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
              className="font-handwritten text-[130px] sm:text-[160px] md:text-[220px] lg:text-[300px] text-[#6C63FF] leading-[0.8] tracking-tighter text-3d-logo z-10 select-none pl-4 md:pl-0 -mt-10 md:-mt-20 cursor-default"
            >
              seno
            </motion.h1>

            {/* Right Graph Graphic */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute right-[2%] lg:right-[4%] xl:right-[10%] top-[10%] lg:top-[20%] flex flex-col items-end hidden lg:flex z-20 transition-transform group-hover:translate-x-4 duration-300"
            >
              <p className="text-black text-base mb-1 font-body font-semibold">Engineering by day,</p>
              <div className="flex items-end gap-2 text-black">
                <span className="font-handwritten text-5xl">more creative</span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="font-handwritten text-4xl text-black">by</span>
                <span className="bg-[#111111] text-[#F7F6F0] font-bold text-2xl px-3 py-1 rotate-2 shadow-[4px_4px_0px_#6C63FF] border-2 border-[#111111] font-body">
                  midnight.
                </span>
              </div>
              
              {/* Simple Line Graph */}
              <div className="mt-8 flex items-end gap-4 relative">
                <div className="h-16 border-l-2 border-b-2 border-black/30 w-40 relative">
                  {/* SVG Curve */}
                  <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 0 45 Q 60 45, 100 0" fill="none" stroke="#111111" strokeWidth="2.5" />
                    <circle cx="100" cy="0" r="5" fill="#111111" className="drop-shadow-lg" />
                    <circle cx="100" cy="0" r="2" fill="#6C63FF" />
                  </svg>
                </div>
                <div className="absolute -bottom-6 left-2 text-[10px] text-black/50 tracking-widest font-mono font-bold">09:00</div>
                <div className="absolute -bottom-6 -right-2 text-[10px] text-black/50 tracking-widest font-mono font-bold">00:00</div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Navigation Element */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 z-30 w-full max-w-2xl px-4"
          >
            <button className="border-2 border-black bg-[#111111] text-[#F7F6F0] text-xs md:text-sm tracking-[0.2em] font-bold uppercase px-6 md:px-8 py-3 hover:bg-[#6C63FF] hover:text-white transition-colors font-body z-10 relative">
              Go On, Scroll Down
            </button>
            
            {/* Hand-drawn style arrow pointing down to nav */}
            <svg width="24" height="30" viewBox="0 0 24 30" fill="none" className="-mt-1 mb-1 text-black">
              <path d="M12 2v20M12 24l-5-5M12 24l5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            <div className="bg-[#F7F6F0] border-4 border-black p-2 md:p-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] md:shadow-[10px_10px_0px_rgba(0,0,0,1)] w-full sm:w-auto relative z-20">
              <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-8 font-handwritten text-xl md:text-2xl font-bold px-2 md:px-6">
                <li>
                  <Link href="/" className="bg-[#6C63FF] text-white px-4 md:px-5 py-1 block hover:scale-[1.03] transition-transform shadow-[2px_2px_0px_#000] border-2 border-black">Home</Link>
                </li>
                <li>
                  <Link href="/services" className="text-black hover:text-[#6C63FF] transition-colors">Services</Link>
                </li>
                <li>
                  <Link href="/work" className="text-black hover:text-[#6C63FF] transition-colors">Work</Link>
                </li>
                <li>
                  <Link href="/about" className="text-black hover:text-[#6C63FF] transition-colors">About</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-black hover:text-[#6C63FF] transition-colors">Contact</Link>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
    </section>
  );
};
