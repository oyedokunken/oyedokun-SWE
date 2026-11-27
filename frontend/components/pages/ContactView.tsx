"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ListChecks, ShieldCheck } from "lucide-react";
import ChannelCards from "@/components/pages/ChannelCards";
import Contact from "@/components/sections/Contact";
import { contactDetails, type InfoPage } from "@/data/pages";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export default function ContactView({ page }: { page: InfoPage }) {
  const text = (heading: string) => page.sections.find((s) => s.heading === heading)?.paragraphs?.[0] ?? "";
  const notes = [
    { icon: ListChecks, title: "What to include", body: text("What to include") },
    { icon: MapPin, title: "Where I am", body: `Based in ${contactDetails.location}.` },
    { icon: ShieldCheck, title: "Your information", body: text("Your information") },
  ];

  return (
    <>
      <section className="relative grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-20">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label block mb-6">
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          >
            Let&apos;s
            <br />
            <span className="text-[var(--text-muted)]">talk.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            {page.intro}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
            <a href={contactDetails.upwork} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Hire me on Upwork
            </a>
            <a href="#message" className="btn-outline">
              Send a message
            </a>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <span className="section-label block mb-8">Reach me directly</span>
        <ChannelCards show={["email", "phone", "whatsapp", "linkedin", "github", "upwork"]} />
      </section>

      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {notes.map((n) => (
            <motion.div key={n.title} {...reveal} className="space-y-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)]">
                <n.icon size={18} />
              </span>
              <h2 className="text-xl font-bold tracking-tight">{n.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{n.body}</p>
              {n.title === "Your information" && (
                <Link href="/privacy/" className="inline-block text-sm font-semibold underline underline-offset-4">
                  Read the privacy policy
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <div id="message" className="scroll-mt-20">
        <Contact />
      </div>
    </>
  );
}
