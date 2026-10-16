import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

// The mailer talks to SMTP, so every test runs against a mock.
vi.mock("../src/services/mailer", () => ({
  sendContactOwner: vi.fn().mockResolvedValue(undefined),
  sendContactUser: vi.fn().mockResolvedValue(undefined),
  sendResumeDelivery: vi.fn().mockResolvedValue(undefined),
  sendResumeOwner: vi.fn().mockResolvedValue(undefined),
}));

const mailer = await import("../src/services/mailer");
const { default: app } = await import("../src/index");

// The per-recipient limiter is in-memory and shared across tests, so each
// test uses its own address unless it is testing that limit.
let n = 0;
const uniqueEmail = () => `visitor${++n}@example.com`;

const contact = (overrides: Record<string, unknown> = {}) => ({
  name: "Ada Lovelace",
  email: uniqueEmail(),
  subject: "Project enquiry",
  message: "I'd like to talk about a backend project.",
  ...overrides,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("health and routing", () => {
  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("unknown routes return a JSON 404", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });

  it("sets security headers", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});

describe("CORS", () => {
  it("allows the production origin", async () => {
    const res = await request(app).get("/health").set("Origin", "https://www.oyedokun.dev");
    expect(res.headers["access-control-allow-origin"]).toBe("https://www.oyedokun.dev");
  });

  it("does not allow an unknown origin", async () => {
    const res = await request(app).get("/health").set("Origin", "https://evil.example");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

describe("POST /api/contact", () => {
  it("sends both emails for a valid message", async () => {
    const res = await request(app).post("/api/contact").send(contact());
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(mailer.sendContactOwner).toHaveBeenCalledOnce();
    expect(mailer.sendContactUser).toHaveBeenCalledOnce();
  });

  it("returns the first validation error", async () => {
    const res = await request(app).post("/api/contact").send(contact({ email: "nope" }));
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid email" });
    expect(mailer.sendContactOwner).not.toHaveBeenCalled();
  });

  it("pretends to succeed when the honeypot is filled", async () => {
    const res = await request(app).post("/api/contact").send(contact({ website: "spam.biz" }));
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(mailer.sendContactOwner).not.toHaveBeenCalled();
  });

  it("returns 500 without leaking details when sending fails", async () => {
    vi.mocked(mailer.sendContactOwner).mockRejectedValueOnce(new Error("SMTP auth failed"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await request(app).post("/api/contact").send(contact());
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to send. Please try again." });
  });

  it("rejects bodies over 10kb", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send(contact({ message: "x".repeat(11 * 1024) }));
    expect(res.status).toBe(413);
  });

  it("caps messages to the same recipient at 3 per hour", async () => {
    const email = uniqueEmail();
    for (let i = 0; i < 3; i++) {
      const ok = await request(app).post("/api/contact").send(contact({ email }));
      expect(ok.status).toBe(200);
    }
    const res = await request(app).post("/api/contact").send(contact({ email: email.toUpperCase() }));
    expect(res.status).toBe(429);
  });
});

describe("POST /api/resume", () => {
  it("delivers the resume for a valid request", async () => {
    const res = await request(app)
      .post("/api/resume")
      .send({ name: "Ada Lovelace", email: uniqueEmail() });
    expect(res.status).toBe(200);
    expect(mailer.sendResumeDelivery).toHaveBeenCalledOnce();
    expect(mailer.sendResumeOwner).toHaveBeenCalledOnce();
  });

  it("rejects a missing name", async () => {
    const res = await request(app).post("/api/resume").send({ email: uniqueEmail() });
    expect(res.status).toBe(400);
  });
});
