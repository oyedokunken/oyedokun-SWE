import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function loadTemplate(name: string): string {
  const file = path.join(__dirname, "..", "templates", `${name}.html`);
  return fs.readFileSync(file, "utf-8");
}

function fill(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (t, [k, v]) => t.split(`{{${k}}}`).join(v),
    template
  );
}

export async function sendContactOwner(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const html = fill(loadTemplate("contact-owner"), {
    name: data.name,
    email: data.email,
    phone: data.phone || "Not provided",
    subject: data.subject,
    message: data.message,
    date: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
  });
  await transporter.sendMail({
    from: `"oyedokun.dev" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `New message: ${data.subject}`,
    html,
  });
}

export async function sendContactUser(data: { name: string; email: string }) {
  const html = fill(loadTemplate("contact-user"), {
    name: data.name,
  });
  await transporter.sendMail({
    from: `"Kehinde Oyedokun" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Got your message",
    html,
  });
}


