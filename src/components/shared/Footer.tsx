/**
 * components/shared/Footer.tsx
 * ─────────────────────────────────────────────────────────────────
 * SENO Studio site footer.
 *
 * Three-column layout (desktop) / stacked (mobile):
 *  Col 1 — Brand + tagline + signal line motif
 *  Col 2 — Quick nav links
 *  Col 3 — Contact + social links
 *
 * Bottom bar: copyright + micro-label system note.
 * Animated on scroll-into-view with staggered reveals.
 * ─────────────────────────────────────────────────────────────────
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { SignalLine } from "./SignalLine";
import { navLinks } from "../../lib/content";
import { staggerContainer, listItem, fadeIn } from "../../lib/motion-variants";

const CURRENT_YEAR = new Date().getFullYear();

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com/senostudio" },
  { label: "LinkedIn",    href: "https://linkedin.com/company/senostudio" },
  { label: "GitHub",      href: "https://github.com/senostudio" },
];

export const Footer: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <footer
      className="relative border-t pt-20 pb-10 px-6 md:px-10 overflow-hidden"
      style={{
        borderColor: "var(--border-light)",
        backgroundColor: "var(--color-ivory)",
      }}
      role="contentinfo"
    >
      {/* ── Background signal line (decorative) ── */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" aria-hidden="true">
        <SignalLine
          height={60}
          amplitude={16}
          strokeWidth={0.8}
          opacity={0.07}
          showDot={false}
          animate={!prefersReduced}
          drawOnMount={false}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* ── Main grid ── */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView={prefersReduced ? "reducedMotion" : "visible"}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Col 1 — Brand */}
          <motion.div variants={listItem} className="flex flex-col gap-5">
            <Link href="/" aria-label="SENO Studio home">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display italic text-2xl tracking-tight"
                  style={{ color: "var(--color-ink)" }}
                >
                  SENO
                </span>
                <span className="label-micro" style={{ color: "var(--color-muted)" }}>
                  STUDIO
                </span>
              </div>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-[22ch]"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}
            >
              Fast, precise web experiences for founders who don't want to wait.
            </p>
            {/* Tiny inline signal line */}
            <div className="w-40 mt-1">
              <SignalLine
                height={28}
                amplitude={10}
                strokeWidth={1}
                opacity={0.35}
                showDot={false}
                animate={false}
              />
            </div>
          </motion.div>

          {/* Col 2 — Quick links */}
          <motion.div variants={listItem} className="flex flex-col gap-4">
            <span className="label-micro" style={{ color: "var(--color-muted)" }}>
              Navigation
            </span>
            <ul className="flex flex-col gap-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium transition-colors duration-150 hover:text-[color:var(--color-violet)]"
                    style={{
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-medium transition-colors duration-150 hover:text-[color:var(--color-violet)]"
                  style={{
                    color: "var(--color-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Col 3 — Contact + social */}
          <motion.div variants={listItem} className="flex flex-col gap-4">
            <span className="label-micro" style={{ color: "var(--color-muted)" }}>
              Get in touch
            </span>
            <a
              href="mailto:senowebstudio@gmail.com"
              className="text-sm font-medium transition-colors duration-150 hover:text-[color:var(--color-violet)]"
              style={{
                color: "var(--color-ink)",
                fontFamily: "var(--font-body)",
              }}
            >
              senowebstudio@gmail.com
            </a>
            <ul className="flex flex-col gap-3 mt-2" role="list">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-150 hover:text-[color:var(--color-violet)]"
                    style={{
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView={prefersReduced ? "reducedMotion" : "visible"}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid var(--border-light)" }}
        >
          <p
            className="label-micro"
            style={{ color: "var(--color-muted)" }}
          >
            © {CURRENT_YEAR} SENO Studio. All rights reserved.
          </p>
          <p
            className="label-micro flex items-center gap-1.5"
            style={{ color: "var(--color-muted)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-gold)" }}
              aria-hidden="true"
            />
            Based in Muzaffarpur, Bihar — Working PAN India
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
