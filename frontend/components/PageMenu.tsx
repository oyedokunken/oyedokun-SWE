"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { UpworkIcon } from "@/components/BrandIcons";
import { contactDetails, siteNav } from "@/data/pages";

const socials = [
  { icon: Github, href: contactDetails.github, label: "GitHub" },
  { icon: Linkedin, href: contactDetails.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/oyedokunken", label: "Instagram" },
];

// Full-screen mobile menu for the showcase pages (/about, /projects, /services).
// It covers the whole page while open, unlike the slide-in menu on the homepage.
export default function PageMenu({ current }: { current: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-primary)]"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg)] sm:hidden"
          >
            <div className="grid-bg absolute inset-0 opacity-60 pointer-events-none" />
            <div className="relative flex h-16 shrink-0 items-center justify-between px-6">
              <Link href="/" onClick={() => setOpen(false)} aria-label="oyedokun.dev, home">
                <Logo />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-primary)]"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <nav aria-label="Pages" className="relative flex flex-1 flex-col justify-center gap-2 px-6">
              {siteNav.map((p, i) => (
                <motion.div
                  key={p.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={p.href}
                    onClick={() => setOpen(false)}
                    aria-current={p.href === current ? "page" : undefined}
                    className="flex items-baseline gap-4 border-b border-[var(--border-color)] py-4"
                  >
                    <span className="text-[11px] tracking-[3px] text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`text-5xl font-bold tracking-tight ${
                        p.href === current ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {p.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="relative space-y-6 px-6 pb-10"
            >
              <a
                href={contactDetails.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <UpworkIcon size={16} /> Hire me on Upwork
              </a>
              <div className="flex items-center justify-between">
                <ul className="flex gap-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
                      >
                        <s.icon size={16} />
                      </a>
                    </li>
                  ))}
                </ul>
                <a href={`mailto:${contactDetails.email}`} className="text-xs text-[var(--text-muted)]">
                  {contactDetails.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
