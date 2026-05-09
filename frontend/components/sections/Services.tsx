"use client";

import { motion } from "framer-motion";
import { Layers, Server, Code2, Network, Cpu, ShieldCheck, Plug, Lock, Package } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Layers,
    title: "Full-Stack Engineering",
    desc: "End-to-end product development from database schema to pixel-perfect UI. React, Next.js, Node.js, and TypeScript, production-grade every time.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    bg: "#0f0f0f",
    accent: "#1a1a2e",
  },
  {
    num: "02",
    icon: Server,
    title: "Backend Architecture",
    desc: "Scalable APIs, distributed systems, async processing, and background jobs. Systems designed to handle real production traffic without breaking.",
    tags: ["Express", "PostgreSQL", "Redis", "REST / GraphQL"],
    bg: "#0f0f0f",
    accent: "#1c1a0f",
  },
  {
    num: "03",
    icon: Plug,
    title: "API Design and Integration",
    desc: "RESTful and GraphQL API design, third-party integrations, webhook handlers, and service orchestration across complex distributed systems.",
    tags: ["REST", "GraphQL", "Webhooks", "Third-party APIs"],
    bg: "#0f0f0f",
    accent: "#0d1a1a",
  },
  {
    num: "04",
    icon: Lock,
    title: "Security and Identity",
    desc: "Authentication systems, RBAC, OAuth 2.0, JWT, rate limiting, input validation, and OWASP-aligned patterns to protect every endpoint.",
    tags: ["JWT", "OAuth", "RBAC", "OWASP"],
    bg: "#0f0f0f",
    accent: "#1a100f",
  },
  {
    num: "05",
    icon: Network,
    title: "System Design",
    desc: "Architecture reviews, technical blueprints, microservices strategy, and service-oriented patterns that scale before the first line is written.",
    tags: ["Microservices", "SOA", "API Design", "DDD"],
    bg: "#0f0f0f",
    accent: "#0f1a0f",
  },
  {
    num: "06",
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Performant, accessible, and animated interfaces built with Framer Motion, Tailwind, and shadcn/ui, with the same rigor as the backend.",
    tags: ["React", "Tailwind", "Framer Motion", "Accessibility"],
    bg: "#0f0f0f",
    accent: "#1a0f0f",
  },
  {
    num: "07",
    icon: Package,
    title: "SaaS Product Development",
    desc: "Multi-tenant platforms from zero to production. Subscriptions, onboarding flows, role-based dashboards, and data models that scale with you.",
    tags: ["Multi-tenancy", "Stripe", "Supabase", "Prisma"],
    bg: "#0f0f0f",
    accent: "#0f0f1a",
  },
  {
    num: "08",
    icon: Cpu,
    title: "DevOps and Infrastructure",
    desc: "CI/CD pipelines, Docker containers, Nginx configuration, and Vercel or Railway deployments. Every release ships reliably and consistently.",
    tags: ["Docker", "GitHub Actions", "Vercel", "Nginx"],
    bg: "#0f0f0f",
    accent: "#1a1a0d",
  },
  {
    num: "09",
    icon: ShieldCheck,
    title: "Technical Leadership",
    desc: "CTO-level direction. Architecture decisions, team guidance, product strategy, and technical roadmaps for startups and growing engineering teams.",
    tags: ["Strategy", "Architecture", "Mentorship", "Roadmapping"],
    bg: "#0f0f0f",
    accent: "#1a0f1a",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl border border-white/10 p-8 md:p-10 min-h-[340px] flex flex-col justify-between overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ background: `linear-gradient(135deg, ${service.bg} 0%, ${service.accent} 100%)` }}
      />
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
          <defs>
            <pattern id={`svc-${service.num}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="0.8" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#svc-${service.num})`}/>
        </svg>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
          <service.icon size={22} className="text-white" />
        </div>
        <span className="text-[11px] tracking-[3px] text-white/30 font-mono">{service.num}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{service.title}</h3>
        <p className="text-white/55 leading-relaxed text-[15px]">{service.desc}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full border border-white/10 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight max-w-xl"
          >
            What I bring to the table.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {services.map((service, i) => (
            <div
              key={service.num}
              className={i > 0 ? "max-md:-mt-12" : ""}
              style={{ position: "relative", zIndex: i + 1 }}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
