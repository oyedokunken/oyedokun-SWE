import { Router, Request, Response } from "express";
import { contactSchema } from "../validation";
import { recipientLimit } from "../recipientLimit";
import { sendContactOwner, sendContactUser } from "../services/mailer";

const router = Router();

router.post("/", recipientLimit, async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors[0].message });
    return;
  }

  const { website, ...data } = parsed.data;
  if (website) {
    // Honeypot tripped: pretend success so bots learn nothing.
    res.json({ ok: true });
    return;
  }

  try {
    await Promise.all([sendContactOwner(data), sendContactUser({ name: data.name, email: data.email })]);
    res.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err instanceof Error ? err.message : err);
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
});

export default router;
