"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import { UpworkIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { education, experiences } from "@/data/content";
import { contactDetails } from "@/data/pages";

const industries = [
  "SaaS",
  "Critical minerals trading",
  "Renewable energy",
  "Blockchain",
  "AI",
  "E-commerce",
  "Healthcare",
  "Real estate",
  "ESG compliance",
  "Education",
  "Telecommunications",
];

const story = [
  "I'm a systems thinker with the heart of a builder. I take ownership from schema to UI, from database to production, and I care about the details that make software reliable in the real world.",
  "I've worked with international teams across time zones, on products that had to handle real users and real money. I prioritize scalable architecture, performant code, and software that people can depend on.",
];

const rightNow = [
  "Open to interesting contracts and full-time remote roles where I can build impactful solutions.",
  "Learning and building with AI development environments to move faster from idea to reliable, production-ready software.",
  "Architecting and scaling production systems across multiple industries.",
  "Exploring AI and ML integration patterns for intelligent automation and data-driven decision systems.",
  "Deepening expertise in real-time systems, system design, and cloud deployment patterns.",
  "Balancing code with life by visiting new places and enjoying good music while quietly building.",
];

const collage = [
  { src: "/shoot/oyedokun-53.webp", cls: "left-0 top-10 w-[46%] -rotate-6 z-10" },
  { src: "/shoot/oyedokun-58.webp", cls: "left-[24%] top-0 w-[54%] rotate-2 z-20" },
  { src: "/shoot/oyedokun-47.webp", cls: "right-0 top-24 w-[44%] rotate-6 z-10" },
];

