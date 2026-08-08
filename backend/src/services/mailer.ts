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

const LOGO_SVG = `<svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;flex-shrink:0"><rect width="40" height="40" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><circle cx="20" cy="20" r="7" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="none"/><path d="M25 15 L32 15 L32 22 L26 28" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="20" cy="20" r="2.5" fill="rgba(255,255,255,0.85)"/></svg>`;

const SOCIAL_FOOTER = `<div style="padding:20px 32px 26px;display:flex;gap:16px;align-items:center;justify-content:center"><a href="https://www.linkedin.com/in/oyedokun" title="LinkedIn" style="text-decoration:none;display:inline-block"><img src="https://oyedokunken.vercel.app/email-icons/linkedin.png" width="22" height="22" alt="LinkedIn" style="display:block"/></a><a href="https://github.com/oyedokunken" title="GitHub" style="text-decoration:none;display:inline-block"><img src="https://oyedokunken.vercel.app/email-icons/github.png" width="22" height="22" alt="GitHub" style="display:block"/></a><a href="https://www.instagram.com/oyedokunken" title="Instagram" style="text-decoration:none;display:inline-block"><img src="https://oyedokunken.vercel.app/email-icons/instagram.png" width="22" height="22" alt="Instagram" style="display:block"/></a><a href="https://www.behance.net/oyedokun" title="Behance" style="text-decoration:none;display:inline-block"><img src="https://oyedokunken.vercel.app/email-icons/behance.png" width="22" height="22" alt="Behance" style="display:block"/></a><a href="https://www.facebook.com/oyedokunken/" title="Facebook" style="text-decoration:none;display:inline-block"><img src="https://oyedokunken.vercel.app/email-icons/facebook.png" width="22" height="22" alt="Facebook" style="display:block"/></a></div>`


const BASE_STYLES = `*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e0e0e0}.outer{background:#0a0a0a;padding:40px 16px}.wrap{max-width:560px;margin:0 auto;background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden}.hdr{padding:26px 32px;display:flex;align-items:center;gap:11px}.logo-name{font-size:15px;font-weight:700;color:#fff;letter-spacing:-0.3px}.lo-fade{opacity:0.35}.divider{height:1px;background:rgba(255,255,255,0.07);margin:0}.bp{padding:28px 32px}.tag{display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);color:#666;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:4px 11px;border-radius:20px;margin-bottom:20px}h1{font-size:21px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-0.4px;line-height:1.3}.sub{color:#555;font-size:13px;margin-bottom:24px;line-height:1.5}.card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:18px 22px;margin-bottom:18px}.fd{margin-bottom:14px}.fd:last-child{margin-bottom:0}.lb{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4a4a4a;margin-bottom:4px}.val{font-size:14px;color:#d0d0d0;line-height:1.6}.val a{color:#777;text-decoration:none}.msg{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:14px;margin-top:8px;font-size:14px;color:#bbb;line-height:1.75}p.body-p{color:#777;font-size:14px;line-height:1.8;margin-bottom:13px}.attach-row{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:14px 18px;display:flex;align-items:center;gap:14px;margin:20px 0}.a-icon{width:40px;height:40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#777;flex-shrink:0;letter-spacing:0.5px}.a-name{font-size:13px;color:#ccc;font-weight:600;margin-bottom:3px}.a-sub{font-size:11px;color:#4a4a4a}.div{height:1px;background:rgba(255,255,255,0.05);margin:22px 0}.ft{padding:18px 32px 26px;border-top:1px solid rgba(255,255,255,0.06)}.ft-txt{font-size:11px;color:#3a3a3a;line-height:1.6}.ft-txt a{color:#4a4a4a;text-decoration:none}`;

const TEMPLATES = {
  "contact-owner": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Contact</title><style>${BASE_STYLES}</style></head><body><div class="outer"><div class="wrap"><div class="hdr"><a href="https://www.oyedokun.dev/" style="text-decoration:none"><span class="logo-name">oyedokun<span class="lo-fade">.dev</span></span></a></div><div class="divider"></div><div class="bp"><span class="tag">Incoming message</span><h1>New contact submission</h1><p class="sub">Someone reached out via your portfolio. Details below.</p><div class="card"><div class="fd"><div class="lb">From</div><div class="val">{{name}}</div></div><div class="fd"><div class="lb">Email</div><div class="val"><a href="mailto:{{email}}">{{email}}</a></div></div><div class="fd"><div class="lb">Phone</div><div class="val">{{phone}}</div></div><div class="fd"><div class="lb">Subject</div><div class="val">{{subject}}</div></div><div class="fd"><div class="lb">Message</div><div class="msg">{{message}}</div></div></div></div><div class="divider"></div>${SOCIAL_FOOTER}</div></div></body></html>`,

  "contact-user": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>I got your message</title><style>${BASE_STYLES}</style></head><body><div class="outer"><div class="wrap"><div class="hdr"><a href="https://www.oyedokun.dev/" style="text-decoration:none"><span class="logo-name">oyedokun<span class="lo-fade">.dev</span></span></a></div><div class="divider"></div><div class="bp"><span class="tag">Acknowledged</span><h1>I got your message.</h1><p class="sub">Your message has been received, {{name}}.</p><p class="body-p">I read every message personally and will get back to you within 24 to 48 hours.</p></div><div class="divider"></div>${SOCIAL_FOOTER}</div></div></body></html>`,




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


