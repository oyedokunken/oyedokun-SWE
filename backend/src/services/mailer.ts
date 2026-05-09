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

function fill(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (t, [k, v]) => t.split(`{{${k}}}`).join(v),
    template
  );
}

const TEMPLATES = {
  "contact-owner": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Contact Message</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e0e0e0}.wrap{max-width:600px;margin:0 auto;padding:40px 20px}.logo-bar{display:flex;align-items:center;gap:12px;margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08)}.logo-text{font-size:18px;font-weight:700;letter-spacing:-0.5px;color:#fff}.tag{display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:2px;margin-bottom:24px}h1{font-size:26px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-0.5px}.sub{color:#666;font-size:14px;margin-bottom:32px}.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:24px;margin-bottom:20px}.field{margin-bottom:18px}.field:last-child{margin-bottom:0}.label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:6px}.value{font-size:15px;color:#ddd;line-height:1.6}.message-box{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:16px;margin-top:8px}.footer{margin-top:40px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);font-size:12px;color:#444}a{color:#888}</style></head><body><div class="wrap"><div class="logo-bar"><span class="logo-text">oyedokun.dev</span></div><div class="tag">Incoming message</div><h1>New contact submission</h1><p class="sub">Someone reached out via your portfolio. Details below.</p><div class="card"><div class="field"><div class="label">From</div><div class="value">{{name}}</div></div><div class="field"><div class="label">Email</div><div class="value"><a href="mailto:{{email}}">{{email}}</a></div></div><div class="field"><div class="label">Phone</div><div class="value">{{phone}}</div></div><div class="field"><div class="label">Subject</div><div class="value">{{subject}}</div></div><div class="field"><div class="label">Message</div><div class="message-box value">{{message}}</div></div></div><div class="footer">Received on {{date}} &middot; oyedokun.dev</div></div></body></html>`,

  "contact-user": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Got your message</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e0e0e0}.wrap{max-width:600px;margin:0 auto;padding:40px 20px}.logo-bar{display:flex;align-items:center;gap:12px;margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08)}.logo-text{font-size:18px;font-weight:700;letter-spacing:-0.5px;color:#fff}.tag{display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:2px;margin-bottom:24px}h1{font-size:26px;font-weight:700;color:#fff;margin-bottom:16px;letter-spacing:-0.5px}p{color:#888;font-size:15px;line-height:1.7;margin-bottom:16px}.divider{height:1px;background:rgba(255,255,255,0.06);margin:32px 0}.footer{font-size:12px;color:#444}a{color:#888}</style></head><body><div class="wrap"><div class="logo-bar"><span class="logo-text">oyedokun.dev</span></div><div class="tag">Acknowledged</div><h1>Your message landed, {{name}}.</h1><p>Thanks for reaching out. I read every message personally and will get back to you within 24 to 48 hours.</p><p>In the meantime, feel free to explore my work or connect on LinkedIn.</p><div class="divider"></div><div class="footer">Kehinde Oyedokun &middot; <a href="https://oyedokunken.vercel.app/">oyedokun.dev</a> &middot; <a href="mailto:oyedokunken@gmail.com">oyedokunken@gmail.com</a></div></div></body></html>`,




} as const;

export async function sendContactOwner(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const html = fill(TEMPLATES["contact-owner"], {
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
  const html = fill(TEMPLATES["contact-user"], {
    name: data.name,
  });
  await transporter.sendMail({
    from: `"Kehinde Oyedokun" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: "Got your message",
    html,
  });
}


