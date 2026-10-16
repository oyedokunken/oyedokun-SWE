// Content negotiation between HTML and Markdown for the Accept header
// (RFC 9110 §12.5.1, text/markdown per RFC 7763).
//
// - Each representation takes the q of its most specific matching media range
//   (exact type > type/* > */*). q=0 means "not acceptable".
// - The highest q wins. On a tie, the more specific match wins, so
//   "text/markdown, */*" prefers Markdown while a bare "*/*" (curl's default)
//   stays HTML. When both are named explicitly with the same q, Markdown wins:
//   browsers never name text/markdown, so a client that does is asking for it.
// - Returns null when neither can be served, which callers answer with 406.

export type Representation = "html" | "markdown";

const OFFERS: Record<Representation, string[]> = {
  html: ["text/html", "application/xhtml+xml"],
  markdown: ["text/markdown", "text/x-markdown"],
};

interface MediaRange {
  type: string;
  subtype: string;
  q: number;
}

function parseAccept(header: string): MediaRange[] {
  const ranges: MediaRange[] = [];
  for (const part of header.split(",")) {
    const [range, ...params] = part.trim().split(";");
    const [type, subtype] = range.trim().toLowerCase().split("/");
    if (!type || !subtype) continue;

    let q = 1;
    for (const param of params) {
      const [key, value] = param.trim().split("=");
      if (key?.trim().toLowerCase() === "q") {
        const parsed = Number(value);
        q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0;
      }
    }
    ranges.push({ type, subtype, q });
  }
  return ranges;
}

// q and specificity (2 exact, 1 type/*, 0 */*) of the best range matching a type.
function match(ranges: MediaRange[], mime: string): { q: number; specificity: number } | null {
  const [type, subtype] = mime.split("/");
  let best: { q: number; specificity: number } | null = null;
  for (const r of ranges) {
    const specificity =
      r.type === type && r.subtype === subtype ? 2 : r.type === type && r.subtype === "*" ? 1 : r.type === "*" && r.subtype === "*" ? 0 : -1;
    if (specificity < 0) continue;
    if (!best || specificity > best.specificity) best = { q: r.q, specificity };
  }
  return best;
}

// The first offer is the canonical type; aliases (application/xhtml+xml,
// text/x-markdown) only count when named exactly, so "text/html;q=0, */*"
// can't sneak HTML back in through the xhtml alias matching */*.
function score(ranges: MediaRange[], rep: Representation) {
  const [canonical, ...aliases] = OFFERS[rep];
  let best = match(ranges, canonical);
  for (const mime of aliases) {
    const m = match(ranges, mime);
    if (m?.specificity === 2 && (!best || m.q > best.q || (m.q === best.q && m.specificity > best.specificity))) {
      best = m;
    }
  }
  return best;
}

export function negotiate(accept: string | null | undefined): Representation | null {
  if (!accept || !accept.trim()) return "html";
  const ranges = parseAccept(accept);
  if (ranges.length === 0) return "html";

  const html = score(ranges, "html");
  const markdown = score(ranges, "markdown");
  const htmlQ = html?.q ?? 0;
  const mdQ = markdown?.q ?? 0;

  if (htmlQ <= 0 && mdQ <= 0) return null;
  if (mdQ !== htmlQ) return mdQ > htmlQ ? "markdown" : "html";
  if (markdown!.specificity !== html!.specificity) {
    return markdown!.specificity > html!.specificity ? "markdown" : "html";
  }
  return markdown!.specificity === 2 ? "markdown" : "html";
}
