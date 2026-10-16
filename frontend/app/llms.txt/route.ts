import { projects } from "@/data/projects";
import stack from "@/data/stack.json";

// Served at /llms.txt (https://llmstxt.org). Generated from the same data as the
// page so the project list an agent reads can never drift from what's on the site.
export const dynamic = "force-static";

const INTRO = `
# Oyedokun Kehinde — oyedokun.dev

> Full-stack Software Engineer. Backend architecture, distributed systems, SaaS products, MERN and PERN stacks. Architecting systems. Shipping at scale.

Oyedokun Kehinde (oyedokunken) is a full-stack software engineer specializing in backend architecture, distributed systems, and modern frontend engineering. He builds reliable, scalable products from concept to deployment and is open to remote and hybrid SWE roles worldwide.

## About

- Name: Oyedokun Kehinde
- Role: Full-stack Software Engineer
- Focus: Backend architecture, distributed systems, full-stack development, SaaS products
- Stacks: MERN, PERN, Next.js, Node.js, TypeScript, PostgreSQL, Prisma
- Availability: Remote and hybrid SWE roles, freelance and contract work worldwide
- Location: Lagos, Nigeria (works globally)

## Contact & Profiles

- Website: https://www.oyedokun.dev/
- Email: hello@oyedokun.dev
- GitHub: https://github.com/oyedokunken/
- LinkedIn: https://www.linkedin.com/in/oyedokunken/
- X/Twitter: https://x.com/oyedokunken_
- Instagram: https://www.instagram.com/oyedokunken

## Key Pages

- [Home](https://www.oyedokun.dev/): Portfolio homepage — about, services, projects, experience, contact
- [Sitemap](https://www.oyedokun.dev/sitemap.xml): XML sitemap

## Services

Backend engineering, full-stack development, SaaS product development, API development, systems architecture, WordPress development, and technical consultation.
`.trim();

export function GET() {
  const projectLines = projects.map((p) => {
    const link = p.live ?? p.github;
    const source = p.github && p.github !== link ? ` Source: ${p.github}` : "";
    return `- [${p.title}](${link}): ${p.desc} Stack: ${p.tags.join(", ")}.${source}`;
  });

  const stackLines = stack.groups.map(
    (g) => `- ${g.label}: ${g.skills.map((s) => s.name).join(", ")}`
  );

  const body = [INTRO, "## Projects", ...projectLines, "", "## Stack", ...stackLines, ""].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
