import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const request = (path: string, headers: Record<string, string> = {}, method = "GET") =>
  new NextRequest(new URL(path, "https://www.oyedokun.dev"), { headers, method });

describe("proxy", () => {
  it("serves Markdown with Vary: Accept when asked for text/markdown", async () => {
    const res = proxy(request("/", { accept: "text/markdown" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(await res.text()).toMatch(/^# Oyedokun Kehinde/);
  });

  it("passes HTML requests through and adds Vary: Accept", () => {
    const res = proxy(request("/", { accept: "text/html" }));
    expect(res.headers.get("x-middleware-next")).toBe("1");
    expect(res.headers.get("vary")).toBe("Accept");
  });

  it("returns a Markdown 404 for unknown paths", async () => {
    const res = proxy(request("/__ora-404-probe__/", { accept: "text/markdown" }));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect((await res.text()).length).toBeGreaterThan(20);
  });

  it("returns 406 when no supported representation is acceptable", () => {
    const res = proxy(request("/", { accept: "application/json" }));
    expect(res.status).toBe(406);
    expect(res.headers.get("vary")).toBe("Accept");
  });

  it("sends headers but no body for HEAD", async () => {
    const res = proxy(request("/about/", { accept: "text/markdown" }, "HEAD"));
    expect(res.status).toBe(200);
    expect(Number(res.headers.get("content-length"))).toBeGreaterThan(500);
    expect(await res.text()).toBe("");
  });

  it("leaves framework and non-GET requests alone", () => {
    for (const res of [
      proxy(request("/", { accept: "application/json", rsc: "1" })),
      proxy(request("/", { accept: "application/json" }, "POST")),
    ]) {
      expect(res.headers.get("x-middleware-next")).toBe("1");
    }
  });
});
