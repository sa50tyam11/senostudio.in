import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left — copyright */}
        <div className="text-white/50 text-sm md:w-1/3">
          &copy; 2026 SENO Web Studio. All rights reserved.
        </div>

        {/* Center — logo */}
        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <a href="#home" className="flex items-center gap-2">
            <img src="/seno-logo.jpg" alt="SENO" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-xl font-instrument italic font-bold tracking-wide">
              <span className="text-white">SE</span><span className="text-emerald-400">NO</span>
            </span>
          </a>
          <p className="text-white/30 text-xs uppercase tracking-[0.25em]">Web Studio</p>
        </div>

        {/* Right — links */}
        <div className="flex gap-8 text-sm text-white/50 md:w-1/3 md:justify-end">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

