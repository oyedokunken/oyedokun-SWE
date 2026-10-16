import { NextResponse, type NextRequest } from "next/server";
import { negotiate } from "@/lib/agent/negotiate";
import { resolveMarkdown } from "@/lib/agent/markdown";

// Markdown content negotiation (https://acceptmarkdown.com). The same URL
// serves HTML to browsers and Markdown to clients that ask for text/markdown;
// unknown paths get a Markdown 404 body. Vary: Accept keeps caches from
// handing one representation to the other kind of client.

const isFrameworkRequest = (req: NextRequest) =>
  req.headers.has("rsc") || req.headers.has("next-router-prefetch") || req.headers.has("next-action");

export function proxy(req: NextRequest) {
  if ((req.method !== "GET" && req.method !== "HEAD") || isFrameworkRequest(req)) {
    return NextResponse.next();
  }

  const representation = negotiate(req.headers.get("accept"));

  if (representation === null) {
    return new NextResponse("406 Not Acceptable. Available representations: text/html, text/markdown.\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }

  if (representation === "markdown") {
    const { status, body } = resolveMarkdown(req.nextUrl.pathname);
    return new NextResponse(req.method === "HEAD" ? null : body, {
      status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Content-Length": String(new TextEncoder().encode(body).length),
      },
    });
  }

  const res = NextResponse.next();
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  // Pages only: skip Next internals and anything with a file extension
  // (static assets, /llms.txt, /sitemap.xml, /robots.txt).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
