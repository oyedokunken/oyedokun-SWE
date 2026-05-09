import { Router, Request, Response } from "express";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { sendContactOwner, sendContactUser } from "../services/mailer";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject too short"),
  message: z.string().min(10, "Message too short"),
});

const LOG_PATH = path.join(__dirname, "..", "..", "data", "contacts.json");

function appendLog(entry: object) {
  let records: object[] = [];
  if (fs.existsSync(LOG_PATH)) {
    const raw = fs.readFileSync(LOG_PATH, "utf-8");
    try { records = JSON.parse(raw); } catch { records = []; }
  }
  records.push({ ...entry, timestamp: new Date().toISOString() });
  fs.writeFileSync(LOG_PATH, JSON.stringify(records, null, 2));
}

router.post("/", async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0].message });
    return;
  }

  const { name, email, phone, subject, message } = parsed.data;

  try {
    await Promise.all([
      sendContactOwner({ name, email, phone, subject, message }),
      sendContactUser({ name, email }),
    ]);
    try { appendLog({ name, email, phone, subject, message }); } catch { /* read-only fs on Vercel */ }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
});

export default router;
