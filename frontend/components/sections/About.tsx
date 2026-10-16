"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Layers, Target, GraduationCap, Building2, Gauge, Rocket } from "lucide-react";
import { about } from "@/data/content";

const factIcons = [MapPin, Layers, Target, GraduationCap];
const pillarIcons = [Building2, Gauge, Rocket];

const philosophyWords = about.philosophy;

function AnimatedWord({
  word,
  index,
  total,
  scrollProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = start + 1.2 / total;
  const opacity = useTransform(scrollProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  const words = philosophyWords.split(" ");

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.03]">
          <defs>
            <pattern id="about-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-label block mb-6"
            >
              Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            >
              Thinking
              <br />
              in systems.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-[15px] text-[var(--text-secondary)] leading-relaxed"
            >
              {about.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-12 grid grid-cols-2 gap-6"
            >
              {about.facts.map((fact, i) => ({ ...fact, icon: factIcons[i] })).map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-[var(--text-secondary)]" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] tracking-[2px] uppercase text-[var(--text-muted)]">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-12">
            <p className="text-[clamp(1.35rem,2.5vw,1.85rem)] font-medium leading-[1.6] tracking-tight">
              {words.map((word, i) => (
                <AnimatedWord
                  key={i}
                  word={word}
                  index={i}
                  total={words.length}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4"
            >
              {about.pillars.map((pillar, i) => ({ ...pillar, icon: pillarIcons[i] })).map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-5 space-y-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[var(--border-color)] flex items-center justify-center">
                    <card.icon size={14} className="text-[var(--text-secondary)]" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
