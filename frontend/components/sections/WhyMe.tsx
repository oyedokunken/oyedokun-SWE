"use client";

import { motion } from "framer-motion";
import { Layers, Rocket, Shield, Globe, MessageCircle, Sparkles } from "lucide-react";

const usps = [
  {
    icon: Layers,
    number: "01",
    title: "Systems First",
    desc: "Architecture before code. Every function has a reason, every service has a boundary. Systems designed to hold together under real-world pressure.",
  },
  {
    icon: Rocket,
    number: "02",
    title: "Ships to Production",
    desc: "Not just works locally. Every project I deliver handles real users, real traffic, and the edge cases that take products down at scale.",
  },
  {
    icon: Shield,
    number: "03",
    title: "Full Ownership",
    desc: "From DB schema to UI. One engineer with complete context means no handoffs, no communication gaps, and nothing slipping through the cracks.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "AI-Augmented Delivery",
    desc: "Agentic tools like Devin and Antigravity accelerate my research, implementation, and debugging — while I own every technical decision and the quality of what ships.",
  },
  {
    icon: Globe,
    number: "05",
    title: "Cross-Industry Range",
    desc: "Projects across fintech, energy, healthcare, mining, and e-commerce. Different domains, same quality bar. Adaptability is a technical skill.",
  },
  {
    icon: MessageCircle,
    number: "06",
    title: "Zero Ambiguity",
    desc: "You always know what is happening, what is blocked, and what ships next. Surprises belong in production monitoring, not in status updates.",
  },
];

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
