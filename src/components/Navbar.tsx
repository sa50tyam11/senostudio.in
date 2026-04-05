import { useState } from 'react';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Services', 'Work', 'Process', 'Contact'];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
      >
        <a href="#home" className="flex items-center gap-2">
          <img src="/seno-logo.jpg" alt="SENO" className="h-10 w-10 rounded-lg object-cover" />
          <span className="text-xl font-instrument italic font-bold tracking-wide hidden sm:inline">
            <span className="text-white">SE</span><span className="text-emerald-400">NO</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 glass-panel rounded-full px-8 py-3">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide">
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact"><Button variant="primary" className="hidden sm:inline-flex min-h-[48px]">Start Project</Button></a>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors relative z-[60]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            {/* Close Button — always visible */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-[60]"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, idx) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="text-4xl font-instrument italic text-white/80 hover:text-emerald-400 transition-colors tracking-wide"
                >
                  {link}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: links.length * 0.08, duration: 0.4 }}
                className="mt-8"
              >
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="primary" 
                    className="min-h-[52px] px-10 text-base"
                  >
                    Start Project
                  </Button>
                </a>
              </motion.div>
            </nav>

            {/* Bottom branding */}
            <div className="absolute bottom-10 text-center">
              <p className="text-white/20 text-xs uppercase tracking-[0.3em]">SENO Web Studio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
