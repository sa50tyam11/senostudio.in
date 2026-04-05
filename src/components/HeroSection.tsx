import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';


export function HeroSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const controls = useAnimation();
  const { scrollY } = useScroll();

  // 3D Parallax Video effect
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const scale = useTransform(scrollY, [0, 1000], [1.05, 1.15]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [isInView, controls]);


  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemBlur: any = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const itemFade: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Cinematic Looping Video Background with Parallax */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover saturate-[1.2] contrast-[1.1] brightness-[1.1]">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4" type="video/mp4" />
        </video>
        {/* Elegant vignette and subtle bottom fade for text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-0 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-0 pointer-events-none" />
        {/* Mobile readability overlay */}
        <div className="absolute inset-0 bg-black/40 lg:hidden pointer-events-none" />
      </motion.div>

      {/* Dynamic Glowing Accents - Optimized for scroll framerate (No CSS blur, No mix-blend) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[20%] left-[30%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25)_0,transparent_60%)] animate-glow-pulse [animation-delay:-2s] will-change-transform translate-z-0" />
        <div className="absolute top-[40%] right-[20%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.25)_0,transparent_60%)] animate-glow-pulse will-change-transform translate-z-0" />
        <div className="absolute bottom-[-10%] left-[40%] w-[1000px] h-[1000px] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0,transparent_60%)] animate-glow-pulse [animation-delay:-4s] will-change-transform translate-z-0" />
      </div>

      {/* AGENCY METADATA CORNERS */}
      <div className="absolute inset-x-8 top-32 flex justify-between z-20 pointer-events-none text-white/40 uppercase tracking-[0.3em] text-[10px] sm:text-xs mix-blend-screen hidden md:flex">
        <p>SENO WEB STUDIO</p>
        <p>FULL-STACK ENGINEERING</p>
      </div>

      <motion.div
        ref={containerRef}
        variants={container}
        initial="hidden"
        animate={controls}
        className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 md:px-8 mt-16 sm:mt-0"
      >
        <motion.div variants={itemFade} className="overflow-hidden mb-6 sm:mb-8 max-w-2xl px-4">
          <p className="text-emerald-400 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
            Forging Elite Digital Experiences
          </p>
        </motion.div>

        <motion.h1
          className="text-[12vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tighter text-white drop-shadow-2xl mix-blend-screen"
        >
          <motion.span variants={itemBlur} className="block font-bold">ENGINEERING</motion.span>
          <motion.span variants={itemBlur} className="block font-instrument italic font-light text-emerald-100">DIGITAL EMPIRES</motion.span>
        </motion.h1>

        <motion.div variants={itemFade} className="mt-8 sm:mt-12 md:mt-20 w-full max-w-2xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 sm:w-16 border-t border-white/20 hidden sm:block"></div>
          <p className="text-white/80 font-light text-sm sm:text-lg md:text-2xl leading-relaxed px-4 sm:px-24 drop-shadow-lg tracking-wide text-center">
            We architect uncompromising software for world-class brands. No templates. No excuses. Just pure performance.
          </p>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 sm:w-16 border-t border-white/20 hidden sm:block"></div>
        </motion.div>

        {/* ABSTRACT SCROLL INDICATOR (Replaces Standard Buttons) */}
        <motion.div variants={itemFade} className="absolute -bottom-32 sm:-bottom-40 md:relative md:bottom-auto md:mt-24 flex flex-col items-center gap-4">
          <span className="uppercase tracking-[0.3em] text-[10px] text-white/40">Scroll to Explore</span>
          <div className="w-[1px] h-16 sm:h-24 bg-white/10 relative overflow-hidden">
            <motion.div
              className="w-full h-1/2 bg-emerald-500 absolute top-0"
              animate={{ y: [0, 100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
