'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon } from 'lucide-react';

type NavTheme = 'transparent' | 'light' | 'dark';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>('transparent');

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'WORK', href: '/work' },
    { name: 'CONTACT', href: '/contact' }
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav-theme]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section that intersects with the top of the viewport
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(entry.target.getAttribute('data-nav-theme') as NavTheme);
          }
        });
      },
      { rootMargin: '-60px 0px -90% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Theme-based styles
  const isLight = theme === 'light';
  const backgroundColor = theme === 'transparent' ? 'transparent' : isLight ? 'rgba(245, 240, 232, 0.8)' : 'rgba(13, 11, 23, 0.8)';
  const borderColor = theme === 'transparent' ? 'transparent' : isLight ? 'var(--border-light)' : 'var(--border-dark)';
  const backdropFilter = theme === 'transparent' ? 'blur(0px)' : 'blur(12px)';
  const textColor = isLight ? 'var(--color-ink)' : 'var(--color-ivory)';
  const mutedTextColor = isLight ? 'var(--color-muted)' : 'var(--color-dark-muted)';
  const buttonBg = isLight ? 'var(--color-ink)' : 'var(--color-ivory)';
  const buttonText = isLight ? 'var(--color-ivory)' : 'var(--color-ink)';
  const logoInvert = isLight ? 'invert(1)' : 'invert(0)'; // Simple way to adapt logo if it's white, assuming the original was white. Wait, logo image might not need invert if we just leave it. Let's just keep logo as is.

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-colors duration-500">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor, borderColor, backdropFilter, WebkitBackdropFilter: backdropFilter }}
          className="pointer-events-auto flex items-center justify-between px-4 py-2 rounded-full w-auto max-w-fit border gap-6 md:gap-10 transition-colors duration-500 shadow-sm"
        >
          <a href="/" className="flex items-center pl-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 overflow-hidden shadow-inner border border-white/10" style={{ filter: isLight ? 'invert(1)' : 'none', transition: 'filter 0.5s' }}>
              <Image src="/seno-logo.jpg" alt="SENO Logo" width={36} height={36} className="w-full h-full object-cover" />
            </div>
          </a>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-[10px] font-semibold transition-colors duration-300 tracking-[0.25em] uppercase hover:text-[var(--color-violet)]"
                style={{ color: mutedTextColor }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right: Moon & CTA */}
          <div className="flex items-center gap-6 pr-1">
            <button className="hidden md:flex transition-colors hover:text-[var(--color-violet)]" style={{ color: mutedTextColor }} aria-label="Toggle dark mode">
              <Moon className="w-4 h-4" strokeWidth={2} />
            </button>
            <a href="#contact" className="hidden md:inline-flex">
              <div 
                className="px-6 py-2.5 rounded-full text-[9px] font-bold tracking-[0.15em] transition-all uppercase hover:scale-105"
                style={{ backgroundColor: buttonBg, color: buttonText }}
              >
                Start a Project
              </div>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full transition-colors relative z-[60]"
              style={{ color: mutedTextColor, backgroundColor: 'rgba(255,255,255,0.05)' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-[var(--color-obsidian)]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-[var(--color-muted)] hover:bg-white/10 rounded-full transition-colors z-[60]"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="text-4xl font-instrument italic text-[var(--color-ivory)] hover:text-[var(--color-violet)] transition-colors tracking-wide"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
                className="mt-8"
              >
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  <div className="bg-[var(--color-violet)] text-[var(--color-obsidian)] px-10 py-4 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[var(--color-lavender)] transition-colors">
                    Start Project
                  </div>
                </a>
              </motion.div>
            </nav>

            {/* Bottom branding */}
            <div className="absolute bottom-10 text-center">
              <p className="text-[var(--color-dark-muted)] text-xs uppercase tracking-[0.3em]">SENO Web Studio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
