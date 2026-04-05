import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white/50 text-sm">
          &copy; 2026 SENO Web Studio. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm text-white/50">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
