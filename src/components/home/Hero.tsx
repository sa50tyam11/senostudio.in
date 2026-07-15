'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>();
  const targetTime = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Optimize video scrubbing with requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Load video metadata to ensure we have the duration
    const handleLoadedMetadata = () => {
      // Initialize to frame 0
      video.currentTime = 0;
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const updateVideoTime = () => {
      if (video && video.duration) {
        // Smoothly interpolate current time towards target time
        // The lerp factor (0.1) dictates how smooth/laggy the scrub feels
        // We use a small factor to make it feel cinematic and hide raw scroll jitter
        const diff = targetTime.current - video.currentTime;
        // Avoid NaN and ensure it doesn't try to scrub infinitely small amounts
        if (!isNaN(diff) && Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.1;
        }
      }
      requestRef.current = requestAnimationFrame(updateVideoTime);
    };

    // Unsubscribe from scroll progress to update targetTime
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (video && video.duration) {
        targetTime.current = latest * video.duration;
      }
    });

    requestRef.current = requestAnimationFrame(updateVideoTime);

    return () => {
      unsubscribe();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [scrollYProgress]);

  // Framer Motion transforms mapped to scrollYProgress
  // Phase 1 (0-15%) & Phase 2 (15-45%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.45], [0, -100]);


  // Scroll Indicator (0-15%)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#0D0B17]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-[100svh] overflow-hidden bg-[#0D0B17]">
        {/* Video Background */}
        <video
          ref={videoRef}
          src="/hero3.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic Overlays */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            background: 'radial-gradient(circle at center, rgba(13, 11, 23, 0.4) 0%, rgba(13, 11, 23, 0.1) 35%, rgba(13, 11, 23, 0.7) 100%)'
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(13, 11, 23, 0.3) 0%, transparent 20%, transparent 60%, rgba(13, 11, 23, 0.8) 100%)'
          }}
        />

        {/* Phase 1: Arrival (Main Hero Copy) - Visible only at start */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
        >
          <div className="max-w-4xl pointer-events-auto mt-20 relative">
            {/* Subtle radial glow specifically behind the text block to decouple it from background brightness */}
            <div className="absolute inset-0 bg-black/20 blur-[120px] -z-10 rounded-full scale-150" />
            
            <h1 
              className="font-display italic text-5xl md:text-7xl lg:text-[8rem] text-[#FFF9F0] leading-[0.95] tracking-tight mb-8"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
            >
              SENO.
            </h1>
            <p 
              className="font-body text-lg md:text-xl text-[#FFF9F0] tracking-[0.2em] mb-12 uppercase font-semibold"
              style={{ textShadow: '0 2px 15px rgba(0,0,0,0.6)' }}
            >
              Digital Product Studio
            </p>
            <p 
              className="font-body text-base md:text-lg text-[#FFF9F0]/95 max-w-xl mx-auto mb-12 leading-relaxed font-medium"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              We design and engineer digital experiences for ambitious ideas.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a 
                href="/work" 
                className="group flex items-center gap-3 text-[#FFF9F0] hover:text-[var(--color-electric-indigo)] transition-colors"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
              >
                <span className="font-body font-bold uppercase tracking-widest text-sm">View Work</span>
                <span className="w-8 h-8 rounded-full border border-[#FFF9F0]/40 group-hover:border-[var(--color-electric-indigo)] flex items-center justify-center transition-colors backdrop-blur-md bg-black/20">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
              
              <a 
                href="/contact" 
                className="group flex items-center gap-3 text-[#FFF9F0] hover:text-[var(--color-electric-indigo)] transition-colors"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
              >
                <span className="font-body font-bold uppercase tracking-widest text-sm">Start a Project</span>
                <span className="w-8 h-8 rounded-full border border-[#FFF9F0]/40 group-hover:border-[var(--color-electric-indigo)] flex items-center justify-center transition-colors backdrop-blur-md bg-black/20">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </motion.div>


        {/* Initial Scroll Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-4 pointer-events-none z-10"
        >
          <span 
            className="font-body text-[10px] uppercase tracking-[0.2em] text-[#FFF9F0]/80 font-bold"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            Scroll to enter
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFF9F0]/80 to-transparent drop-shadow-lg"></div>
        </motion.div>

      </div>
    </section>
  );
};
