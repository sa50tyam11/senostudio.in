'use client';

import React, { useRef, useState, useCallback } from 'react';
import type { MotionValue } from 'framer-motion';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────
interface CaseStudyData {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  squares: Array<{ x: number; y: number; size: number }>;
}

// ─── Data ─────────────────────────────────────────────────────────
const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'heartx',
    title: 'HeartX',
    category: 'Brand Strategy & Product Design',
    year: '2026',
    image: 'https://images.pexels.com/photos/7691249/pexels-photo-7691249.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 5, y: 30, size: 16 }, { x: 10, y: 42, size: 10 },
      { x: 3, y: 52, size: 7 }, { x: 80, y: 70, size: 14 },
      { x: 85, y: 82, size: 9 }, { x: 78, y: 60, size: 6 },
    ],
  },
  {
    id: 'swave',
    title: 'Swave®',
    category: 'Web Design & Identity',
    year: '2025',
    image: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 55, size: 16 }, { x: 88, y: 68, size: 10 },
      { x: 78, y: 72, size: 7 }, { x: 85, y: 42, size: 6 },
      { x: 90, y: 80, size: 8 },
    ],
  },
  {
    id: 'eduspark',
    title: 'EduSpark',
    category: 'Brand Strategy & Web Design',
    year: '2023',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 4, y: 24, size: 16 }, { x: 10, y: 36, size: 10 },
      { x: 2, y: 44, size: 7 }, { x: 78, y: 78, size: 14 },
      { x: 84, y: 88, size: 8 },
    ],
  },
  {
    id: 'greenergy',
    title: 'Greenergy',
    category: 'Brand Strategy & Web Design',
    year: '2022',
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800',
    squares: [
      { x: 82, y: 26, size: 14 }, { x: 88, y: 38, size: 10 },
      { x: 78, y: 44, size: 7 }, { x: 84, y: 54, size: 5 },
      { x: 90, y: 60, size: 8 },
    ],
  },
];

const FLOAT_SQUARES = [
  { x: 6, y: 20, size: 12 }, { x: 12, y: 32, size: 8 },
  { x: 8, y: 44, size: 6 }, { x: 88, y: 18, size: 10 },
  { x: 92, y: 30, size: 14 }, { x: 85, y: 42, size: 7 },
  { x: 90, y: 52, size: 5 }, { x: 14, y: 56, size: 5 },
];

