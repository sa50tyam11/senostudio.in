'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export const WhatsAppWidget: React.FC = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling 400px (roughly past hero intro)
    if (latest > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50"
        >
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="flex items-center gap-3"
          >
            {/* Pill Button */}
            <a
              href="https://wa.me/917667261838?text=Hi%20SENO%20Studio!%20%F0%9F%91%8B%20I'd%20like%20to%20discuss%20a%20new%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex flex-col items-end group"
            >
              <div className="bg-[#1C3224] text-white px-5 py-2.5 rounded-full shadow-lg border border-[#1C3224]/50 transition-transform group-hover:-translate-y-1 group-hover:shadow-xl group-hover:bg-[#16271c]">
                <span className="text-[11px] font-medium tracking-[0.2em]">C H A T &nbsp; W I T H &nbsp; U S</span>
              </div>
            </a>

          {/* WhatsApp Icon with Glow */}
          <a
            href="https://wa.me/917667261838?text=Hi%20SENO%20Studio!%20%F0%9F%91%8B%20I'd%20like%20to%20discuss%20a%20new%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center group"
          >
            {/* Outer light green glow border (similar to image) */}
            <div className="absolute -inset-1.5 bg-[#25D366]/20 rounded-full scale-100 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Icon Circle */}
            <div className="relative h-[48px] w-[48px] md:h-[52px] md:w-[52px] bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10 transition-transform group-hover:-translate-y-1 group-hover:shadow-xl">
              <svg 
                className="h-6 w-6 md:h-7 md:w-7 text-white fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
          </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
