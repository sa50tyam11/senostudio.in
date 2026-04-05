import React from 'react';

export function StatsSection() {
  const stats = [
    { label: '10+', desc: 'Projects Delivered' },
    { label: 'Multi', desc: 'Industries Served' },
    { label: 'Global', desc: 'Client Exposure' },
    { label: 'End-to-End', desc: 'Development' }
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-gradient-to-b from-transparent to-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 divide-y md:divide-y-0 md:divide-x divide-white/10 flex flex-col md:flex-row text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex-1 py-12 md:py-0 flex flex-col justify-center items-center group">
            <span className="text-5xl md:text-6xl font-instrument italic text-white group-hover:scale-110 transition-transform mb-2 blur-[1px] group-hover:blur-none duration-500">{stat.label}</span>
            <span className="text-sm font-medium tracking-widest text-[#a1a1aa] uppercase">{stat.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
