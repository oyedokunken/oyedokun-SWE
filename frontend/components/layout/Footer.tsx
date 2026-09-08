"use client";

import { Linkedin, Github, Instagram, Facebook, Mail, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useWhatsAppChat } from "@/context/WhatsAppChatContext";

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/oyedokunken/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/oyedokunken/", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/oyedokunken", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/oyedokunken/", label: "Facebook" },
  { icon: XIcon, href: "https://x.com/oyedokunken_", label: "X" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = [
  { icon: Mail, label: "Email", value: "oyedokunken@gmail.com", href: "mailto:oyedokunken@gmail.com" },
  { icon: Phone, label: "Phone", value: "+234 802 813 4942", href: "tel:+2348028134942" },
  { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat on WhatsApp", href: null },
];

export default function Footer() {
  const { theme } = useTheme();
  const { openChat } = useWhatsAppChat();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const isDark = theme === "dark";

  return (
    <>
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[var(--border-color)]">
            <div className="space-y-5">
              <Logo />
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[260px]">
                Building systems that scale. Based in Nigeria, working globally.
              </p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all duration-200"
                  >
                    <s.icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 col-span-1 md:col-span-2 md:grid md:grid-cols-2">
              <div>
                <p className="text-[10px] tracking-[3px] uppercase text-[var(--text-muted)] mb-5">Navigation</p>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollTo(link.href)}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[10px] tracking-[3px] uppercase text-[var(--text-muted)] mb-5">Contact</p>
                <ul className="space-y-4">
                  {contactLinks.map((c) => (
                    <li key={c.label}>
                      {c.href === null ? (
                        <button
                          onClick={openChat}
                          className="flex items-center gap-2.5 group text-left"
                        >
                          <span className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all duration-200 flex-shrink-0">
                            <c.icon size={12} />
                          </span>
                          <div>
                            <p className="text-[9px] tracking-[2px] uppercase text-[var(--text-muted)] leading-none mb-0.5">{c.label}</p>
                            <p className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{c.value}</p>
                          </div>
                        </button>
                      ) : (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2.5 group"
                        >
                          <span className="w-7 h-7 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)] transition-all duration-200 flex-shrink-0">
                            <c.icon size={12} />
                          </span>
                          <div>
                            <p className="text-[9px] tracking-[2px] uppercase text-[var(--text-muted)] leading-none mb-0.5">{c.label}</p>
                            <p className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{c.value}</p>
                          </div>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} Oyedokun Kehinde. All rights reserved.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Made with 🤍 by{" "}
              <a
                href="https://wa.link/nv875h"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                @oyedokunken
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div
        className="relative overflow-hidden border-t"
        style={{
          background: isDark ? "#000000" : "#ffffff",
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: isDark ? 0.04 : 0.06 }}
        >
          <defs>
            <pattern id="footer-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border pointer-events-none"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -left-60 -bottom-60 w-[700px] h-[700px] rounded-full border pointer-events-none"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)" }}
        />

        <button
          onClick={() => scrollTo("#hero")}
          aria-label="Back to top"
          className="relative z-10 w-full group py-10 sm:py-14 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.005 }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <svg
              width="clamp(52px, 9vw, 88px)"
              height="clamp(52px, 9vw, 88px)"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--text-primary)] flex-shrink-0"
              aria-hidden="true"
            >
              <rect width="40" height="40" rx="6" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M25 15 L32 15 L32 22 L26 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="20" cy="20" r="2.5" fill="currentColor" />
            </svg>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                fontSize: "clamp(2.4rem, 8vw, 6rem)",
                lineHeight: 1,
              }}
              className="text-[var(--text-primary)]"
            >
              oyedokun<span style={{ opacity: 0.25 }}>.dev</span>
            </span>
          </motion.div>
        </button>
      </div>
    </>
  );
}
