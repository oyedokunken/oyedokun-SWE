"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    quote:
      "Kehinde delivered the entire Glore platform in record time. Clean architecture, real-time WebSocket pricing, and a polished UI that impressed every stakeholder. He thinks like an engineer and a product person at the same time.",
    name: "Bolwarinwa Dolapo",
    role: "Co-founder",
    company: "Rexta Technologies",
    initials: "TA",
  },
  {
    quote:
      "The RIOS platform is exactly what we needed. Multi-tenant ESG reporting with GRI and TCFD frameworks, all working out of the box. Kehinde understood the compliance requirements better than most engineers I have worked with.",
    name: "Tunbosun Afolayan",
    role: "Managing Director",
    company: "PRO ALLY",
    initials: "CO",
  },
  {
    quote:
      "Working with Kehinde on our customer portal and onboarding system was seamless. He built secure, scalable APIs and integrated everything we needed without cutting corners on performance or security.",
    name: "Josh Finlay",
    role: "Engineering Lead",
    company: "Athena Networks",
    initials: "JH",
  },
  {
    quote:
      "Kehinde built the Ren Power marketplace from scratch. The quote workflow, role-based dashboards, and the AI chatbot all work flawlessly in production. He is the kind of engineer you want owning the entire backend.",
    name: "Ayobami Olu",
    role: "CEO/Founder",
    company: "Ren Power Limited",
    initials: "SM",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const avatarSrc = theme === "dark" ? "/avatar-dark.png" : "/avatar.png";
  return (
    <section id="testimonials" className="py-28 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-4"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight"
            >
              Words from
              <br />
              <span className="text-[var(--text-secondary)]">people I have built with.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 flex flex-col gap-6 border border-[var(--border-color)] hover:border-white/20 transition-colors duration-300"
            >
              <Quote size={20} className="text-white/20 flex-shrink-0" />

              <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-color)]">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                  <Image src={avatarSrc} alt={t.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    {t.role} &middot; {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
