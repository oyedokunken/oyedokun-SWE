"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Github, Instagram, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/oyedokunken/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/oyedokunken/oyedokun.dev", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/oyedokunken", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/oyedokunken/", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/oyedokunken_", label: "X" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export default function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  const handleNav = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 h-full w-[min(380px,90vw)] z-[90] bg-[var(--bg)] border-l border-[var(--border-color)] flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-color)]">
              <Logo />
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                    onClick={() => handleNav(item.href)}
                    className={`group flex items-center justify-between py-4 text-left border-b border-[var(--border-color)] last:border-0 transition-all duration-200 ${
                      isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="text-2xl font-semibold tracking-tight">{item.label}</span>
                    <span className={`text-xs tracking-widest uppercase transition-opacity ${isActive ? "opacity-100 text-[var(--text-muted)]" : "opacity-0 group-hover:opacity-60"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="px-8 py-8 border-t border-[var(--border-color)]">
              <p className="text-[11px] tracking-[2px] uppercase text-[var(--text-muted)] mb-5">Connect</p>
              <div className="flex gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-200"
                  >
                    <s.icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
