"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { UpworkIcon, WhatsAppIcon } from "@/components/BrandIcons";
import { contactDetails } from "@/data/pages";

type Key = "email" | "phone" | "whatsapp" | "linkedin" | "github" | "upwork";

const channels: Record<Key, { label: string; note: string; href: string; icon: React.ReactNode }> = {
  email: { label: "Email", note: contactDetails.email, href: `mailto:${contactDetails.email}`, icon: <Mail size={20} /> },
  phone: { label: "Phone", note: contactDetails.phone, href: contactDetails.phoneHref, icon: <Phone size={20} /> },
  whatsapp: { label: "WhatsApp", note: "Chat now", href: contactDetails.whatsapp, icon: <WhatsAppIcon size={20} /> },
  linkedin: { label: "LinkedIn", note: "oyedokunken", href: contactDetails.linkedin, icon: <Linkedin size={20} /> },
  github: { label: "GitHub", note: "oyedokunken", href: contactDetails.github, icon: <Github size={20} /> },
  upwork: { label: "Upwork", note: "Hire me on Upwork", href: contactDetails.upwork, icon: <UpworkIcon size={20} /> },
};

// Icon cards for the ways to reach me. The contact page shows the email and phone
// number on their cards; other pages pass only the keys they want.
export default function ChannelCards({ show }: { show: Key[] }) {
  const cols = show.length === 6 ? "lg:grid-cols-3" : show.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${cols}`}>
      {show.map((key, i) => {
        const c = channels[key];
        const external = c.href.startsWith("http");
        return (
          <motion.li
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <a
              href={c.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-6 transition-colors hover:border-[var(--text-primary)]"
            >
              <span className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--glass-bg)]">
                  {c.icon}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <span className="space-y-1">
                <span className="block text-[10px] tracking-[3px] uppercase text-[var(--text-muted)]">{c.label}</span>
                <span className="block text-sm font-semibold break-all">{c.note}</span>
              </span>
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
}
