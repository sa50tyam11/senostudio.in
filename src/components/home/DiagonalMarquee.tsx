'use client';

import React from 'react';

const ITEMS_ROW_1 = [
  'Next.js', '✦', 'React', '✦', 'TypeScript', '✦', 'Tailwind CSS', '✦', 'Framer Motion', '✦', 'PostgreSQL', '✦', 'Supabase', '✦', 'Node.js', '✦', 'Figma',
];

const ITEMS_ROW_2 = [
  'Interface Engineering', '✦', 'Full-Stack Builds', '✦', 'Backend & Auth', '✦', 'System Architecture', '✦', 'Performance Optimization', '✦', 'MVP Sprints',
];

export const DiagonalMarquee: React.FC = () => {
  return (
    <div
      className="relative z-50 w-full overflow-visible pointer-events-none flex items-center justify-center -mt-24 -mb-24 md:-mt-32 md:-mb-32"
      style={{
        height: '120px', // Creates a natural gap while bands overflow
        backgroundColor: 'transparent',
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
        @keyframes marquee-rtl {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }
        .band-ltr {
          animation: marquee-ltr 45s linear infinite;
        }
        .band-rtl {
          animation: marquee-rtl 50s linear infinite;
        }
        .band-ltr:hover,
        .band-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Band 1: top-left → bottom-right ── */}
      <div
        className="absolute overflow-hidden shadow-sm pointer-events-auto"
        style={{
          top: '50%',
          left: '-5%',
          right: '-5%',
          transform: 'translateY(-50%) rotate(-4deg)',
          transformOrigin: 'center center',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.03)',
          paddingTop: '14px',
          paddingBottom: '14px',
          zIndex: 2,
        }}
      >
        <div className="band-rtl flex w-max select-none">
          {[...ITEMS_ROW_1, ...ITEMS_ROW_1, ...ITEMS_ROW_1, ...ITEMS_ROW_1].map((item, i) => (
            <span
              key={i}
              className={`shrink-0 px-5 text-sm font-medium tracking-[0.12em] uppercase ${item === '✦' ? 'text-[var(--color-electric-indigo)]/50' : 'text-[var(--color-ink)]'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Band 2: top-right → bottom-left ── */}
      <div
        className="absolute overflow-hidden pointer-events-auto"
        style={{
          top: '50%',
          left: '-5%',
          right: '-5%',
          transform: 'translateY(-50%) rotate(4deg)',
          transformOrigin: 'center center',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0 8px 32px -4px rgba(0, 0, 0, 0.04)',
          paddingTop: '14px',
          paddingBottom: '14px',
          zIndex: 3,
        }}
      >
        <div className="band-ltr flex w-max select-none">
          {[...ITEMS_ROW_2, ...ITEMS_ROW_2, ...ITEMS_ROW_2, ...ITEMS_ROW_2].map((item, i) => (
            <span
              key={i}
              className={`shrink-0 px-5 text-sm font-medium tracking-[0.12em] uppercase ${item === '✦' ? 'text-[var(--color-electric-indigo)]/50' : 'text-[var(--color-ink)]'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
