"use client";

import { motion } from "framer-motion";
import { services } from "@/data/content";
import { contactDetails } from "@/data/pages";
import { presentation } from "@/data/serviceIcons";

const process = [
  { title: "Understand", desc: "We agree on the problem, the users and what done looks like before any code is written." },
  { title: "Design", desc: "Data model, service boundaries and the riskiest parts worked out first, on paper." },
  { title: "Build", desc: "Small, reviewable increments with tests, so you can see real progress every week." },
  { title: "Ship and support", desc: "Deployed, monitored and handed over cleanly, with support after launch." },
];

export default function ServicesView() {
  return (
    <>
      <section className="relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label block mb-6">
            Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            What I can
            <br />
            <span className="text-[var(--text-muted)]">build for you.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            From a first idea to a product in production. Pick one service or combine several, as a freelance project, a contract or a
            founding-engineer role.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
            <a href="/contact/" className="btn-primary">
              Start a conversation
            </a>
            <a href={contactDetails.upwork} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Hire me on Upwork
            </a>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        {services.map((s) => {
          const Icon = presentation[s.num]?.icon;
          return (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-20 border-t border-[var(--border-color)] py-14 lg:py-20"
            >
              <div className="lg:sticky lg:top-28 self-start">
                <span
                  className="block text-[clamp(4.5rem,11vw,8rem)] font-bold leading-none tracking-[-0.05em] text-transparent"
                  style={{ WebkitTextStroke: "1px var(--text-muted)" }}
                  aria-hidden="true"
                >
                  {s.num}
                </span>
                <div className="mt-6 flex items-start gap-4">
                  {Icon && (
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)]">
                      <Icon size={20} />
                    </span>
                  )}
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-[1.1]">{s.title}</h2>
                </div>
              </div>
              <div className="space-y-8 lg:pt-6">
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </section>

      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="section-label block mb-4">How I work</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-14">Four steps, no surprises.</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-7 space-y-4"
              >
                <span className="text-[11px] tracking-[3px] text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{p.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 text-center space-y-8">
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">Let&apos;s build it properly.</h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
          Tell me what you need. I read every message myself and reply within 24 to 48 hours.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact/" className="btn-primary">
            Start a conversation
          </a>
          <a href={contactDetails.upwork} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Hire me on Upwork
          </a>
        </div>
      </section>
    </>
  );
}
