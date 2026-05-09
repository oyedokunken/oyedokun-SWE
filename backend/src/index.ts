import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRouter from "./routes/contact";
import resumeRouter from "./routes/resume";

const app = express();

app.use(helmet());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests. Please wait and try again." },
});

app.use("/api", limiter);
app.use("/api/contact", contactRouter);
app.use("/api/resume", resumeRouter);

app.get("/", (_req, res) => res.json({ status: "ok", service: "oyedokun.dev API" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

export default app;
