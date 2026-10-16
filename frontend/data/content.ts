// Text content for the homepage sections. Components add icons and styling;
// the Markdown renderer (lib/agent/markdown.ts) reads the same data, so the
// page agents read can never drift from the page people see.

export const services = [
  {
    num: "01",
    title: "Full-Stack Engineering",
    desc: "End-to-end product development from database schema to pixel-perfect UI. React, Next.js, Node.js, and TypeScript, production-grade every time.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    num: "02",
    title: "Backend Architecture",
    desc: "Scalable APIs, distributed systems, async processing, and background jobs. Systems designed to handle real production traffic without breaking.",
    tags: ["Express", "PostgreSQL", "Redis", "REST / GraphQL"],
  },
  {
    num: "03",
    title: "System Design",
    desc: "Architecture reviews, technical blueprints, microservices strategy, and service-oriented patterns that scale before the first line is written.",
    tags: ["Microservices", "SOA", "API Design", "DDD"],
  },
  {
    num: "04",
    title: "SaaS Product Development",
    desc: "Multi-tenant platforms from zero to production. Subscriptions, onboarding flows, role-based dashboards, and data models that scale with you.",
    tags: ["Multi-tenancy", "Stripe", "Supabase", "Prisma"],
  },
  {
    num: "05",
    title: "API Design and Integration",
    desc: "RESTful and GraphQL API design, third-party integrations, webhook handlers, and service orchestration across complex distributed systems.",
    tags: ["REST", "GraphQL", "Webhooks", "Third-party APIs"],
  },
  {
    num: "06",
    title: "Security and Identity",
    desc: "Authentication systems, RBAC, OAuth 2.0, JWT, rate limiting, input validation, and OWASP-aligned patterns to protect every endpoint.",
    tags: ["JWT", "OAuth", "RBAC", "OWASP"],
  },
  {
    num: "07",
    title: "DevOps and Infrastructure",
    desc: "CI/CD pipelines, Docker containers, Nginx configuration, and Vercel, Render or Railway deployments. Every release ships reliably and consistently.",
    tags: ["Docker", "GitHub Actions", "Render", "Vercel", "Nginx"],
  },
  {
    num: "08",
    title: "Frontend Engineering",
    desc: "Performant, accessible, and animated interfaces built with Framer Motion, Tailwind, and shadcn/ui, with the same rigor as the backend.",
    tags: ["React", "Tailwind", "Framer Motion", "Accessibility"],
  },
  {
    num: "09",
    title: "Technical Leadership",
    desc: "Hands-on technical direction. Architecture decisions, team guidance, product strategy, and technical roadmaps for startups and growing engineering teams.",
    tags: ["Strategy", "Architecture", "Mentorship", "Roadmapping"],
  },
  {
    num: "10",
    title: "Consultation",
    desc: "Technical advisory for founders and product teams. Architecture reviews, technology stack decisions, and implementation planning before the first line of code.",
    tags: ["Advisory", "Architecture", "Tech Stack", "Planning"],
  },
  {
    num: "11",
    title: "WordPress Development",
    desc: "Custom WordPress websites built for performance and scale. From business sites and portfolios to complex content-driven platforms, delivered with clean, maintainable setups.",
    tags: ["Custom Websites", "Business Sites", "CMS", "Performance"],
  },
];

export const principles = [
  {
    number: "01",
    title: "Systems First",
    desc: "Architecture before code. Every function has a reason, every service has a boundary. Systems designed to hold together under real-world pressure.",
  },
  {
    number: "02",
    title: "Ships to Production",
    desc: "Not just works locally. Every project I deliver handles real users, real traffic, and the edge cases that take products down at scale.",
  },
  {
    number: "03",
    title: "Full Ownership",
    desc: "From DB schema to UI. One engineer with complete context means no handoffs, no communication gaps, and nothing slipping through the cracks.",
  },
  {
    number: "04",
    title: "AI-Augmented Delivery",
    desc: "Agentic AI tools accelerate my research, implementation, and debugging while I own every technical decision and the quality of what ships.",
  },
  {
    number: "05",
    title: "Cross-Industry Range",
    desc: "Projects across fintech, energy, healthcare, mining, and e-commerce. Different domains, same quality bar. Adaptability is a technical skill.",
  },
  {
    number: "06",
    title: "Zero Ambiguity",
    desc: "You always know what is happening, what is blocked, and what ships next. Surprises belong in production monitoring, not in status updates.",
  },
];

