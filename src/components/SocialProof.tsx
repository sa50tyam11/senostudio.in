import React from 'react';

export function SocialProof() {
  return (
    <section className="py-24 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium tracking-widest text-[#a1a1aa] uppercase mb-12">
          Projects delivered for:
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <span className="font-instrument italic text-3xl md:text-4xl text-white">Soft Campus</span>
            <span className="text-xs text-gray-500 mt-2 uppercase tracking-wide">India, Russia, USA, Armenia</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-instrument italic text-3xl md:text-4xl text-white">Local Businesses</span>
            <span className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Retail & E-commerce</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-instrument italic text-3xl md:text-4xl text-white">Startups & Brands</span>
            <span className="text-xs text-gray-500 mt-2 uppercase tracking-wide">Personal Portfolios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
