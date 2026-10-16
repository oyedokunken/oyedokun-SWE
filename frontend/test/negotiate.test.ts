import { describe, expect, it } from "vitest";
import { negotiate } from "@/lib/agent/negotiate";

describe("negotiate", () => {
  it.each([
    [null, "html"],
    ["", "html"],
    ["*/*", "html"],
    ["text/html", "html"],
    ["text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", "html"],
    ["text/*", "html"],
  ])("serves HTML for %j", (accept, expected) => {
    expect(negotiate(accept)).toBe(expected);
  });

  it.each([
    ["text/markdown", "markdown"],
    ["text/markdown, */*", "markdown"],
    ["text/markdown, text/html", "markdown"],
    ["text/html;q=0.5, text/markdown", "markdown"],
    ["text/markdown;charset=utf-8;q=0.9, text/html;q=0.8", "markdown"],
    ["text/x-markdown", "markdown"],
    ["TEXT/MARKDOWN", "markdown"],
  ])("serves Markdown for %j", (accept, expected) => {
    expect(negotiate(accept)).toBe(expected);
  });

  it("honours q-values that prefer HTML", () => {
    expect(negotiate("text/markdown;q=0.5, text/html")).toBe("html");
    expect(negotiate("text/html, text/markdown;q=0.9")).toBe("html");
  });

  it("treats q=0 as not acceptable", () => {
    expect(negotiate("text/markdown;q=0, */*")).toBe("html");
    expect(negotiate("text/html;q=0, */*")).toBe("markdown");
  });

  it("returns null (406) when neither representation is acceptable", () => {
    expect(negotiate("application/json")).toBeNull();
    expect(negotiate("image/png, application/pdf")).toBeNull();
    expect(negotiate("text/html;q=0, text/markdown;q=0")).toBeNull();
  });

  it("falls back to HTML for unparseable headers", () => {
    expect(negotiate("garbage")).toBe("html");
  });
});
