import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import MarqueeSection from "@/components/sections/MarqueeSection";
import PhotoScroll, { photos } from "@/components/sections/PhotoScroll";
import Hero from "@/components/sections/Hero";

// Server HTML is what agents and no-JS clients read, and what LCP is measured on.
describe("server-rendered HTML", () => {
  it("renders each marquee item once (loop copies are added after hydration)", () => {
    const html = renderToString(<MarqueeSection />);
    expect(html.match(/TypeScript/g)).toHaveLength(1);
    expect(html).not.toContain('aria-hidden="true"');
  });

  it("renders each photo once with a fixed-size srcset", () => {
    const html = renderToString(<PhotoScroll />);
    const imgs = html.match(/<img\b[^>]*>/g) ?? [];
    expect(imgs).toHaveLength(photos.length);
    for (const img of imgs) {
      const srcset = img.match(/srcSet="([^"]+)"/)?.[1] ?? "";
      expect(srcset.split(",")).toHaveLength(2);
    }
  });

  it("keeps the hero headline and intro visible before the preloader finishes", () => {
    const html = renderToString(<Hero />);
    const h1 = html.match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? "";
    expect(h1).toContain("Architecting");
    expect(h1).not.toMatch(/opacity:\s*0/);
    expect(html).toContain("happy path");
  });
});