// ─── Marquee logos ─────────────────────────────────────────────────
const LOGOS = [
  {
    name: 'Codecraft_',
    icon: (
      <svg key="code" width="22" height="18" viewBox="0 0 22 18" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,4 1,9 6,14" />
        <polyline points="16,4 21,9 16,14" />
        <line x1="13" y1="2" x2="9" y2="16" />
      </svg>
    ),
  },
  {
    name: 'ennLabs',
    icon: (
      <svg key="dots" width="20" height="20" viewBox="0 0 20 20" fill="black">
        {([3, 10, 17] as number[]).flatMap((cx) =>
          ([3, 10, 17] as number[]).map((cy) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'GlobalBank',
    icon: (
      <svg key="ring" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="black" strokeWidth="2">
        <circle cx="11" cy="11" r="9" />
        <circle cx="11" cy="11" r="4" />
      </svg>
    ),
  },
  {
    name: '45 Degrees°',
    icon: (
      <svg key="arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="16" x2="16" y2="2" />
        <polyline points="7,2 16,2 16,11" />
      </svg>
    ),
  },
  {
    name: 'AlphaWave',
    icon: (
      <svg key="wave" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="black" strokeWidth="1.5">
        <circle cx="11" cy="11" r="9" />
        <path d="M5 11Q8 7 11 11Q14 15 17 11" />
      </svg>
    ),
  },
  {
    name: 'Biosynthesis',
    icon: (
      <svg key="lines" width="24" height="18" viewBox="0 0 24 18" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round">
        <line x1="0" y1="3" x2="24" y2="3" />
        <line x1="6" y1="9" x2="24" y2="9" />
        <line x1="0" y1="15" x2="18" y2="15" />
      </svg>
    ),
  },
  {
    name: 'Boltshift',
    icon: (
      <svg key="bolt" width="14" height="20" viewBox="0 0 14 20" fill="black">
        <polygon points="8,0 0,11 6,11 6,20 14,9 8,9" />
      </svg>
    ),
  },
  {
    name: 'Clandestine',
    icon: (
      <svg key="plus" width="18" height="18" viewBox="0 0 18 18" fill="black">
        <rect x="7.5" y="0" width="3" height="18" />
        <rect x="0" y="7.5" width="18" height="3" />
      </svg>
    ),
  },
];

const EASING = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── FloatingSquare ───────────────────────────────────────────────
// Uses a MotionValue for parallax + a separate bob via useMotionValue + animate
const FloatingSquare: React.FC<{
  x: number;
  y: number;
  size: number;
  index: number;
  scrollYProgress: MotionValue<number>;
}> = ({ x, y, size, index, scrollYProgress }) => {
  const parallaxRaw = useTransform(scrollYProgress, [0, 1], [0, -(80 + index * 30)]);
  const parallax = useSpring(parallaxRaw, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        backgroundColor: 'black',
        y: parallax,
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3 + index * 0.4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        delay: index * 0.3,
      }}
    />
  );
};

// ─── MagneticSquare ───────────────────────────────────────────────
const MagneticSquare: React.FC<{
  x: number;
  y: number;
  size: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  isHovered: boolean;
}> = ({ x, y, size, pointerX, pointerY, isHovered }) => {
  const SPRING = { stiffness: 80, damping: 18, mass: 0.6 };

  const rawX = useTransform(pointerX, (px) => isHovered ? (px - 0.5) * 40 : 0);
  const rawY = useTransform(pointerY, (py) => isHovered ? (py - 0.5) * 40 : 0);
  const sx = useSpring(rawX, SPRING);
  const sy = useSpring(rawY, SPRING);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        backgroundColor: 'black',
        x: sx,
        y: sy,
        zIndex: 5,
        pointerEvents: 'none',
      }}
    />
  );
};

// ─── PixelOverlay ─────────────────────────────────────────────────
// Memoised so the 96 blocks don't rerender when only isHovered changes
const ROWS = 8;
const COLS = 12;

