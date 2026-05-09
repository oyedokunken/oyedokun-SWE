"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", icon: `${CDN}/typescript/typescript-original.svg` },
      { name: "JavaScript", icon: `${CDN}/javascript/javascript-original.svg` },
      { name: "PHP", icon: `${CDN}/php/php-original.svg` },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React", icon: `${CDN}/react/react-original.svg` },
      { name: "Next.js", icon: `${CDN}/nextjs/nextjs-original.svg` },
      { name: "Tailwind CSS", icon: `${CDN}/tailwindcss/tailwindcss-original.svg` },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: "Express", icon: `${CDN}/express/express-original.svg` },
      { name: "Laravel", icon: `${CDN}/laravel/laravel-original.svg` },
    ],
  },
  {
    label: "Data",
    skills: [
      { name: "PostgreSQL", icon: `${CDN}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "Prisma", icon: `${CDN}/prisma/prisma-original.svg` },
    ],
  },
  {
    label: "DevOps",
    skills: [
      { name: "Docker", icon: `${CDN}/docker/docker-original.svg` },
      { name: "GitHub Actions", icon: `${CDN}/githubactions/githubactions-original.svg` },
      { name: "Linux", icon: `${CDN}/linux/linux-original.svg` },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: `${CDN}/git/git-original.svg` },
      { name: "VS Code", icon: `${CDN}/vscode/vscode-original.svg` },
      { name: "Supabase", icon: `${CDN}/supabase/supabase-original.svg` },
    ],
  },
];

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {skillGroups.map((group, gi) => (
            <div key={group.label} className="space-y-2">
              <p className="text-[10px] tracking-[2px] uppercase text-[var(--text-muted)] px-2 mb-3">
                {group.label}
              </p>
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
                      className={`w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-200 ${skill.name === "Express" ? "dark:invert" : "dark:invert-[0.05]"}`}
                    />
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] text-center leading-tight">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
