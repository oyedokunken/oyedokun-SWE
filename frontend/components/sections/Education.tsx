"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Users } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const education = [
  {
    icon: GraduationCap,
    institution: "Federal University of Technology, Akure",
    credential: "Bachelor of Technology (B.Tech)",
    field: "Information Systems",
    period: "Expected August 2026",
    meta: "GPA: 4.75 / 5.00",
    location: "Akure, Nigeria",
    type: "Degree",
  },
  {
    icon: Award,
    institution: "Cipher Software Limited",
    credential: "Certificate of Completion",
    field: "Full Stack Web Development",
    period: "May – October 2025",
    meta: null,
    location: "Akure, Nigeria",
    type: "Certificate",
  },
  {
    icon: Users,
    institution: "Aspire Institute",
    credential: "Aspire Leaders Program",
    field: "Organizational Leadership",
    period: "January 2025 – August 2025",
    meta: "In collaboration with Harvard Business School",
    location: "Global (Online)",
    type: "Program",
  },
];

export default function Education() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="education" className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            Education
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-bold tracking-tight"
          >
            My scholastic endeavours. 
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {education.map((item, i) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] p-7 flex flex-col gap-5 hover:border-[var(--text-muted)] transition-colors duration-300 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: isDark
                    ? "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)"
                    : "radial-gradient(ellipse at 20% 0%, rgba(0,0,0,0.03) 0%, transparent 70%)",
                }}
              />

              <div className="flex items-start justify-between">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--text-muted)] transition-colors duration-300"
                >
                  <item.icon size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300" />
                </motion.div>
                <span className="text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">
                  {item.type}
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                  {item.institution}
                </h3>
                <p className="text-sm font-semibold text-[var(--text-secondary)]">
                  {item.credential}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{item.field}</p>
              </div>

              <div className="border-t border-[var(--border-color)] pt-4 space-y-1.5">
                <p className="text-[11px] text-[var(--text-muted)] tracking-wide">{item.period}</p>
                <p className="text-[11px] text-[var(--text-muted)]">{item.location}</p>
                {item.meta && (
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{item.meta}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
