'use client';

import React from 'react';

const ITEMS_ROW_1 = [
  'Brand Strategy', '✦', 'Web Design', '✦', 'Product Design',
  '✦', 'Visual Systems', '✦', 'Identity', '✦', 'Motion',
];

const ITEMS_ROW_2 = [
  'UI/UX Design', '✦', 'Campaigns', '✦', 'Art Direction',
  '✦', 'Interaction', '✦', 'Typography', '✦', 'Digital Craft',
];

export const DiagonalMarquee: React.FC = () => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: '160px',
        backgroundColor: 'var(--color-electric-white)',
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
          animation: marquee-ltr 22s linear infinite;
        }
        .band-rtl {
          animation: marquee-rtl 26s linear infinite;
        }
        .band-ltr:hover,
        .band-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── Band 1: top-left → bottom-right, ink black ── */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: '18px',
          transform: 'rotate(-6deg)',
          transformOrigin: 'center center',
          backgroundColor: '#0A0A0A',
          paddingTop: '10px',
          paddingBottom: '10px',
          zIndex: 2,
        }}
      >
        <div className="band-rtl flex w-max select-none">
          {[...ITEMS_ROW_1, ...ITEMS_ROW_1, ...ITEMS_ROW_1, ...ITEMS_ROW_1].map((item, i) => (
            <span
              key={i}
              className="shrink-0 px-5 text-sm font-medium uppercase tracking-[0.12em] text-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Band 2: top-right → bottom-left, electric indigo ── */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: '72px',
          transform: 'rotate(5deg)',
          transformOrigin: 'center center',
          backgroundColor: '#6C63FF',
          paddingTop: '10px',
          paddingBottom: '10px',
          zIndex: 3,
        }}
      >
        <div className="band-ltr flex w-max select-none">
          {[...ITEMS_ROW_2, ...ITEMS_ROW_2, ...ITEMS_ROW_2, ...ITEMS_ROW_2].map((item, i) => (
            <span
              key={i}
              className="shrink-0 px-5 text-sm font-medium uppercase tracking-[0.12em] text-white"
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
