"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    id: "credence",
    title: "Credence",
    category: "Blockchain",
    desc: "Blockchain-powered academic credential verification. Eliminates certificate fraud across Nigerian universities using Hyperledger Fabric.",
    tags: ["Hyperledger Fabric", "Next.js", "Node.js", "QR Verification"],
    live: "https://credencely.vercel.app",
    github: "https://github.com/oyedokunken/credence-app",
    gradient: "from-[#0f0f0f] via-[#1a1a2e] to-[#16213e]",
    pattern: "blockchain",
  },
  {
    id: "glore",
    title: "Glore",
    category: "Platform",
    desc: "Critical mineral trading and investment platform connecting Africa's mining sector with global markets. Real-time pricing, live WebSocket charts, and investor deck delivery.",
    tags: ["React", "Express", "PostgreSQL", "Socket.io", "Redis"],
    live: "https://www.gloreenergy.com/",
    github: "https://github.com/oyedokunken/glore",
    gradient: "from-[#0a0a0a] via-[#0d1a0d] to-[#041a04]",
    pattern: "hexagons",
  },
  {
    id: "renpower",
    title: "Ren Power",
    category: "Platform",
    desc: "Full-stack solar energy marketplace connecting manufacturers, distributors, recyclers, and customers. Quote-based pricing, RBAC, AI chatbot, and guided onboarding tours.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Supabase"],
    live: "https://www.renpowerltd.com/",
    github: "https://github.com/oyedokunken/renpower",
    gradient: "from-[#0a0a0a] via-[#0d1507] to-[#0a1f04]",
    pattern: "solar",
  },
  {
    id: "rios",
    title: "RIOS",
    category: "SaaS",
    desc: "Multi-tenant ESG reporting SaaS for Nigerian companies. GRI, TCFD, and IFRS benchmarking with branded PDF report generation.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "pdf-lib"],
    live: null,
    github: "https://github.com/oyedokunken/RIOS-app",
    gradient: "from-[#0f0f0f] via-[#0d1a0d] to-[#0a1f0a]",
    pattern: "dots",
  },
  {
    id: "titanbid",
    title: "TitanBid",
    category: "SaaS / AI",
    desc: "AI-powered construction estimating platform. Upload blueprints, get accurate cost estimates in 24-48 hours.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "AI"],
    live: "https://titan-bid-frontend.vercel.app/",
    github: "https://github.com/oyedokunken/titan-bids",
    gradient: "from-[#0f0f0f] via-[#1c1a0f] to-[#2a2400]",
    pattern: "grid",
  },
  {
    id: "traqify",
    title: "Traqify",
    category: "SaaS",
    desc: "Production-grade multi-tenant store management with real-time analytics, RBAC, public storefronts, and Paystack checkout.",
    tags: ["Next.js", "Express", "Prisma", "PostgreSQL", "Recharts"],
    live: "https://traqify.vercel.app/",
    github: "https://github.com/oyedokunken/traqify",
    gradient: "from-[#0f0f0f] via-[#0f1a0f] to-[#001a00]",
    pattern: "network",
  },
  {
    id: "gramone",
    title: "GramOne",
    category: "Platform",
    desc: "Full-stack web platform for a critical minerals company. Three verticals: mineral extraction, refining and processing, and deep-sea mining exploration.",
    tags: ["Next.js 16", "Express 5", "Prisma", "Supabase", "Framer Motion"],
    live: "https://gramone.vercel.app/",
    github: "https://github.com/oyedokunken/gramone",
    gradient: "from-[#0a0a0a] via-[#0a100a] to-[#030a0a]",
    pattern: "crystals",
  },
  {
    id: "dubai-avenue",
    title: "Dubai Avenue Scents",
    category: "E-commerce",
    desc: "Ultra-premium luxury fragrance storefront. WhatsApp-first ordering, Supabase persistence, Nodemailer transactional emails, and a separate admin dashboard.",
    tags: ["Next.js 14", "Supabase", "Nodemailer", "TypeScript"],
    live: "https://www.dubaiavenuescent.com/",
    github: "https://github.com/oyedokunken/dubai-avenue-scent",
    gradient: "from-[#0f0a0f] via-[#1a0d1a] to-[#1a0020]",
    pattern: "luxury",
  },
  {
    id: "dpa",
    title: "DPA Summit",
    category: "Platform",
    desc: "Premier event platform for C-suite executives. Registration system, admin panel, confirmation emails, and full CSRF and rate-limit security.",
    tags: ["Laravel", "TailwindCSS", "MySQL", "Nodemailer"],
    live: "https://digitalprocurement.africa/",
    github: "https://github.com/oyedokunken/dpa-landing",
    gradient: "from-[#0f0f0f] via-[#1a1505] to-[#1f1a00]",
    pattern: "grid",
  },
  {
    id: "futahms",
    title: "FUTA HMS",
    category: "Healthcare",
    desc: "University health management system with PPSA queue algorithm, in-browser video consultations, and real-time analytics.",
    tags: ["Next.js", "Node.js", "WebSockets", "PostgreSQL", "PPSA"],
    live: "https://futahms.vercel.app/",
    github: "https://github.com/oyedokunken/FUTA-HMS",
    gradient: "from-[#0f0f0f] via-[#1a0f0f] to-[#200000]",
    pattern: "wave",
  },
  {
    id: "edupilot",
    title: "EduPilot",
    category: "EdTech",
    desc: "Student workflow management using Critical Path Method to automate scheduling and monitor cognitive load in real time.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "CPM"],
    live: "https://edupilotly.vercel.app/",
    github: "https://github.com/oyedokunken/edupilot",
    gradient: "from-[#0f0f0f] via-[#0f0f1a] to-[#000020]",
    pattern: "circles",
  },
  {
    id: "ascentor",
    title: "Ascentor LDP",
    category: "Platform",
    desc: "Leadership development platform with social authentication (Google, Apple, Facebook), mentorship circles, role-based dashboards, and experiential learning programs.",
    tags: ["React 19", "TypeScript", "Express", "Firebase", "TailwindCSS"],
    live: "https://ascentorbi.com/",
    github: "https://github.com/AscentorBI/Ascentor-New",
    gradient: "from-[#0a0a0a] via-[#0a0d1a] to-[#000a1f]",
    pattern: "network",
  },
  {
    id: "cooper",
    title: "Cooper Gaming Services",
    category: "Agency",
    desc: "Production-ready business website for Queensland's premier gaming and technology specialists. Interactive hero slider, animated counters, local SEO, and a smart email system.",
    tags: ["React 18", "TypeScript", "Vite", "Bootstrap", "Express"],
    live: "https://cgs-web.vercel.app/",
    github: "https://github.com/oyedokunken/cgs-web",
    gradient: "from-[#0a0a10] via-[#0a0f1a] to-[#000d1f]",
    pattern: "grid",
  },
  {
    id: "glory",
    title: "Glory Fashion",
    category: "WordPress",
    desc: "Luxury fashion brand celebrating inclusive design for women of all sizes and stages. Features curated collections, New York Fashion Week showcase, and WooCommerce storefront.",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS"],
    live: "https://glorybyjes.com/",
    github: null,
    gradient: "from-[#0f0a0f] via-[#1a0f14] to-[#200010]",
    pattern: "luxury",
  },
  {
    id: "nobleland",
    title: "Noble Land Africa",
    category: "WordPress",
    desc: "Real estate platform connecting buyers and sellers across Nigeria. Property search, featured listings, blog, and contact flows for land, apartments, and commercial properties.",
    tags: ["WordPress", "PHP", "CSS", "Real Estate"],
    live: "https://noblelandafrica.com/",
    github: null,
    gradient: "from-[#0a0f0a] via-[#0d1a0a] to-[#071a05]",
    pattern: "hexagons",
  },
  {
    id: "rexta",
    title: "Rexta",
    category: "Agency",
    desc: "Full-featured digital agency site with contact, quote, and consultation flows. 10 service pages, dynamic project showcase.",
    tags: ["Next.js 16", "Supabase", "Express", "Nodemailer", "SEO"],
    live: "https://rexta.vercel.app/",
    github: "https://github.com/oyedokunken/rexta",
    gradient: "from-[#0f0f0f] via-[#1a0f1a] to-[#1a001a]",
    pattern: "blockchain",
  },
];