// [photo number, crop aspect, focal point]. Aspects vary so tile widths differ,
// but every row shares one height, which keeps the top and bottom edges aligned.
const gallery: [number, number, string?][][] = [
  [[36, 1.25, "50% 55%"], [53, 0.8], [38, 0.85], [28, 1.2, "50% 45%"]],
  [[18, 0.9], [30, 1.15], [37, 1.3, "50% 45%"], [33, 0.8]],
  [[52, 0.8], [41, 1.3, "60% 45%"], [35, 0.95, "50% 60%"], [22, 1.0]],
  [[39, 1.1], [42, 1.25, "50% 30%"], [20, 0.85], [51, 0.8]],
  [[54, 1.0], [25, 0.85], [46, 1.15], [31, 1.0]],
];

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function AboutView() {
  const channels = [
    { label: "Email", note: contactDetails.email, href: `mailto:${contactDetails.email}`, icon: <Mail size={20} /> },
    { label: "WhatsApp", note: "Chat now", href: contactDetails.whatsapp, icon: <WhatsAppIcon size={20} /> },
    { label: "LinkedIn", note: "oyedokunken", href: contactDetails.linkedin, icon: <Linkedin size={20} /> },
    { label: "GitHub", note: "oyedokunken", href: contactDetails.github, icon: <Github size={20} /> },
    { label: "Upwork", note: "Hire me on Upwork", href: contactDetails.upwork, icon: <UpworkIcon size={20} /> },
  ];
  const loop = [...industries, ...industries, ...industries];

  return (
    <>
      <section className="relative grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 items-center">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label block mb-6">
              About
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.2rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
            >
              Hey, I&apos;m
              <br />
              <span className="inline-flex items-center gap-x-4">
                <span className="text-[var(--text-muted)]">Kenny.</span>
                <span className="wave-wrap inline-block h-[0.8em] w-[0.8em]">
                  <Image src="/emoji/waving-hand.webp" alt="" width={200} height={200} priority className="wave-hand h-full w-full" />
                </span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 max-w-xl text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              I&apos;m a full-stack software engineer based in Lagos, Nigeria. I design and build backend systems, APIs
              and full-stack SaaS products, and I take them from architecture through deployment and production support. I build for the
              happy path, the edge cases and everything in between.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[520px] aspect-[4/3.7] lg:aspect-[4/4.4] order-first lg:order-last"
          >
            {collage.map((c) => (
              <div
                key={c.src}
                className={`absolute aspect-[3/4] overflow-hidden rounded-2xl border-4 border-[var(--bg)] shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-30 ${c.cls}`}
              >
                <Image src={c.src} alt="Oyedokun Kehinde" fill sizes="260px" className="object-cover object-top" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-6 overflow-hidden" aria-label="Industries I have worked in">
        <div className="flex w-max items-center gap-10" style={{ animation: "marquee-scroll 70s linear infinite" }}>
          {loop.map((name, i) => (
            <span key={i} aria-hidden={i >= industries.length || undefined} className="flex items-center gap-10 whitespace-nowrap">
              <span className="text-2xl lg:text-4xl font-bold tracking-tight">{name}</span>
              <span className="text-[var(--text-muted)]">/</span>
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
        <div className="lg:sticky lg:top-28 self-start">
          <span className="section-label block mb-4">The short version</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]">
            Builder first,
            <br />
            then everything else.
          </h2>
        </div>
        <div className="space-y-8">
          {story.map((p) => (
            <motion.p key={p} {...reveal} className="text-xl lg:text-2xl leading-relaxed text-[var(--text-secondary)]">
              {p}
            </motion.p>
          ))}
          <motion.div {...reveal} className="flex flex-wrap gap-4 pt-4">
            <a href="/projects/" className="btn-outline">
              See the work
            </a>
            <a href="/services/" className="btn-outline">
              What I offer
            </a>
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="section-label block mb-4">Right now</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-14">What I&apos;m up to.</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {rightNow.map((t, i) => (
              <motion.li key={t} {...reveal} className="flex gap-6 border-t border-[var(--border-color)] py-7">
                <span className="text-[11px] tracking-[3px] text-[var(--text-muted)] pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-lg leading-relaxed">{t}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
        <span className="section-label block mb-4">The journey</span>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-14">Where I&apos;ve worked.</h2>
        <ul>
          {experiences.map((e, i) => (
            <motion.li
              key={`${e.company}-${e.role}`}
              {...reveal}
              className="group grid grid-cols-1 md:grid-cols-[3rem_1.2fr_1fr_1fr] gap-2 md:gap-8 items-baseline border-t border-[var(--border-color)] py-6 last:border-b"
            >
              <span className="text-[11px] tracking-[3px] text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                {e.company}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {e.role} <span className="text-[var(--text-muted)]">· {e.type}</span>
              </p>
              <p className="text-[11px] tracking-[2px] uppercase text-[var(--text-muted)] md:text-right">{e.period}</p>
            </motion.li>
          ))}
        </ul>
        <ul className="mt-12 flex flex-wrap gap-3">
          {education.map((e) => (
            <li
              key={e.credential}
              className="rounded-full border border-[var(--border-color)] px-4 py-2 text-xs text-[var(--text-secondary)]"
            >
              <span className="font-semibold text-[var(--text-primary)]">{e.credential}</span>, {e.institution}
              {e.meta ? ` (${e.meta})` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-color)] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="section-label block mb-4">Beyond the code</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-14">A few moments.</h2>
          <div className="space-y-3 md:space-y-4">
            {gallery.map((row, ri) => (
              <div key={ri} className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4">
                {row.map(([n, a, pos]) => (
                  <motion.div
                    key={n}
                    {...reveal}
                    style={{ flexGrow: a, "--a": a } as React.CSSProperties}
                    className="group relative min-w-0 basis-[calc(50%-0.375rem)] aspect-[4/5] md:basis-0 md:aspect-[var(--a)] overflow-hidden rounded-2xl border border-[var(--border-color)]"
                  >
                    <Image
                      src={`/shoot/oyedokun-${n}.webp`}
                      alt="Oyedokun Kehinde"
                      fill
                      sizes="(max-width: 768px) 50vw, 360px"
                      style={{ objectPosition: pos ?? "50% 22%" }}
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-28">
        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Let&apos;s talk.</h2>
        <p className="text-[var(--text-secondary)] max-w-xl mb-12">
          Based in {contactDetails.location}. Open to remote and hybrid roles, and to freelance and contract work.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {channels.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-6 transition-colors hover:border-[var(--text-primary)]"
              >
                <span className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)]">
                    {c.icon}
                  </span>
                  <ArrowUpRight size={16} className="text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="space-y-1">
                  <span className="block text-[10px] tracking-[3px] uppercase text-[var(--text-muted)]">{c.label}</span>
                  <span className="block text-sm font-semibold break-all">{c.note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
