'use client';
/**
 * components/shared/Preloader.tsx
 * ─────────────────────────────────────────────────────────────────
 * Full-screen signal-establish sequence. Plays once per session
 * (sessionStorage flag) and exits with a wipe-up animation via
 * AnimatePresence before revealing the page beneath.
 *
 * Usage: render inside App root / layout, outside everything else.
 *   <AnimatePresence mode="wait">
 *     {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
 *   </AnimatePresence>
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SignalLine } from "./SignalLine";
import { PRELOADER_TEXT } from "../../lib/content";
import { EASE_SIGNAL } from "../../lib/motion-variants";

const SESSION_KEY = "seno_preloader_seen";

interface PreloaderProps {
  /** Called after the exit animation fully completes */
  onComplete?: () => void;
  /** Override dwell duration in ms before exit begins (default: 1600) */
  dwellMs?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  dwellMs = 1600,
}) => {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"draw" | "text" | "exit">("draw");

  useEffect(() => {
    // Phase timeline
    const drawDone = setTimeout(
      () => setPhase("text"),
      prefersReduced ? 0 : 900
    );
    const exitTrigger = setTimeout(
      () => setPhase("exit"),
      prefersReduced ? 200 : dwellMs
    );

    return () => {
      clearTimeout(drawDone);
      clearTimeout(exitTrigger);
    };
  }, [dwellMs, prefersReduced]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: prefersReduced ? 0.15 : 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          aria-label="Loading SENO Studio"
          role="status"
        >
          {/* ── Brand mark ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SIGNAL }}
            className="mb-10 flex flex-col items-center gap-3"
          >
            {/* Wordmark */}
            <span
              className="font-display text-4xl italic tracking-tight"
              style={{ color: "var(--color-ink)" }}
            >
              SENO
            </span>
            <span
              className="label-micro-primary"
              style={{ letterSpacing: "0.2em" }}
            >
              STUDIO
            </span>
          </motion.div>

          {/* ── Signal line draw-in ── */}
          <div className="w-[min(480px,80vw)] mb-6">
            <SignalLine
              height={56}
              amplitude={22}
              strokeWidth={1.8}
              speed={prefersReduced ? 0 : 2}
              animate={!prefersReduced}
              drawOnMount
              opacity={1}
            />
          </div>

          {/* ── Status text ── */}
          <AnimatePresence mode="wait">
            {phase === "text" && (
              <motion.p
                key="status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: EASE_SIGNAL }}
                className="label-micro tracking-[0.18em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {PRELOADER_TEXT}
              </motion.p>
            )}
            {phase === "draw" && (
              <motion.p
                key="wait"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.3 }}
                className="label-micro tracking-[0.18em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                &nbsp;
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Progress bar ── */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ backgroundColor: "var(--color-primary)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: prefersReduced ? 0.1 : dwellMs / 1000,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook — returns whether the preloader should show.
 * Reads/writes sessionStorage; returns false if already played this session.
 */
export function usePreloader(): [boolean, () => void] {
  const [show, setShow] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SESSION_KEY);
    } catch {
      return false; // SSR / private-browsing fallback
    }
  });

  const dismiss = () => {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* noop */ }
    setShow(false);
  };

  return [show, dismiss];
}

export function ClientPreloader() {
  const [show, dismiss] = usePreloader();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !show) return null;

  return <Preloader onComplete={dismiss} />;
}

export default Preloader;
