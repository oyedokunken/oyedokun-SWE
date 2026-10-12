import { z } from "zod";

const text = (min: number, max: number, label: string) =>
  z
    .string()
    .trim()
    .min(min, `${label} too short`)
    .max(max, `${label} too long`);

const email = z.string().trim().toLowerCase().email("Invalid email").max(254, "Email too long");

// "website" is a honeypot: real users never see or fill it.
const honeypot = z.string().max(500).optional();

export const contactSchema = z.object({
  name: text(2, 100, "Name"),
  email,
  phone: z.string().trim().max(30, "Phone too long").optional(),
  subject: text(3, 150, "Subject"),
  message: text(10, 5000, "Message"),
  website: honeypot,
});

export const resumeSchema = z.object({
  name: text(2, 100, "Name"),
  email,
  website: honeypot,
});
