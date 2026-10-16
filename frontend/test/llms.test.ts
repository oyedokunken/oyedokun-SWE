import { describe, expect, it } from "vitest";
import { llmsTxt } from "@/lib/agent/llms";
import { projects } from "@/data/projects";
import { infoPages } from "@/data/pages";

const body = llmsTxt();
const lines = body.split("\n");

describe("llms.txt", () => {
  it("starts with an H1 followed by a blockquote summary", () => {
    expect(lines[0]).toMatch(/^# \S/);
    expect(lines.slice(1).find((l) => l.trim() !== "")).toMatch(/^> /);
  });

  it("has exactly one H1 and otherwise only H2 headings", () => {
    const headings = lines.filter((l) => l.startsWith("#"));
    expect(headings.filter((h) => h.startsWith("# "))).toHaveLength(1);
    expect(headings.every((h) => /^#{1,2} /.test(h))).toBe(true);
  });

  it("uses only `- [name](url): notes` items inside H2 sections", () => {
    const firstH2 = lines.findIndex((l) => l.startsWith("## "));
    const sectionLines = lines.slice(firstH2).filter((l) => l.trim() && !l.startsWith("## "));
    for (const line of sectionLines) expect(line).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)\s]+\)(: .+)?$/);
  });

  it("includes a when-to-use section with concrete use cases", () => {
    const start = lines.indexOf("## When to use");
    expect(start).toBeGreaterThan(0);
    const end = lines.findIndex((l, i) => i > start && l.startsWith("## "));
    const items = lines.slice(start + 1, end).filter((l) => l.startsWith("- ["));
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("lists every project and trust page, with Optional last", () => {
    for (const p of projects) expect(body).toContain(`[${p.title}](`);
    for (const p of infoPages) expect(body).toContain(`https://www.oyedokun.dev${p.path}`);
    const h2s = lines.filter((l) => l.startsWith("## "));
    expect(h2s[h2s.length - 1]).toBe("## Optional");
  });
});
