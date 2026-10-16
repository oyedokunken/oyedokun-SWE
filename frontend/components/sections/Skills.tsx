"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import stack from "@/data/stack.json";

type StackGroup = {
  label: string;
  skills: { name: string; icon: string; iconDark?: string }[];
};

// Icons are synced from svgl (https://svgl.app) into public/stack by
// `npm run icons`; edit data/stack.json, not this file.
// Every group holds the same number of tools so the grid stays even.
const skillGroups: StackGroup[] = stack.groups;

export default function Skills() {
  return (
    <section className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label block mb-4"
            >
              Stack
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Tools of the trade.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[var(--text-secondary)] max-w-[240px] text-right hidden sm:block"
          >
            Proficient across the full stack, opinionated about the backend.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {skillGroups.map((group, gi) => {
            // Below lg the last group spans the full width and lays its tools out as a row
            // (3 then 2 on mobile) so the grid stays even instead of leaving a lone column.
            const isLast = gi === skillGroups.length - 1;
            return (
              <div
                key={group.label}
                className={`space-y-2 ${isLast ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}`}
              >
                <p className="text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] px-2 mb-3">
                  {group.label}
                </p>
                <div
                  className={
                    isLast
                      ? "grid grid-cols-3 sm:grid-cols-5 gap-2 lg:grid-cols-1 lg:space-y-0"
                      : "space-y-2"
                  }
                >
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.05 + si * 0.07, duration: 0.4 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="glass rounded-xl p-3 flex flex-col items-center gap-2 group cursor-default"
                    >
                      <div className="w-8 h-8 relative flex items-center justify-center">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={32}
                          height={32}
                          unoptimized
                          // Themed pairs load eagerly so toggling the theme never shows a blank tile.
                          loading={skill.iconDark ? "eager" : "lazy"}
                          className={`w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200 ${skill.iconDark ? "dark:hidden" : ""}`}
                        />
                        {skill.iconDark && (
                          <Image
                            src={skill.iconDark}
                            alt=""
                            aria-hidden
                            width={32}
                            height={32}
                            unoptimized
                            loading="eager"
                            className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200 hidden dark:block"
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] text-center leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
