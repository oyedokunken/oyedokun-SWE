"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Trophy, Users, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const education = [
  {
    icon: GraduationCap,
    institution: "Federal University of Technology, Akure",
    credential: "Bachelor of Technology (B.Tech)",
    field: "Computer Information Systems",
    period: "Oct. 2021 - Jul. 2026",
    meta: "CGPA: 4.77 / 5.00",
    location: "Akure, Nigeria",
    type: "Degree",
  },
  {
    icon: Award,
    institution: "Amazon (via Coursera)",
    credential: "Professional Software Development Certification",
    field: "Software Development",
    period: "September 2026",
    meta: null,
    location: "Online",
    type: "Certificate",
  },
  {
    icon: Users,
    institution: "Aspire Institute",
    credential: "Aspire Leaders Program",
    field: "Organizational Leadership",
    period: "August 2025",
    meta: "In collaboration with Harvard Business School",
    location: "Global (Online)",
    type: "Program",
  },
  {
    icon: Award,
    institution: "Cipher Training and Software Development",
    credential: "Certificate of Completion",
    field: "Full Stack Web Development",
    period: "November 2025",
    meta: null,
    location: "Akure, Nigeria",
    type: "Certificate",
  },
  {
    icon: Trophy,
    institution: "NACOSS, FUTA Chapter",
    credential: "Emerging Award Winner",
    field: "2025 Annual Hackathon",
    period: "September 2025",
    meta: null,
    location: "Akure, Nigeria",
    type: "Award",
  },
];

export default function Education() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const ghostItem = education[education.length - 1];

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

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: education.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg)] p-7 flex flex-col items-center justify-center gap-4 hover:border-[var(--text-muted)] transition-colors duration-300"
          >
            {/* Invisible copy of the last card: gives this placeholder the same height as a real card on mobile (single column). On desktop the grid row already stretches it. */}
            <div aria-hidden="true" className="invisible md:hidden w-full flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11" />
                <span className="text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 border">{ghostItem.type}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold tracking-tight leading-snug">{ghostItem.institution}</h3>
                <p className="text-sm font-semibold">{ghostItem.credential}</p>
                <p className="text-sm">{ghostItem.field}</p>
              </div>
              <div className="border-t pt-4 space-y-1.5">
                <p className="text-[11px] tracking-wide">{ghostItem.period}</p>
                <p className="text-[11px]">{ghostItem.location}</p>
                {ghostItem.meta && <p className="text-[11px] leading-relaxed">{ghostItem.meta}</p>}
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--text-muted)] transition-colors duration-300">
                <Plus size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300" />
              </div>
              <p className="text-sm text-[var(--text-muted)] text-center leading-relaxed">
                More on the way
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
