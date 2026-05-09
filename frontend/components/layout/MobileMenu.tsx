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

function BehanceIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.73 1.542 1.878 1.542.604 0 1.107-.231 1.404-.583L23.726 17zm-7.73-3.35h3.979c-.088-1.226-.795-1.825-1.934-1.825-1.201 0-1.875.615-2.045 1.825zM3.512 7.5h3.765c2.098 0 3.242 1.001 3.242 2.747 0 .928-.487 1.73-1.348 2.115.981.31 1.576 1.128 1.576 2.25 0 2.097-1.257 3.138-3.756 3.138H3.512V7.5zm2.36 4.038h1.206c.859 0 1.293-.44 1.293-1.13 0-.73-.469-1.13-1.293-1.13H5.872v2.26zm0 4.5h1.335c1.014 0 1.547-.485 1.547-1.287 0-.77-.565-1.287-1.547-1.287H5.872v2.574z"/>
    </svg>
  );
}

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/oyedokunken/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/oyedokunken/oyedokun.dev", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/oyedokunken", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/oyedokunken/", label: "Facebook" },
  { icon: BehanceIcon, href: "https://www.behance.net/oyedokun", label: "Behance" },
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
