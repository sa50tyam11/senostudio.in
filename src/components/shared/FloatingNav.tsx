'use client';
import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import SpecularButton from './SpecularButton';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show hamburger when scrolled past 80% of screen height (past the hero)
    if (typeof window !== 'undefined') {
      if (latest > window.innerHeight * 0.8) {
        setShowButton(true);
      } else {
        setShowButton(false);
        // Automatically close menu if they scroll all the way to top
        if (latest < 100) setIsOpen(false);
      }
    }
  });

  return (
    <>
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-6 right-6 z-[100] w-14 h-14 bg-[#111111] text-[#F7F6F0] border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_#6C63FF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#6C63FF] transition-all"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#F7F6F0] flex flex-col pointer-events-auto selection:bg-[#6C63FF] selection:text-[#F7F6F0]"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b-2 border-black bg-[#111111] text-[#F7F6F0]">
              <span className="font-handwritten text-2xl font-bold tracking-wide">
                SENO Web Studio
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-[#F7F6F0] text-black border-2 border-black hover:bg-[#6C63FF] hover:text-white transition-colors shadow-[2px_2px_0px_#6C63FF]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 relative overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-[#6C63FF]/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#84cc16]/20 rounded-full blur-2xl pointer-events-none"></div>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), type: 'spring' }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="group relative inline-block text-5xl md:text-7xl font-handwritten text-black hover:text-[#6C63FF] transition-colors font-bold"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-[#6C63FF]/20 -z-0 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (NAV_LINKS.length * 0.1) }}
                className="mt-8"
              >
                <SpecularButton
                  size="lg"
                  radius={0}
                  tint="#6C63FF"
                  tintOpacity={1}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#111111"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/contact';
                  }}
                  className="font-body font-bold text-xl uppercase tracking-widest border-2 border-black shadow-[6px_6px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#111111] transition-all"
                >
                  Start Project
                </SpecularButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
