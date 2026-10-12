import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRouter from "./routes/contact";
import resumeRouter from "./routes/resume";

const app = express();

// Behind Vercel's proxy: must be set before anything reads req.ip.
app.set("trust proxy", 1);

const DEFAULT_ORIGINS = [
  "https://www.oyedokun.dev",
  "https://oyedokun.dev",
  "https://oyedokunken.vercel.app",
];
const DEV_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

// FRONTEND_URL may hold a comma-separated list. There is no wildcard fallback.
const allowedOrigins = new Set([
  ...DEFAULT_ORIGINS,
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean),
  ...(process.env.NODE_ENV === "production" ? [] : DEV_ORIGINS),
]);

app.use(helmet());
app.use(
  cors({
    origin(origin, cb) {
      // No Origin header: same-origin or non-browser request (health checks, curl).
      if (!origin || allowedOrigins.has(origin)) return cb(null, true);
      cb(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please wait and try again." },
});

app.use("/api", limiter);
app.use("/api/contact", contactRouter);
app.use("/api/resume", resumeRouter);

app.get("/", (_req, res) => res.json({ status: "ok", service: "oyedokun.dev API" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.use((err: Error & { status?: number; type?: string }, _req: Request, res: Response, _next: NextFunction) => {
  if (err.type === "entity.too.large") {
    res.status(413).json({ error: "Request too large." });
    return;
  }
  if (err.status && err.status < 500) {
    res.status(err.status).json({ error: "Invalid request." });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

// Vercel invokes the exported app as a function; only listen when run directly.
if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT) || 4000;
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

export default app;
