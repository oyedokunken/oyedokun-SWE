import { llmsTxt } from "@/lib/agent/llms";

// Served at /llms.txt (https://llmstxt.org). Built in lib/agent/llms.ts from
// the same data as the page so the project list an agent reads can never
// drift from what's on the site.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
