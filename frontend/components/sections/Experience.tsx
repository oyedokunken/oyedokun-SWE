"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    company: "Rexta Technologies",
    role: "Software Engineer",
    period: "June 2025 to Present",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    highlights: [
      "Building production-grade platforms that process real-time data streams for trading and verification systems",
      "Cut latency in live trading updates by 30% through advanced caching and WebSocket integrations",
      "Orchestrating payment gateway, media, and third-party API integrations into a unified transaction ecosystem",
      "Optimizing performance with asynchronous background jobs, memory management, and structured system design",
    ],
  },
  {
    company: "Ascentor BI",
    role: "Software Engineer",
    period: "January 2024 to Present",
    location: "Lagos, Nigeria",
    type: "Contract",
    highlights: [
      "Building a responsive multi-role mentorship platform used across institutions and cohorts",
      "Implementing seamless social authentication flows to reduce signup friction for new users",
      "Improving platform performance, SEO, and accessibility to expand reach and discoverability",
      "Delivering a unified component library and design system that accelerates feature development",
    ],
  },
  {
    company: "Athena Networks",
    role: "Software Engineer",
    period: "October 2025 to September 2026",
    location: "Australia (Remote)",
    type: "Full-time",
    highlights: [
      "Maintained production applications handling high-volume traffic at 99.9% uptime",
      "Reduced page load times by 40% and improved server response rates under heavy load",
      "Delivered customer portals and admin platforms that streamlined onboarding for thousands of users",
      "Fortified security posture with input validation, rate limiting, and API protection mechanisms",
    ],
  },
  {
    company: "PRO ALLY",
    role: "Chief Technology Officer",
    period: "May 2025 to September 2026",
    location: "Lagos, Nigeria (Part-time)",
    type: "Part-time",
    highlights: [
      "Setting and executing technology strategy across ESG advisory and publishing platforms",
      "Architecting RIOS, a multi-tenant ESG SaaS platform built to support global compliance reporting",
      "Overseeing five live platforms simultaneously without degrading uptime or delivery speed",
      "Building the engineering foundation: processes, standards, and pipelines that enable the team to scale",
    ],
  },
  {
    company: "Ren Power Limited",
    role: "Software Engineer",
    period: "January 2025 to July 2026",
    location: "Florida, USA (Remote)",
    type: "Contract",
    highlights: [
      "Built a full-stack solar energy marketplace on Next.js, Node.js, PostgreSQL, Prisma, and Supabase",
      "Designed RBAC, quote request workflows, and recycling network features for multiple stakeholder roles",
      "Integrated authentication, notifications, file uploads, and third-party services for production operations",
      "Stabilized production systems through continuous debugging, reducing downtime and resolving critical login issues",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label block mb-4"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Where I have built things.
          </motion.h2>
        </div>

        <div className="relative" ref={sectionRef}>
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border-color)] block overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="absolute inset-0 bg-[var(--text-primary)] opacity-60"
            />
          </div>

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="pl-6 lg:pl-12 relative group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300 }}
                  className="absolute -left-1.5 top-8 w-3 h-3 rounded-full border-2 border-[var(--text-muted)] bg-[var(--bg)] group-hover:border-[var(--text-primary)] transition-colors"
                />

                <div className="py-10 border-b border-[var(--border-color)] last:border-0">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          {exp.company}
                        </h3>
                        <span className="text-[10px] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {exp.role} &middot; {exp.location}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] whitespace-nowrap font-medium tracking-wide">
                      {exp.period}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 rounded-full bg-[var(--text-muted)] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
