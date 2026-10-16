"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Layers, Server, Code2, Network, Cpu, ShieldCheck, Plug, Lock, Package, Globe, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services as servicesContent } from "@/data/content";

// Icons and colours per item; the text lives in data/content.ts.
const presentation: Record<string, { icon: LucideIcon; bg: string; accent: string }> = {
  "01": { icon: Layers, bg: "#0f0f0f", accent: "#1a1a2e" },
  "02": { icon: Server, bg: "#0f0f0f", accent: "#1c1a0f" },
  "03": { icon: Network, bg: "#0f0f0f", accent: "#0f1a0f" },
  "04": { icon: Package, bg: "#0f0f0f", accent: "#0f0f1a" },
  "05": { icon: Plug, bg: "#0f0f0f", accent: "#0d1a1a" },
  "06": { icon: Lock, bg: "#0f0f0f", accent: "#1a100f" },
  "07": { icon: Cpu, bg: "#0f0f0f", accent: "#1a1a0d" },
  "08": { icon: Code2, bg: "#0f0f0f", accent: "#1a0f0f" },
  "09": { icon: ShieldCheck, bg: "#0f0f0f", accent: "#1a1a1a" },
  "10": { icon: MessageSquare, bg: "#0f0f0f", accent: "#1a0f1a" },
  "11": { icon: Globe, bg: "#0f0f0f", accent: "#0f1a1a" },
};

const services = servicesContent.map((item) => ({ ...item, ...presentation[item.num] }));

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Dark: the original near-black gradient. Light: a pale surface with a faint tint of the card accent.
  const gradient = isDark
    ? `linear-gradient(135deg, ${service.bg} 0%, ${service.accent} 100%)`
    : `linear-gradient(135deg, #fafafa 0%, color-mix(in srgb, ${service.accent} 9%, #ececec) 100%)`;

  return (
    <motion.div
      className="relative rounded-2xl border border-[var(--border-color)] p-8 md:p-10 min-h-[380px] h-full flex flex-col justify-between overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ background: gradient }}
      />
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10 text-[var(--text-primary)]">
          <defs>
            <pattern id={`svc-${service.num}`} width="32" height="32" patternUnits="userSpaceOnUse">
              {service.num === "09" ? (
                <rect x="15.2" y="15.2" width="1.6" height="1.6" fill="currentColor"/>
              ) : service.num === "10" ? (
                <path d="M16 15 L17 16 L16 17 L15 16 Z" fill="currentColor"/>
              ) : service.num === "11" ? (
                <line x1="15" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="0.5"/>
              ) : (
                <circle cx="16" cy="16" r="0.8" fill="currentColor"/>
              )}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#svc-${service.num})`}/>
        </svg>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] flex items-center justify-center">
          <service.icon size={22} className="text-[var(--text-primary)]" />
        </div>
        <span className="text-[11px] tracking-[3px] text-[var(--text-muted)] font-sans">{service.num}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">{service.title}</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">{service.desc}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight max-w-xl"
          >
            What I bring to the table.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
