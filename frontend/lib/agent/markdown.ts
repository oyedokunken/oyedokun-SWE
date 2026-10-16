import { about, education, experiences, hero, principles, services, testimonials } from "@/data/content";
import { infoPages, SITE_URL, contactDetails, type InfoPage, type InfoLink } from "@/data/pages";
import { projects } from "@/data/projects";
import stack from "@/data/stack.json";

// Markdown representations of the site's pages, served to clients that send
// `Accept: text/markdown` (see proxy.ts). Built from the same data as the HTML.

export interface MarkdownResult {
  status: 200 | 404;
  body: string;
}

const abs = (href: string) => (href.startsWith("/") ? `${SITE_URL}${href}` : href);
const link = (l: InfoLink) => `- [${l.label}](${abs(l.href)})${l.note ? `: ${l.note}` : ""}`;

export function homeMarkdown(): string {
  const out: string[] = [
    "# Oyedokun Kehinde — Full-stack Software Engineer",
    "",
    `> ${hero.intro}`,
    "",
    `${hero.titleWords.join(" ")} Based in Lagos, Nigeria; open to remote and hybrid software engineering roles, freelance and contract work worldwide.`,
    "",
    "## About",
    "",
    `### ${about.heading}`,
    "",
    about.intro,
    "",
    about.philosophy,
    "",
    ...about.facts.map((f) => `- ${f.label}: ${f.value}`),
    "",
    ...about.pillars.map((p) => `- **${p.title}**: ${p.desc}`),
    "",
    "## Services",
    "",
    ...services.map((s) => `- **${s.title}**: ${s.desc} (${s.tags.join(", ")})`),
    "",
    "## Why work with me",
    "",
    ...principles.map((p) => `- **${p.title}**: ${p.desc}`),
    "",
    "## Projects",
    "",
    ...projects.map((p) => {
      const url = p.live ?? p.github;
      const title = url ? `[${p.title}](${url})` : p.title;
      const source = p.github && p.github !== url ? ` Source: ${p.github}` : "";
      return `- **${title}** (${p.category}): ${p.desc} Stack: ${p.tags.join(", ")}.${source}`;
    }),
    "",
    "## Experience",
    "",
  ];

  for (const e of experiences) {
    out.push(`### ${e.role}, ${e.company}`, "", `${e.period} · ${e.type} · ${e.location}`, "");
    out.push(...e.highlights.map((h) => `- ${h}`), "");
  }

  out.push(
    "## Education and credentials",
    "",
    ...education.map(
      (e) => `- **${e.credential}**, ${e.field}: ${e.institution}, ${e.period}${e.meta ? ` (${e.meta})` : ""}`
    ),
    "",
    "## Testimonials",
    "",
    ...testimonials.flatMap((t) => [`> ${t.quote}`, ">", `> — ${t.name}, ${t.role}, ${t.company}`, ""]),
    "## Stack",
    "",
    ...stack.groups.map((g) => `- ${g.label}: ${g.skills.map((s) => s.name).join(", ")}`),
    "",
    "## Contact",
    "",
    `- Email: ${contactDetails.email}`,
    `- Phone: ${contactDetails.phone}`,
    `- [WhatsApp](${contactDetails.whatsapp})`,
    `- [LinkedIn](${contactDetails.linkedin})`,
    `- [GitHub](${contactDetails.github})`,
    "",
    "## More",
    "",
    ...infoPages.map((p) => `- [${p.label}](${abs(p.path)}): ${p.description}`),
    `- [llms.txt](${SITE_URL}/llms.txt): Summary and when-to-use guidance for agents`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    ""
  );

  return out.join("\n");
}

export function infoPageMarkdown(page: InfoPage): string {
  const out: string[] = [`# ${page.title}`, "", page.intro, ""];
  if (page.updated) out.push(`_Last updated: ${page.updated}_`, "");
  for (const section of page.sections) {
    out.push(`## ${section.heading}`, "");
    for (const p of section.paragraphs ?? []) out.push(p, "");
    if (section.items?.length) out.push(...section.items.map((i) => `- ${i}`), "");
    if (section.links?.length) out.push(...section.links.map(link), "");
  }
  return out.join("\n");
}

export function notFoundMarkdown(pathname: string): string {
  return [
    "# 404 Not Found",
    "",
    `There is no page at \`${pathname}\` on oyedokun.dev. It may have moved, or the address may be mistyped.`,
    "",
    "Start from one of these instead:",
    "",
    `- [Home](${SITE_URL}/): Portfolio of Oyedokun Kehinde, full-stack software engineer`,
    `- [llms.txt](${SITE_URL}/llms.txt): Site summary and when-to-use guidance for agents`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Every public page`,
    "",
  ].join("\n");
}

function normalize(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function resolveMarkdown(pathname: string): MarkdownResult {
  const path = normalize(pathname);
  if (path === "/") return { status: 200, body: homeMarkdown() };
  const page = infoPages.find((p) => p.path === path);
  if (page) return { status: 200, body: infoPageMarkdown(page) };
  return { status: 404, body: notFoundMarkdown(pathname) };
}