const categories = ["All", "Platform", "SaaS", "SaaS / AI", "Blockchain", "Healthcare", "EdTech", "E-commerce", "Agency", "WordPress"];

function AbstractCover({ pattern, gradient, cardId }: { pattern: string; gradient: string; cardId: string }) {
  const pid = (name: string) => `${name}-${cardId}`;
  return (
    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient}`}>
      {pattern === "blockchain" && (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("chain")} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="20" height="20" rx="3" stroke="white" strokeWidth="0.8" fill="none"/>
              <rect x="35" y="35" width="20" height="20" rx="3" stroke="white" strokeWidth="0.8" fill="none"/>
              <line x1="25" y1="15" x2="35" y2="45" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("chain")})`}/>
        </svg>
      )}
      {pattern === "grid" && (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("grid")} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("grid")})`}/>
        </svg>
      )}
      {pattern === "dots" && (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("dots")} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="1.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("dots")})`}/>
        </svg>
      )}
      {pattern === "wave" && (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          {[0,1,2,3,4].map(i => (
            <path key={i} d={`M0 ${60+i*30} Q 80 ${30+i*30} 160 ${60+i*30} T 320 ${60+i*30} T 480 ${60+i*30} T 640 ${60+i*30}`} fill="none" stroke="white" strokeWidth="0.8"/>
          ))}
        </svg>
      )}
      {pattern === "network" && (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30%" cy="40%" r="3" fill="white"/>
          <circle cx="60%" cy="25%" r="3" fill="white"/>
          <circle cx="75%" cy="65%" r="3" fill="white"/>
          <circle cx="20%" cy="70%" r="3" fill="white"/>
          <circle cx="50%" cy="55%" r="2" fill="white"/>
          <line x1="30%" y1="40%" x2="60%" y2="25%" stroke="white" strokeWidth="0.6"/>
          <line x1="60%" y1="25%" x2="75%" y2="65%" stroke="white" strokeWidth="0.6"/>
          <line x1="30%" y1="40%" x2="20%" y2="70%" stroke="white" strokeWidth="0.6"/>
          <line x1="30%" y1="40%" x2="50%" y2="55%" stroke="white" strokeWidth="0.6"/>
          <line x1="75%" y1="65%" x2="50%" y2="55%" stroke="white" strokeWidth="0.6"/>
        </svg>
      )}
      {pattern === "circles" && (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="80" stroke="white" strokeWidth="0.8" fill="none"/>
          <circle cx="50%" cy="50%" r="120" stroke="white" strokeWidth="0.6" fill="none"/>
          <circle cx="50%" cy="50%" r="160" stroke="white" strokeWidth="0.4" fill="none"/>
          <circle cx="50%" cy="50%" r="200" stroke="white" strokeWidth="0.3" fill="none"/>
        </svg>
      )}
      {pattern === "hexagons" && (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("hex")} x="0" y="0" width="52" height="30" patternUnits="userSpaceOnUse">
              <polygon points="13,0 39,0 52,15 39,30 13,30 0,15" stroke="white" strokeWidth="0.7" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("hex")})`}/>
        </svg>
      )}
      {pattern === "solar" && (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="40" stroke="white" strokeWidth="1" fill="none"/>
          <circle cx="50%" cy="50%" r="70" stroke="white" strokeWidth="0.6" fill="none" strokeDasharray="4 8"/>
          <circle cx="50%" cy="50%" r="100" stroke="white" strokeWidth="0.5" fill="none"/>
          <circle cx="50%" cy="50%" r="130" stroke="white" strokeWidth="0.4" fill="none" strokeDasharray="6 10"/>
          {[0,45,90,135,180,225,270,315].map(a => {
            const rad = (a * Math.PI) / 180;
            return <line key={a} x1="50%" y1="50%" x2={`calc(50% + ${Math.cos(rad)*160}px)`} y2={`calc(50% + ${Math.sin(rad)*160}px)`} stroke="white" strokeWidth="0.4" opacity="0.4"/>;
          })}
        </svg>
      )}
      {pattern === "crystals" && (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("cryst")} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,2 38,20 20,38 2,20" stroke="white" strokeWidth="0.7" fill="none"/>
              <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeWidth="0.3"/>
              <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("cryst")})`}/>
        </svg>
      )}
      {pattern === "luxury" && (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={pid("lux")} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <line x1="0" y1="30" x2="30" y2="0" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${pid("lux")})`}/>
          <circle cx="50%" cy="50%" r="60" stroke="white" strokeWidth="0.4" fill="none"/>
          <circle cx="50%" cy="50%" r="90" stroke="white" strokeWidth="0.3" fill="none"/>
        </svg>
      )}
      {pattern === "network" && (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          {[[20,20],[80,40],[50,80],[140,20],[160,70],[110,110],[40,130],[170,140]].map(([cx,cy],i) => (
            <circle key={i} cx={`${cx}px`} cy={`${cy}px`} r="3" fill="white"/>
          ))}
          {[[20,20,80,40],[80,40,50,80],[80,40,140,20],[140,20,160,70],[160,70,110,110],[50,80,110,110],[50,80,40,130],[110,110,170,140]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={`${x1}px`} y1={`${y1}px`} x2={`${x2}px`} y2={`${y2}px`} stroke="white" strokeWidth="0.6"/>
          ))}
        </svg>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
    </div>
  );
}

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
                className={`text-[11px] tracking-[1px] uppercase px-4 py-2 rounded-full transition-all duration-200 bg-white text-black ${
                  filter === cat ? "" : "opacity-70 hover:opacity-100"
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] cursor-default min-h-[280px] flex flex-col"
              >
                <AbstractCover pattern={project.pattern} gradient={project.gradient} cardId={project.id} />

                <div className="relative z-10 p-6 flex flex-col justify-between flex-1">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] tracking-[2px] uppercase text-white/40 border border-white/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Github size={13} className="text-white" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live site"
                          className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <ArrowUpRight size={13} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] tracking-wide uppercase px-2 py-1 rounded bg-white text-black">
                          {tag}
                        </span>
                      ))}
                    </div>
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
