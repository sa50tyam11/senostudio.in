'use client';
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { closingCta } from "../../lib/content";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  EASE_SIGNAL,
} from "../../lib/motion-variants";

export const ClosingCTA: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const animState = prefersReduced ? "reducedMotion" : "visible";

  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 md:px-8"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView={animState}
          viewport={{ once: true, margin: "-80px" }}
          className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#0D0B17] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center p-10 md:p-16 lg:p-20 gap-16 md:gap-8"
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#5C4DFF]/10 blur-[100px]" />
            
            {/* SVG Background Rings (like the image) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <circle cx="200" cy="800" r="400" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="800" cy="200" r="600" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Left Column: Copy & CTA */}
          <div className="relative z-10 flex-1 flex flex-col items-start text-left gap-6">
            <motion.div variants={fadeIn} className="flex items-center gap-3">
              <span className="text-emerald-400 text-xs font-bold tracking-[0.2em] uppercase">
                Let's build something great
              </span>
            </motion.div>

            <motion.h2 
              variants={fadeUp}
              className="font-instrument italic text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white"
            >
              Ready to start your<br />next project?
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-4">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-lg"
              >
                Get started
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Booking Card */}
          <motion.div 
            variants={fadeUp}
            className="relative z-10 w-full md:w-[420px] shrink-0"
          >
            {/* The Glass Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              
              {/* Fake Cursor */}
              <motion.div 
                initial={{ x: 20, y: 20, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="absolute -right-4 top-1/2 flex items-start z-20 pointer-events-none"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg -rotate-12">
                  <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L6.35 3.21a.5.5 0 0 0-.85.35Z" fill="#000000" stroke="white" strokeWidth="1.5"/>
                </svg>
                <div className="bg-[#5C4DFF] text-white text-[10px] font-bold px-2.5 py-1 rounded-full mt-5 ml-1 shadow-lg">
                  SATYAM
                </div>
              </motion.div>

              {/* Status */}
              <div className="flex items-center gap-2 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-gray-400 text-xs font-semibold tracking-wider uppercase">
                  Available for project
                </span>
              </div>

              {/* Avatars */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1A1A24] bg-white">
                    <Image src="/seno-logo.jpg" alt="SENO Studio" width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#2A2A35] border-2 border-[#1A1A24] flex items-center justify-center text-white text-xs font-medium">
                    You
                  </div>
                </div>
              </div>

              {/* Card Text */}
              <div className="mb-8">
                <h3 className="text-white text-2xl font-instrument italic font-semibold mb-2">
                  Quick 15-minute call
                </h3>
                <p className="text-gray-400 text-sm">
                  Pick a time that works for you.
                </p>
              </div>

              {/* Card Button */}
              <a 
                href="/contact" 
                className="flex items-center justify-center w-full bg-emerald-400 text-black px-6 py-3.5 rounded-2xl text-sm font-semibold hover:bg-emerald-300 transition-colors"
              >
                Book a free call
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ClosingCTA;
