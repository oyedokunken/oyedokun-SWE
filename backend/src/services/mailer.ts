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

const SOCIALS = `<div style="margin-top:14px;display:flex;gap:8px"><a href="https://linkedin.com/in/oyedokunken" style="display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#777;font-size:11px;text-decoration:none;padding:5px 13px;border-radius:4px;letter-spacing:0.3px">LinkedIn</a><a href="https://github.com/oyedokunken" style="display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#777;font-size:11px;text-decoration:none;padding:5px 13px;border-radius:4px;letter-spacing:0.3px">GitHub</a><a href="https://oyedokunken.vercel.app/" style="display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#777;font-size:11px;text-decoration:none;padding:5px 13px;border-radius:4px;letter-spacing:0.3px">Portfolio</a></div>`;

const BASE_STYLES = `*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e0e0e0}.outer{background:#0a0a0a;padding:40px 16px}.wrap{max-width:560px;margin:0 auto;background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden}.hdr{padding:28px 32px 24px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}.logo-row{display:flex;align-items:center;gap:11px}.logo-box{width:38px;height:38px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.logo-box span{font-size:14px;font-weight:800;color:#fff;letter-spacing:-0.5px;line-height:1}.logo-name{font-size:15px;font-weight:700;color:#fff;letter-spacing:-0.3px}.tag{display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);color:#666;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:4px 11px;border-radius:20px;white-space:nowrap}.bp{padding:28px 32px}h1{font-size:21px;font-weight:700;color:#fff;margin-bottom:6px;letter-spacing:-0.4px;line-height:1.3}.sub{color:#555;font-size:13px;margin-bottom:26px;line-height:1.5}.card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:18px 22px;margin-bottom:18px}.fd{margin-bottom:14px}.fd:last-child{margin-bottom:0}.lb{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4a4a4a;margin-bottom:4px}.val{font-size:14px;color:#d0d0d0;line-height:1.6}.val a{color:#777;text-decoration:none}.msg{background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.05);border-radius:6px;padding:14px;margin-top:8px;font-size:14px;color:#bbb;line-height:1.75}p.body-p{color:#777;font-size:14px;line-height:1.8;margin-bottom:13px}.attach-row{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:14px 18px;display:flex;align-items:center;gap:14px;margin:20px 0}.a-icon{width:40px;height:40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#777;flex-shrink:0;letter-spacing:0.5px}.a-name{font-size:13px;color:#ccc;font-weight:600;margin-bottom:3px}.a-sub{font-size:11px;color:#4a4a4a}.div{height:1px;background:rgba(255,255,255,0.05);margin:22px 0}.ft{padding:18px 32px 26px;border-top:1px solid rgba(255,255,255,0.06)}.ft-txt{font-size:11px;color:#3a3a3a;line-height:1.6}.ft-txt a{color:#4a4a4a;text-decoration:none}`;

const TEMPLATES = {
  "contact-owner": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Contact</title><style>${BASE_STYLES}</style></head><body><div class="outer"><div class="wrap"><div class="hdr"><div class="logo-row"><div class="logo-box"><span>ok</span></div><span class="logo-name">oyedokun.dev</span></div><span class="tag">Incoming message</span></div><div class="bp"><h1>New contact submission</h1><p class="sub">Someone reached out via your portfolio. Details below.</p><div class="card"><div class="fd"><div class="lb">From</div><div class="val">{{name}}</div></div><div class="fd"><div class="lb">Email</div><div class="val"><a href="mailto:{{email}}">{{email}}</a></div></div><div class="fd"><div class="lb">Phone</div><div class="val">{{phone}}</div></div><div class="fd"><div class="lb">Subject</div><div class="val">{{subject}}</div></div><div class="fd"><div class="lb">Message</div><div class="msg">{{message}}</div></div></div></div><div class="ft"><div class="ft-txt">Received on {{date}} &middot; <a href="https://oyedokunken.vercel.app/">oyedokun.dev</a></div>${SOCIALS}</div></div></div></body></html>`,

  "contact-user": `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Got your message</title><style>${BASE_STYLES}</style></head><body><div class="outer"><div class="wrap"><div class="hdr"><div class="logo-row"><div class="logo-box"><span>ok</span></div><span class="logo-name">oyedokun.dev</span></div><span class="tag">Acknowledged</span></div><div class="bp"><h1>Your message landed, {{name}}.</h1><p class="sub">Thanks for reaching out. I read every message personally.</p><p class="body-p">I'll get back to you within 24 to 48 hours. In the meantime, feel free to explore my work or connect on LinkedIn.</p><div class="div"></div></div><div class="ft"><div class="ft-txt">Kehinde Oyedokun &middot; <a href="mailto:oyedokunken@gmail.com">oyedokunken@gmail.com</a> &middot; <a href="https://oyedokunken.vercel.app/">oyedokun.dev</a></div>${SOCIALS}</div></div></div></body></html>`,




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


