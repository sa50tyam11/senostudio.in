'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { X } from 'lucide-react';
import Shuffle from './shared/Shuffle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Always show navbar if the menu is open or if we are at the very top of the page
    if (isOpen || latest <= 50) {
      setIsHidden(false);
      return;
    }

    // Hide when scrolling down, show when scrolling up
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
        className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="collapsed"
              layoutId="nav-modal"
              className="pointer-events-auto flex items-center bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
              {/* Logo + Text */}
              <div className="flex items-center gap-2 pl-3 pr-2">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/seno-logo.jpg" alt="Logo" width={28} height={28} className="w-full h-full object-cover" />
                </div>
                <span className="font-medium text-gray-800 text-[15px] pr-2 whitespace-nowrap">SenoWebStudio</span>
              </div>
              
              {/* Vertical Divider */}
              <div className="w-[1px] h-6 bg-gray-200 mx-1 flex-shrink-0" />
              
              {/* Menu Icon */}
              <button 
                onClick={() => setIsOpen(true)} 
                className="px-3 text-gray-700 hover:text-black transition-colors h-full flex flex-col justify-center gap-[4.5px] w-12 flex-shrink-0"
              >
                <div className="h-[1.5px] w-5 bg-current rounded-full mx-auto" />
                <div className="h-[1.5px] w-5 bg-current rounded-full mx-auto" />
              </button>
              
              {/* CTA */}
              <div className="ml-1 flex-shrink-0">
                <a href="#contact" className="inline-block bg-[#5C4DFF] hover:bg-[#4a3ecc] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
                  Get started
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              layoutId="nav-modal"
              className="pointer-events-auto w-full max-w-[400px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.2)] overflow-hidden flex flex-col"
            >
              {/* Top Bar inside Modal */}
              <div className="flex items-center justify-between p-1.5">
                <div className="flex items-center gap-2 pl-3">
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                    <Image src="/seno-logo.jpg" alt="Logo" width={28} height={28} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium text-gray-800 text-[15px]">SenoWebStudio</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-[1px] h-6 bg-gray-200 mx-1 flex-shrink-0" />
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="w-12 h-10 flex items-center justify-center text-gray-700 hover:text-black transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 stroke-[1.5]" />
                  </button>
                  <div className="ml-1 flex-shrink-0">
                    <a href="#contact" onClick={() => setIsOpen(false)} className="inline-block bg-[#5C4DFF] hover:bg-[#4a3ecc] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap">
                      Get started
                    </a>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col px-8 py-2 mt-2">
                {[
                  { name: 'Home', href: '/', active: true },
                  { name: 'About Us', href: '/about', active: false },
                  { name: 'Projects', href: '/work', active: false },
                  { name: 'Blog', href: '/blog', active: false },
                  { name: 'Contact Us', href: '/contact', active: false }
                ].map((item, i) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className={`py-4 text-[15px] transition-colors border-b border-dashed border-gray-200 last:border-0 ${item.active ? 'text-[#5C4DFF] font-medium' : 'text-gray-500 hover:text-[#5C4DFF]'}`}
                  >
                    <Shuffle
                      text={item.name}
                      tag="span"
                      shuffleDirection="right"
                      duration={0.4}
                      stagger={0.03}
                      shuffleTimes={2}
                      triggerOnce={false}
                      triggerOnHover={true}
                      textAlign="left"
                    />
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-8 pb-8 pt-6">
                 <div className="flex items-center gap-3">
                    <a href="#" className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                 </div>
                 <span className="text-[11px] text-gray-400 font-medium">© 2026 SenoWebStudio</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop overlay for modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </>
  );
}
