"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // The preloader is only an overlay: the hero is already rendered and
    // paintable underneath, so LCP is not tied to this. Progress tracks fonts
    // and the parsed document (not every image), with a short minimum so the
    // ring doesn't flash and a hard cap so it never lingers.
    const MIN_MS = 400;
    const MAX_MS = 2000;
    const start = performance.now();
    let fontsReady = false;
    let finished = false;
    let shown = 0;

    document.fonts?.ready.then(() => {
      fontsReady = true;
    });
    if (!document.fonts) fontsReady = true;

    const timer = setInterval(() => {
      const elapsed = performance.now() - start;
      const interactive = document.readyState !== "loading";
      const allReady = interactive && fontsReady && elapsed >= MIN_MS;

      let target = (fontsReady ? 40 : 0) + (interactive ? 50 : 0) + Math.min(elapsed / MIN_MS, 1) * 10;
      target = allReady || elapsed >= MAX_MS ? 100 : Math.min(target, 99);

      shown = Math.min(shown + Math.max((target - shown) * 0.35, target > shown ? 1.5 : 0), 100);
      setProgress(shown);

      if (shown >= 99.5 && target >= 100 && !finished) {
        finished = true;
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setExiting(true);
          document.dispatchEvent(new CustomEvent("siteReady"));
          setTimeout(() => setVisible(false), 600);
        }, 150);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const displayProgress = Math.floor(progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          id="preloader"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--bg)] flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="70"
                cy="70"
                r={RADIUS}
                stroke="var(--border-color)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r={RADIUS}
                stroke="var(--text-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "70px 70px",
                  transition: "stroke-dashoffset 0.12s ease",
                }}
              />
              <g transform="translate(46, 46)">
                <rect width="48" height="48" rx="8" fill="var(--glass-bg)" stroke="var(--glass-border)" strokeWidth="1"/>
                <circle cx="24" cy="24" r="9" stroke="var(--text-primary)" strokeWidth="1.5" fill="none"/>
                <path d="M30 18 L38 18 L38 26 L32 32" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <circle cx="24" cy="24" r="3" fill="var(--text-primary)"/>
              </g>
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="text-[var(--text-primary)] font-bold tabular-nums"
                style={{ fontSize: "clamp(1.5rem,4vw,2rem)", letterSpacing: "-0.04em" }}
              >
                {displayProgress}
                <span className="text-[var(--text-muted)] text-base font-normal">%</span>
              </span>
              <span className="text-[10px] tracking-[3px] uppercase text-[var(--text-muted)]">
                {exiting ? "Ready" : "Loading"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