const PixelBlock: React.FC<{ row: number; col: number; isHovered: boolean }> = ({
  row, col, isHovered,
}) => {
  const delayIn = (row + col) * 0.018;
  const delayOut = ((ROWS - row) + (COLS - col)) * 0.012;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${(col / COLS) * 100}%`,
        top: `${(row / ROWS) * 100}%`,
        width: `${100 / COLS}%`,
        height: `${100 / ROWS}%`,
        backgroundColor: 'rgba(0,0,0,0.82)',
        transformOrigin: 'center',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={
        isHovered
          ? { scale: 1, opacity: 1, transition: { duration: 0.25, delay: delayIn, ease: 'easeOut' } }
          : { scale: 0, opacity: 0, transition: { duration: 0.22, delay: delayOut, ease: 'easeIn' } }
      }
    />
  );
};

// ─── CaseStudyCard ────────────────────────────────────────────────
const CaseStudyCard: React.FC<{ study: CaseStudyData; index: number }> = ({ study, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - r.left) / r.width);
    pointerY.set((e.clientY - r.top) / r.height);
  }, [pointerX, pointerY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    pointerX.set(0.5);
    pointerY.set(0.5);
  }, [pointerX, pointerY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: EASING, delay: index * 0.1 }}
      className="group relative overflow-hidden cursor-pointer"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <img
        src={study.image}
        alt={study.title}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Pixel-block hover overlay */}
      <div className="absolute inset-0" style={{ zIndex: 10 }}>
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => (
            <PixelBlock key={`${row}-${col}`} row={row} col={col} isHovered={isHovered} />
          ))
        )}
      </div>

      {/* Magnetic squares */}
      {study.squares.map((sq, i) => (
        <MagneticSquare
          key={i}
          x={sq.x}
          y={sq.y}
          size={sq.size}
          pointerX={pointerX}
          pointerY={pointerY}
          isHovered={isHovered}
        />
      ))}

      {/* Plus button top-right */}
      <div
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center border border-white/30 text-xs text-white"
        style={{ zIndex: 15 }}
      >
        +
      </div>

      {/* Info plate bottom-left */}
      <div
        className="absolute bottom-0 left-0 bg-white px-4 pb-3 pt-2.5"
        style={{ zIndex: 20, maxWidth: '70%' }}
      >
        <h3
          className="font-normal leading-tight text-black"
          style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
        >
          {study.title}
        </h3>
        <div className="mt-1.5 flex gap-4">
          <span className="text-[12px] text-black/60">{study.category}</span>
          <span className="text-[12px] font-medium text-black">{study.year}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── CTA Arrow Badge ──────────────────────────────────────────────
const ArrowBadge: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex h-6 w-6 items-center justify-center bg-black transition-all duration-300"
      style={{
        marginBottom: hovered ? '36px' : '24px',
        transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M18.75 6V15.75C18.75 15.949 18.671 16.14 18.53 16.28C18.39 16.421 18.199 16.5 18 16.5C17.801 16.5 17.61 16.421 17.47 16.28C17.329 16.14 17.25 15.949 17.25 15.75V7.81L6.53 18.53C6.39 18.671 6.199 18.75 6 18.75C5.801 18.75 5.61 18.671 5.47 18.53C5.329 18.39 5.25 18.199 5.25 18C5.25 17.801 5.329 17.61 5.47 17.47L16.19 6.75H8.25C8.051 6.75 7.86 6.671 7.72 6.53C7.579 6.39 7.5 6.199 7.5 6C7.5 5.801 7.579 5.61 7.72 5.47C7.86 5.329 8.051 5.25 8.25 5.25H18C18.199 5.25 18.39 5.329 18.53 5.47C18.671 5.61 18.75 5.801 18.75 6Z" />
      </svg>
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────
export const CaseStudiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Inject font + marquee keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=DM+Sans:500,400');
        @keyframes marqueeProjects {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-projects {
          animation: marqueeProjects 28s linear infinite;
        }
        .marquee-projects:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="relative px-6 pb-10 pt-32 sm:px-10 lg:px-16 lg:pt-40">
        {/* Floating parallax squares */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOAT_SQUARES.map((sq, i) => (
            <FloatingSquare
              key={i}
              x={sq.x}
              y={sq.y}
              size={sq.size}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Heading */}
        <div ref={headerRef} className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: EASING }}
          >
            <span className="mb-5 inline-block bg-black px-4 py-1.5 text-[13px] font-medium tracking-wide text-white">
              Projects
            </span>
            <h2
              className="font-light leading-[1.25] tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)' }}
            >
              <span className="text-black">Insights from </span>
              <span className="text-black/40">Our</span>
              <br />
              <span className="text-black/40">Case Studies</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ── CASE STUDY GRID ── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          {/* Left */}
          <div className="max-w-md">
            <div className="mb-4 flex h-7 w-7 items-center justify-center border border-black/20 text-xs text-black">
              +
            </div>
            <p className="text-[14px] leading-[1.7] text-black/60">
              We partner with ambitious brands that are ready to move beyond fragmented visuals and
              shallow quick fixes -- turning their identity, website, and messaging into one focused
              engine for growth.
            </p>
            <div className="mt-6">
              <button className="group flex items-end">
                <span className="inline-flex items-center gap-[10px] border border-black/20 bg-black px-3 py-2 text-base font-medium text-white transition-colors group-hover:bg-black/85">
                  Let&apos;s work together
                </span>
                <ArrowBadge />
              </button>
            </div>
          </div>

          {/* Right — marquee */}
          <div className="flex-1 overflow-hidden border-t border-black/10 md:ml-12 md:border-t-0">
            <div className="overflow-hidden py-5">
              <div className="marquee-projects flex w-max">
                {[...LOGOS, ...LOGOS].map((logo, i) => (
                  <div key={i} className="flex shrink-0 items-center gap-2.5 px-8">
                    {logo.icon}
                    <span className="whitespace-nowrap text-sm font-medium tracking-wide text-black/80">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-12" />
    </section>
  );
};
