import type { NextFunction, Request, Response } from "express";

// Best-effort per-recipient cap so the API can't be used to mail one
// address repeatedly. In-memory, so it resets on cold starts and is per
// serverless instance; the IP rate limiter is the primary defence.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

export function recipientLimit(req: Request, res: Response, next: NextFunction) {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (!email) return next();

  const now = Date.now();
  const recent = (hits.get(email) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    res.status(429).json({ error: "Too many requests for this email. Please try again later." });
    return;
  }
  recent.push(now);
  hits.set(email, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  next();
}
