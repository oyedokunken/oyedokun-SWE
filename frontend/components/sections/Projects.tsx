"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";

const NEW_PROJECT_MS = 30 * 24 * 60 * 60 * 1000;

function isNewProject(addedOn?: string) {
  if (!addedOn) return false;
  return Date.now() - new Date(addedOn).getTime() < NEW_PROJECT_MS;
}


export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label block mb-4"
            >
              Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Code that ships.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {["All", "Platform", "SaaS", "SaaS / AI", "Blockchain", "Healthcare", "EdTech", "E-commerce", "Agency", "WordPress"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[11px] tracking-[1px] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === cat
                    ? "bg-[var(--text-primary)] text-[var(--bg)] border-[var(--text-primary)]"
                    : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-[var(--border-color)] flex flex-col cursor-default"
              >
                {/* Cover image */}
                <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay row: category pill + links — black bg only (no theme toggle) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] tracking-[2px] uppercase font-medium px-3 py-1 rounded-full bg-black text-white">
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-black/80 hover:bg-black transition-colors"
                        >
                          <Github size={12} className="text-white" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-black/80 hover:bg-black transition-colors"
                        >
                          <ArrowUpRight size={12} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text section — theme-responsive bg and text */}
                <div className="p-5 flex flex-col gap-2 flex-1 bg-[var(--bg-elevated)]">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight leading-snug">{project.title}</h3>
                    {"addedOn" in project && isNewProject(project.addedOn) && (
                      <span className="text-[9px] tracking-[1.5px] uppercase font-bold px-2.5 py-1 rounded-full bg-red-600 text-white dark:bg-white dark:text-black flex-shrink-0 mt-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] tracking-wide uppercase px-2 py-1 rounded-full border border-[var(--text-primary)]/20 text-[var(--text-primary)]/65">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
