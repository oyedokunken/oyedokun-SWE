"use client";

import { motion } from "framer-motion";
import { Layers, Rocket, Shield, Globe, MessageCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { principles as principlesContent } from "@/data/content";

// Icons and colours per item; the text lives in data/content.ts.
const presentation: Record<string, { icon: LucideIcon }> = {
  "01": { icon: Layers },
  "02": { icon: Rocket },
  "03": { icon: Shield },
  "04": { icon: Sparkles },
  "05": { icon: Globe },
  "06": { icon: MessageCircle },
};

const usps = principlesContent.map((item) => ({ ...item, ...presentation[item.number] }));

export default function WhyMe() {
  return (
    <section id="why-me" className="py-28 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label block mb-4"
            >
              Value Proposition
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            >
              Why they keep
              <br />
              coming back.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-[15px] leading-relaxed lg:text-right max-w-xs"
          >
            Not promises. Patterns built across
            <br className="hidden lg:block" />
            multiple industries and real production systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-color)] rounded-2xl overflow-hidden border border-[var(--border-color)]">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="transition-colors duration-300 group p-8 bg-[var(--bg-elevated)] hover:bg-[var(--bg)]"
            >
              <div className="flex items-start justify-between mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-xl border flex items-center justify-center transition-colors duration-300 bg-[var(--text-primary)]/[0.06] border-[var(--text-primary)]/20 group-hover:bg-[var(--text-primary)]/[0.04] group-hover:border-[var(--border-color)]"
                >
                  <usp.icon size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300" />
                </motion.div>
                <span className="text-[10px] tracking-[2px] tabular-nums text-[var(--text-muted)]">
                  {usp.number}
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2.5 tracking-tight">
                {usp.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {usp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
