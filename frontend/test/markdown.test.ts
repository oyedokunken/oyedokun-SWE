import { describe, expect, it } from "vitest";
import { resolveMarkdown } from "@/lib/agent/markdown";
import { projects } from "@/data/projects";
import { services } from "@/data/content";
import { infoPages } from "@/data/pages";

describe("resolveMarkdown", () => {
  it("renders the homepage with an H1 and all site content", () => {
    const { status, body } = resolveMarkdown("/");
    expect(status).toBe(200);
    expect(body.startsWith("# Oyedokun Kehinde")).toBe(true);
    for (const p of projects) expect(body).toContain(p.title);
    for (const s of services) expect(body).toContain(s.title);
    expect(body).toContain("https://www.oyedokun.dev/llms.txt");
  });

  it("keeps heading levels sequential with a single H1", () => {
    for (const path of ["/", ...infoPages.map((p) => p.path)]) {
      const levels = resolveMarkdown(path)
        .body.split("\n")
        .filter((l) => /^#{1,6} /.test(l))
        .map((l) => l.indexOf(" "));
      expect(levels[0]).toBe(1);
      expect(levels.filter((l) => l === 1)).toHaveLength(1);
      levels.slice(1).forEach((l, i) => expect(l).toBeLessThanOrEqual(levels[i] + 1));
    }
  });

  it.each(infoPages.map((p) => p.path))("renders %s with at least 500 characters", (path) => {
    const { status, body } = resolveMarkdown(path);
    expect(status).toBe(200);
    expect(body.length).toBeGreaterThanOrEqual(500);
  });

  it("matches paths with or without a trailing slash", () => {
    expect(resolveMarkdown("/about").body).toBe(resolveMarkdown("/about/").body);
  });

  it("returns a Markdown 404 that explains the error and links to llms.txt and the sitemap", () => {
    const { status, body } = resolveMarkdown("/__missing__/");
    expect(status).toBe(404);
    expect(body).toMatch(/^# 404 Not Found/);
    expect(body).toContain("/__missing__/");
    expect(body).toContain("(https://www.oyedokun.dev/llms.txt)");
    expect(body).toContain("(https://www.oyedokun.dev/sitemap.xml)");
  });
});
