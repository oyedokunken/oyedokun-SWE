"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    id: "renpower",
    title: "Ren Power",
    category: "Platform",
    cover: "/covers/renpower-cover.png",
    desc: "Solar energy marketplace linking manufacturers, distributors, recyclers, and customers with quote-based pricing, RBAC, AI chatbot, and onboarding tours.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Supabase"],
    live: "https://www.renpowerltd.com/",
    github: "https://github.com/oyedokunken/renpower",
  },
  {
    id: "rios",
    title: "RIOS",
    category: "SaaS",
    cover: "/covers/rios-cover.png",
    desc: "Multi-tenant ESG reporting SaaS for Nigerian corporates, covering GRI, TCFD, and IFRS benchmarks with branded, auto-generated PDF report delivery.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "pdf-lib"],
    live: "https://www.riosintell.com/",
    github: "https://github.com/oyedokunken/RIOS-app",
  },
  {
    id: "msp-reports",
    title: "MSP Reports",
    category: "SaaS",
    cover: "/covers/MSP-cover.png",
    desc: "Automated white-label reporting for MSPs. Pulls data from 20+ tools including Autotask, Datto, and BitDefender into branded client reports with AI-generated executive summaries and multi-tenant isolation.",
    tags: ["Laravel 12", "React 19", "PostgreSQL", "TimescaleDB", "AI"],
    live: "https://mspreports.com.au/",
    github: "https://github.com/oyedokunken/MSP-reports",
  },
  {
    id: "glore",
    title: "Glore",
    category: "Platform",
    cover: "/covers/glore-cover.png",
    desc: "Critical mineral trading platform connecting Africa's mining sector to global markets, with real-time pricing, live WebSocket charts, and investor decks.",
    tags: ["React", "Express", "PostgreSQL", "Socket.io", "Redis"],
    live: "https://www.gloreenergy.com/",
    github: "https://github.com/oyedokunken/glore",
  },
  {
    id: "credence",
    title: "Credence",
    category: "Blockchain",
    cover: "/covers/credence-cover.png",
    desc: "Blockchain credential verification for Nigerian universities, eliminating certificate fraud with Hyperledger Fabric, QR attestations, and instant lookup.",
    tags: ["Hyperledger Fabric", "Next.js", "Node.js", "QR Verification"],
    live: "https://credencely.vercel.app",
    github: "https://github.com/oyedokunken/credence-app",
  },
  {
    id: "traqify",
    title: "Traqify",
    category: "SaaS",
    cover: "/covers/traqify-cover.png",
    desc: "Multi-tenant store management SaaS featuring real-time analytics, role-based access control, public storefronts, and integrated Paystack checkout.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Recharts"],
    live: "https://traqify.vercel.app/",
    github: "https://github.com/oyedokunken/traqify",
  },
  {
    id: "storebook",
    title: "Storebook",
    category: "SaaS",
    cover: "/covers/storebook-cover.png",
    desc: "Laravel-based store management system for retail businesses with POS, multi-branch inventory, role-based access, PDF reports, and a public storefront.",
    tags: ["Laravel 11", "PHP 8.2", "MySQL", "Tailwind CSS", "Alpine.js"],
    live: "https://storebookpro.com/",
    github: "https://github.com/oyedokunken/storebook",
  },
  {
    id: "edupilot",
    title: "EduPilot",
    category: "EdTech",
    cover: "/covers/edupilot-cover.png",
    desc: "Student workflow platform using Critical Path Method to automate scheduling and monitor cognitive load in real time across academic semesters.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "CPM"],
    live: "https://edupilotly.vercel.app/",
    github: "https://github.com/oyedokunken/edupilot",
  },
  {
    id: "rexta",
    title: "Rexta",
    category: "Web App",
    cover: "/covers/rexta-cover.png",
    desc: "Digital agency website with contact, quote, and consultation flows, ten service pages, a dynamic project showcase, and Nodemailer email delivery.",
    tags: ["Next.js 16", "Supabase", "Express", "Nodemailer", "SEO"],
    live: "https://rextatech.com/",
    github: "https://github.com/oyedokunken/rexta",
  },
  {
    id: "kwiker",
    title: "Kwiker",
    category: "Platform",
    cover: "/covers/kwiker-cover.png",
    desc: "Commerce operating system for African SMBs turning WhatsApp selling into structured digital business with AI storefront, order management, and payments.",
    tags: ["Next.js 16", "Supabase", "Prisma", "Nodemailer", "Express"],
    live: "https://kwiker-main.vercel.app/",
    github: "https://github.com/oyedokunken/kwiker-main",
  },
  {
    id: "titanbid",
    title: "TitanBid",
    category: "SaaS / AI",
    cover: "/covers/titanbid-cover.png",
    desc: "AI-powered construction cost estimating platform where builders upload blueprints and receive accurate project estimates within 24 to 48 hours.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "AI"],
    live: "https://titan-bid-frontend.vercel.app/",
    github: "https://github.com/oyedokunken/titan-bids",
  },
  {
    id: "gramone",
    title: "GramOne",
    category: "Platform",
    cover: "/covers/gramone-cover.png",
    desc: "Full-stack platform for a critical minerals company spanning three verticals: mineral extraction, refining and processing, and deep-sea exploration.",
    tags: ["Next.js 16", "Express 5", "Prisma", "Supabase", "Framer Motion"],
    live: "https://gramone.vercel.app/",
    github: "https://github.com/oyedokunken/gramone",
  },
  {
    id: "dubai-avenue",
    title: "Dubai Avenue Scents",
    category: "E-commerce",
    cover: "/covers/dubai-avenue-cover.png",
    desc: "Ultra-premium luxury fragrance storefront with WhatsApp-first ordering, Supabase persistence, transactional email delivery, and a separate admin panel.",
    tags: ["Next.js 14", "Supabase", "Nodemailer", "TypeScript"],
    live: "https://www.dubaiavenuescent.com/",
    github: "https://github.com/oyedokunken/dubai-avenue-scent",
  },
  {
    id: "dpa",
    title: "DPA Summit",
    category: "Platform",
    cover: "/covers/dpa-cover.png",
    desc: "Event platform for C-suite executives and procurement leaders with registration flows, an admin panel, confirmation emails, and security hardening.",
    tags: ["Laravel", "TailwindCSS", "MySQL", "Nodemailer"],
    live: "https://digitalprocurement.africa/",
    github: "https://github.com/oyedokunken/dpa-landing",
  },
  {
    id: "futahms",
    title: "FUTA HMS",
    category: "Healthcare",
    cover: "/covers/futa-hms-cover.png",
    desc: "University health management system with a PPSA queue algorithm, in-browser video consultations, real-time analytics, and end-to-end appointment flows.",
    tags: ["Next.js", "Node.js", "WebSockets", "PostgreSQL", "PPSA"],
    live: "https://futahms.vercel.app/",
    github: "https://github.com/oyedokunken/FUTA-HMS",
  },
  {
    id: "ascentor",
    title: "Ascentor LDP",
    category: "Platform",
    cover: "/covers/ascentor-cover.png",
    desc: "Leadership development platform with social authentication, mentorship circles, role-based dashboards, and experiential learning programs for professionals.",
    tags: ["React 19", "TypeScript", "Express", "Firebase", "TailwindCSS"],
    live: "https://ascentorbi.com/",
    github: "https://github.com/AscentorBI/Ascentor-New",
  },
  {
    id: "cooper",
    title: "Cooper Gaming Services",
    category: "Agency",
    cover: "/covers/cooper-cover.png",
    desc: "Business website for Queensland's premier gaming and technology specialists, featuring an interactive hero slider, counters, local SEO, and email flows.",
    tags: ["React 18", "TypeScript", "Vite", "Bootstrap", "Express"],
    live: "https://cgs-web.vercel.app/",
    github: "https://github.com/oyedokunken/cgs-web",
  },
  {
    id: "glory",
    title: "Glory Fashion",
    category: "WordPress",
    cover: "/covers/glory-cover.png",
    desc: "Luxury fashion brand celebrating inclusive design for all women, with WooCommerce storefront, curated collections, and a New York Fashion Week showcase.",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS"],
    live: "https://glorybyjes.com/",
    github: null,
  },
  {
    id: "nobleland",
    title: "Noble Land Africa",
    category: "WordPress",
    cover: "/covers/noble-land-cover.png",
    desc: "Real estate platform connecting property buyers and sellers across Nigeria, with search, featured listings, and contact flows for land and apartments.",
    tags: ["WordPress", "PHP", "CSS", "Real Estate"],
    live: "https://noblelandafrica.com/",
    github: null,
  },
  {
    id: "nextstars",
    title: "NextStars",
    category: "WordPress",
    cover: "/covers/nexstars-cover.png",
    desc: "STEM career placement hub empowering young talents with power skills, peer collaboration, real-world exposure, and upward social mobility pathways.",
    tags: ["WordPress", "PHP", "CSS"],
    live: "https://nexstars.org/",
    github: null,
  },
  {
    id: "wime-awards",
    title: "WIME Awards",
    category: "WordPress",
    cover: "/covers/wime-awards-cover.png",
    desc: "Awards platform celebrating women in maritime and energy across Africa, with nominee profiles, event categories, registration flows, and sponsorship tiers.",
    tags: ["WordPress", "PHP", "CSS"],
    live: "https://wimeawards.org/",
    github: null,
  },
  {
    id: "minuteman",
    title: "Minuteman",
    category: "E-commerce",
    cover: "/covers/minuteman-cover.png",
    desc: "Multi-category WooCommerce storefront for a Nigerian e-commerce brand, with flash deals, product search, wishlist management, and full account features.",
    tags: ["WordPress", "WooCommerce", "PHP"],
    live: "https://minuteman.com.ng/",
    github: null,
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label block mb-4"
            >
              Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Code that ships.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {["All", "Platform", "SaaS", "SaaS / AI", "Blockchain", "Healthcare", "EdTech", "E-commerce", "Agency", "WordPress"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[11px] tracking-[1px] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  filter === cat
                    ? "bg-[var(--text-primary)] text-[var(--bg)] border-[var(--text-primary)]"
                    : "border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-[var(--border-color)] flex flex-col cursor-default"
              >
                {/* Cover image */}
                <div className="relative h-44 flex-shrink-0 overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay row: category pill + links — black bg only (no theme toggle) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] tracking-[2px] uppercase font-medium px-3 py-1 rounded-full bg-black text-white">
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-black/80 hover:bg-black transition-colors"
                        >
                          <Github size={12} className="text-white" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          className="w-7 h-7 rounded-full flex items-center justify-center bg-black/80 hover:bg-black transition-colors"
                        >
                          <ArrowUpRight size={12} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text section — theme-responsive bg and text */}
                <div className="p-5 flex flex-col gap-2 flex-1 bg-[var(--bg-elevated)]">
                  <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight leading-snug">{project.title}</h3>
                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] tracking-wide uppercase px-2 py-1 rounded-full border border-[var(--text-primary)]/20 text-[var(--text-primary)]/65">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
