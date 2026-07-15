/**
 * components/shared/Nav.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio navigation bar.
 * Uses react-router-dom <Link> and useLocation for SPA navigation
 * and active-link detection (no full page reloads).
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { navLinks } from '../../lib/content';
import { EASE_SIGNAL } from '../../lib/motion-variants';

export const Nav: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    // Scroll to top on every route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Track scroll for frosted-glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on wide resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.header
        initial={prefersReduced ? { opacity: 1 } : { y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_SIGNAL, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,10,10,0.07)' : '1px solid transparent',
        }}
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
          aria-label="Main navigation"
        >
          {/* ── Wordmark ── */}
          <Link
            href="/"
            className="flex items-baseline gap-2 group"
            aria-label="SENO Studio — home"
          >
            <span
              className="font-display italic text-xl tracking-tight transition-colors duration-200"
              style={{ color: 'var(--color-ink)' }}
            >
              SENO
            </span>
            <span
              className="label-micro transition-colors duration-200 group-hover:text-[color:var(--color-primary)]"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              STUDIO
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative font-body text-sm font-medium transition-colors duration-200"
                    style={{ color: active ? 'var(--color-primary)' : 'var(--color-ink-muted)' }}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {/* Underline — always rendered, width animates */}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px block"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                      animate={{ width: active ? '100%' : '0%' }}
                      transition={{ duration: 0.25, ease: EASE_SIGNAL }}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 0 0 0 rgba(108,99,255,0)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 8px 24px -4px rgba(108,99,255,0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                '0 0 0 0 rgba(108,99,255,0)';
            }}
          >
            Start a Project
            <span style={{ color: 'var(--color-accent)' }} aria-hidden="true">✦</span>
          </Link>

          {/* ── Mobile hamburger ── */}
          <button
            className="flex md:hidden flex-col gap-[5px] p-2 rounded-md"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px w-5 origin-center"
                style={{ backgroundColor: 'var(--color-ink)' }}
                animate={
                  mobileOpen
                    ? i === 0 ? { rotate: 45, y: 6 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -6 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_SIGNAL }}
            className="fixed inset-x-0 top-[68px] z-40 md:hidden"
            style={{
              backgroundColor: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(10,10,10,0.07)',
            }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col px-6 py-6 gap-5" role="list">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between font-body text-lg font-medium"
                      style={{
                        color: active ? 'var(--color-primary)' : 'var(--color-ink)',
                      }}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                      {active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full justify-center items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
                >
                  Start a Project
                  <span style={{ color: 'var(--color-accent)' }} aria-hidden="true">✦</span>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
