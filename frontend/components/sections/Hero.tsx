"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useSiteReady } from "@/lib/useSiteReady";
import { hero } from "@/data/content";

function GreenDot() {
  return (
    <span className="relative flex h-2 w-2 flex-shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
    </span>
  );
}

const { titleWords } = hero;

function Word({ word, i, total, ready }: { word: string; i: number; total: number; ready: boolean }) {
  return (
    <motion.span
      initial={{ y: 40, filter: "blur(8px)" }}
      animate={ready ? { y: 0, filter: "blur(0px)" } : { y: 40, filter: "blur(8px)" }}
      transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-block mr-[0.25em] ${i >= total - 2 ? "text-[var(--text-secondary)]" : ""}`}
    >
      {word}
    </motion.span>
  );
}

// The headline, intro and portrait are LCP candidates, so they stay fully
// opaque from the first paint and only animate transform/filter. Opacity-0
// starts would hold LCP back until the preloader finished.
export default function Hero() {
  const ready = useSiteReady();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <motion.div
            style={{ y: imageY }}
            initial={{ scale: 0.95 }}
            animate={ready ? { scale: 1 } : { scale: 0.95 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative block lg:hidden order-first"
          >
            <div className="relative w-full aspect-[3/4]">
              <div className="absolute inset-0 rounded-2xl border border-[var(--border-color)] overflow-hidden">
                <Image
                  src="/shoot/oyedokun-47.webp"
                  alt="Oyedokun Kehinde"
                  fill
                  className="object-cover object-center grayscale"
                  priority
                  sizes="(max-width: 1024px) calc(100vw - 48px), 0px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl p-3">
                  <p className="text-sm text-white font-bold tracking-tight">Oyedokun Kehinde</p>
                  <p className="text-xs text-white/60 mt-0.5">Software Engineer</p>
                  <p className="text-[10px] text-white/35 mt-0.5 tracking-wide flex items-center gap-1.5"><GreenDot /> Open to remote and hybrid SWE roles</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: textY }} className="space-y-8 mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="section-label">
                <GreenDot />
                Available for work
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              {titleWords.map((w, i) => (
                <Word key={i} word={w} i={i} total={titleWords.length} ready={ready} />
              ))}
            </h1>

            <motion.p
              initial={{ y: 20 }}
              animate={ready ? { y: 0 } : { y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md"
            >
              {hero.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                View Projects
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline"
              >
                My Services
                <ArrowRight size={14} />
              </button>
            </motion.div>

          </motion.div>

          <motion.div
            style={{ y: imageY }}
            initial={{ scale: 0.95 }}
            animate={ready ? { scale: 1 } : { scale: 0.95 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block order-last"
          >
            <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4]">
              <div className="absolute inset-0 rounded-2xl border border-[var(--border-color)] overflow-hidden">
                <Image
                  src="/shoot/oyedokun-47.webp"
                  alt="Oyedokun Kehinde"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                  sizes="420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-[var(--border-color)] rounded-xl opacity-40" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-[var(--border-color)] rounded-lg opacity-30" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-white font-bold tracking-tight">Oyedokun Kehinde</p>
                  <p className="text-xs text-white/60 mt-0.5">Software Engineer</p>
                  <p className="text-[10px] text-white/35 mt-1 tracking-wide flex items-center gap-1.5"><GreenDot /> Open to remote and hybrid SWE roles</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.button
          onClick={scrollDown}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}
