"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences as experiencesContent } from "@/data/content";

const experiences = experiencesContent;

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Where I have built things.
          </motion.h2>
        </div>

        <div className="relative" ref={sectionRef}>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border-color)] block overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="absolute inset-0 bg-[var(--text-primary)] opacity-60"
            />
          </div>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="pl-6 lg:pl-12 relative group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300 }}
                  className="absolute -left-1.5 top-8 w-3 h-3 rounded-full border-2 border-[var(--text-muted)] bg-[var(--bg)] group-hover:border-[var(--text-primary)] transition-colors"
                />

                <div className="py-10 border-b border-[var(--border-color)] last:border-0">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          {exp.company}
                        </h3>
                        <span className="text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {exp.role} &middot; {exp.location}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] whitespace-nowrap font-medium tracking-wide">
                      {exp.period}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
