"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { InfoPage } from "@/data/pages";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const pad = (n: number) => String(n).padStart(2, "0");

// Contact details are never printed as plain text on this page. Where a way to
// reach me is needed, it is a button.
export default function PrivacyView({ page }: { page: InfoPage }) {
  return (
    <>
      <section className="relative grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label block mb-6">
            Privacy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            Privacy
            <br />
            <span className="text-[var(--text-muted)]">policy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            {page.intro}
          </motion.p>
          {page.updated && (
            <p className="mt-6 text-xs tracking-[2px] uppercase text-[var(--text-muted)]">
              Last updated <time dateTime={page.updated}>{page.updated}</time>
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-28 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-12 lg:gap-20">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 space-y-1">
            <p className="section-label mb-4">On this page</p>
            {page.sections.map((s, i) => (
              <a
                key={s.heading}
                href={`#${slug(s.heading)}`}
                className="flex items-baseline gap-3 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
              >
                <span className="text-[10px] tracking-[2px] text-[var(--text-muted)]">{pad(i + 1)}</span>
                {s.heading}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-14">
          {page.sections.map((s, i) => (
            <motion.section
              key={s.heading}
              id={slug(s.heading)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="scroll-mt-28 border-t border-[var(--border-color)] pt-8 space-y-5"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-[11px] tracking-[3px] text-[var(--text-muted)]">{pad(i + 1)}</span>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{s.heading}</h2>
              </div>
              {s.paragraphs?.map((p) => (
                <p key={p} className="text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                  {p}
                </p>
              ))}
              {s.items && (
                <ul className="space-y-3 max-w-3xl">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[var(--text-secondary)] leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--text-primary)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.links && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {s.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="btn-outline !py-2.5 !px-5 !text-[11px]"
                      >
                        {l.label} <ArrowUpRight size={14} />
                      </a>
                    );
                  })}
                </div>
              )}
            </motion.section>
          ))}
        </div>
      </section>
    </>
  );
}
