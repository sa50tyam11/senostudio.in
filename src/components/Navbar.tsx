'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Shuffle from './shared/Shuffle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (isOpen || latest <= 50) {
      setIsHidden(false);
      return;
    }

    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 md:px-8"
      >
        <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
          
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white/10 transition-transform group-hover:scale-105">
              <Image src="/seno-logo.jpg" alt="SENO" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-xl font-instrument italic font-bold tracking-wide">
              SE<span className="text-[#6C63FF]">NO</span>
            </span>
          </Link>

          {/* CENTER: Glass Pill (Desktop) */}
          <div className="hidden md:flex items-center gap-8 bg-[#0F0F11]/60 backdrop-blur-md border border-white/10 px-8 py-3.5 rounded-full shadow-2xl">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Shuffle
                    text={link.name}
                    tag="span"
                    shuffleDirection="right"
                    duration={0.4}
                    stagger={0.03}
                    shuffleTimes={2}
                    triggerOnce={false}
                    triggerOnHover={true}
                    textAlign="left"
                  />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: CTA (Desktop) */}
          <div className="hidden md:flex shrink-0">
            <Link 
              href="/contact" 
              className="bg-white text-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-lg"
            >
              Start Project
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden flex items-center justify-center w-12 h-12 bg-[#0F0F11]/60 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/60 flex flex-col pointer-events-auto"
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <Image src="/seno-logo.jpg" alt="SENO" width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <span className="text-white text-xl font-instrument italic font-bold">
                  SE<span className="text-[#6C63FF]">NO</span>
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col px-8 py-10 gap-8 mt-10">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl text-gray-300 hover:text-white font-medium"
                >
                  <Shuffle
                    text={link.name}
                    tag="span"
                    shuffleDirection="right"
                    duration={0.4}
                    stagger={0.03}
                    shuffleTimes={2}
                    triggerOnce={false}
                    triggerOnHover={true}
                    textAlign="left"
                  />
                </Link>
              ))}
              
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="mt-8 bg-emerald-400 text-black px-8 py-4 rounded-full text-lg font-semibold text-center"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