export const experiences = [
  {
    company: "Rexta Technologies",
    role: "Software Engineer",
    period: "June 2025 to Present",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    highlights: [
      "Delivering client platforms from architecture through deployment and production support, across critical minerals trading, ESG reporting, publishing, real estate, e-commerce, and events",
      "Glore: owning the real-time layer of a critical minerals trading platform, streaming live prices to charts over WebSockets with Redis caching on an Express and PostgreSQL backend",
      "RIOS: architecting a multi-tenant ESG reporting SaaS that benchmarks against GRI, TCFD, and IFRS and generates branded PDF reports automatically",
      "Digital Hub Africa, Salmired, Dubai Avenue Scents, and DPA Summit: shipping a TipTap publishing magazine, a real estate listing platform, a WhatsApp-first storefront, and a Laravel event platform",
      "Integrating payment gateways, email delivery, and third-party APIs, and moving slow work into background jobs so user-facing pages stay fast",
    ],
  },
  {
    company: "Ascentor BI",
    role: "Software Engineer",
    period: "January 2024 to Present",
    location: "Lagos, Nigeria",
    type: "Contract",
    highlights: [
      "Engineering Ascentor's member platform, which grew from a mentorship community into a full leadership-development product covering AI coaching, live events and ticketing, payments, and a white-label partner programme",
      "Developing Sage, an AI leadership coach on the Anthropic Claude API, with retrieval over a mentor knowledge base in pgvector",
      "Integrating Paystack for subscriptions, donations, event tickets, and partner billing, with idempotent settlement driven by signed webhooks and daily reconciliation",
      "Delivering registration and ticketing for The Elevation Summit, with free and paid tickets, confirmation emails, and event-day access",
      "Securing member data with Supabase Row Level Security, strict Zod validation, rate limiting, CAPTCHA, and optional two-factor authentication for staff",
    ],
  },
  {
    company: "Athena Networks",
    role: "Software Engineer",
    period: "October 2025 to September 2026",
    location: "Australia (Remote)",
    type: "Full-time",
    highlights: [
      "Built MSP Reports, a white-label reporting platform that pulls data from 20+ tools, including Autotask, Datto, and BitDefender, into branded client reports with AI-generated executive summaries and multi-tenant isolation",
      "Delivered the Freedom Internet customer portal and the Crisp Wireless signup platform, streamlining customer onboarding",
      "Designed RESTful integrations and backend workflows that synchronized business-critical operations across multiple third-party vendors",
      "Hardened applications with input validation, rate limiting, and API protection, and improved page load speed and server response times",
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
      "Delivered a solar energy marketplace from scratch and supported it in production, connecting manufacturers, distributors, recyclers, and customers",
      "Developed the full-stack platform on Next.js, Express, PostgreSQL, Prisma, and Supabase",
      "Designed quote-based pricing and request workflows, role-based access for each stakeholder type, and a recycling network integration",
      "Added an AI chatbot and guided onboarding tours to help new users find their way around the platform",
      "Maintained the platform after launch, debugging and resolving production login issues",
    ],
  },
];

export const education = [
  {
    institution: "Federal University of Technology, Akure",
    credential: "Bachelor of Technology (B.Tech)",
    field: "Computer Information Systems",
    period: "Oct. 2021 - Jul. 2026",
    meta: "CGPA: 4.72 / 5.00",
    location: "Akure, Nigeria",
    type: "Degree",
  },
  {
    institution: "Amazon (via Coursera)",
    credential: "Professional Software Development Certification",
    field: "Software Development",
    period: "September 2026",
    meta: null,
    location: "Online",
    type: "Certificate",
  },
  {
    institution: "Aspire Institute",
    credential: "Aspire Leaders Program",
    field: "Organizational Leadership",
    period: "August 2025",
    meta: "In collaboration with Harvard Business School",
    location: "Global (Online)",
    type: "Program",
  },
  {
    institution: "Cipher Training and Software Development",
    credential: "Certificate of Completion",
    field: "Full Stack Web Development",
    period: "November 2025",
    meta: null,
    location: "Akure, Nigeria",
    type: "Certificate",
  },
  {
    institution: "NACOSS, FUTA Chapter",
    credential: "Emerging Award Winner",
    field: "2025 Annual Hackathon",
    period: "September 2025",
    meta: null,
    location: "Akure, Nigeria",
    type: "Award",
  },
];

export const testimonials = [
  {
    quote:
      "Kehinde delivered the entire Glore platform in record time. Clean architecture, real-time WebSocket pricing, and a polished UI that impressed every stakeholder. He thinks like an engineer and a product person at the same time.",
    name: "Oreoluwa Israel",
    role: "Founder",
    company: "Glore",
    initials: "OI",
  },
  {
    quote:
      "The RIOS platform is exactly what we needed. Multi-tenant ESG reporting with GRI and TCFD frameworks, all working out of the box. Kehinde understood the compliance requirements better than most engineers I have worked with.",
    name: "Tunbosun Afolayan",
    role: "Managing Director",
    company: "PRO ALLY",
    initials: "TA",
  },
  {
    quote:
      "Working with Kehinde on our customer portal and onboarding system was seamless. He built secure, scalable APIs and integrated everything we needed without cutting corners on performance or security.",
    name: "Josh Finlay",
    role: "Engineering Lead",
    company: "Athena Networks",
    initials: "JF",
  },
  {
    quote:
      "Kehinde built the Ren Power marketplace from scratch. The quote workflow, role-based dashboards, and the AI chatbot all work flawlessly in production. He is the kind of engineer you want owning the entire backend.",
    name: "Ayobami Olu",
    role: "CEO/Founder",
    company: "Ren Power Limited",
    initials: "AO",
  },
];

export const hero = {
  titleWords: ["Architecting", "systems.", "Shipping", "at", "scale."],
  intro:
    "Full-stack software engineer. Comfortable managing complexity. Always thinking ahead. I build software for the happy path, the edge cases, and everything in between.",
};

export const about = {
  heading: "Thinking in systems.",
  intro:
    "I start with the system, not the screen: how data flows, where each boundary sits, and what breaks first under real load. Get the structure right and the features follow, and the structure is what still stands years later.",
  philosophy:
    "I write code the way architects design buildings. Every function has a reason, every system has a blueprint, every decision has a consequence. I don't just build features. I build the foundations that features live on.",
  facts: [
    { label: "Based in", value: "Lagos, Nigeria" },
    { label: "Stack", value: "Full-Stack" },
    { label: "Focus", value: "Backend Systems" },
    { label: "Education", value: "B.Tech, FUTA" },
  ],
  pillars: [
    { title: "Clean Architecture", desc: "Systems that are easy to extend, impossible to misuse." },
    { title: "Performance First", desc: "Speed and reliability aren't features. They are baseline requirements." },
    { title: "Ship It", desc: "From concept to production. No endless refactors, no analysis paralysis." },
  ],
};
