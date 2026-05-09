# oyedokun.dev

Personal portfolio and API backend for **Oyedokun Kehinde Joshua** — Software Engineer.

Live at [oyedokun.dev](https://oyedokun.dev)

---

## Repository

[github.com/oyedokunken/oyedokun-SWE](https://github.com/oyedokunken/oyedokun-SWE)

```
oyedokun/
  frontend/   Next.js 14 portfolio (Vercel)
  backend/    Express.js API (Vercel Serverless)
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions |
| Lucide React | Icon library |
| react-phone-number-input | Phone field with country selector |
| Zod | Client-side form validation |
| Axios | HTTP client |

### Backend

| Technology | Purpose |
|---|---|
| Express.js 4 | HTTP server |
| TypeScript | Type safety |
| Nodemailer | SMTP email delivery (Gmail) |
| Zod | Request validation |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| dotenv | Environment config |

---

## Features

- Preloader with circular SVG progress ring
- Dark mode default with light mode toggle
- Scroll-spy navigation with active section highlight
- Hero section with animated image, mobile-first layout
- Skills grid (30+ technologies grouped by category)
- Services section (9 services including API Design, Security, SaaS, DevOps)
- Projects grid (12 projects, filterable by category)
- Experience timeline (5 concurrent roles)
- Testimonials section
- Photo scroll marquee
- Contact form with phone input (react-phone-number-input)
- Resume request modal (email delivery via Nodemailer)
- Open Graph metadata with custom OG image
- Sitemap and robots.txt for SEO
- Responsive across all screen sizes

---

## Projects Showcased

| Project | Category | Live |
|---|---|---|
| Credence | Blockchain | credencely.vercel.app |
| Glore | Platform | gloreenergy.com |
| Ren Power | Platform | renpowerltd.com |
| RIOS | SaaS | Private |
| TitanBid | SaaS / AI | titan-bid-frontend.vercel.app |
| Traqify | SaaS | traqify.vercel.app |
| GramOne | Platform | gramone.vercel.app |
| Dubai Avenue Scents | E-commerce | dubaiavenuescent.com |
| DPA Summit | Platform | digitalprocurement.africa |
| FUTA HMS | Healthcare | futahms.vercel.app |
| EduPilot | EdTech | edupilotly.vercel.app |
| Rexta Technologies | Agency | rexta.vercel.app |

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

Frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:4000
```

Backend `.env`:
```
PORT=4000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your_personal_email@gmail.com
```

> Gmail requires an App Password (not your account password). Generate one at myaccount.google.com/apppasswords with 2FA enabled.

### Resume PDF

Place your resume at `backend/resume.pdf`. The backend attaches it automatically when a resume request is received.

---

## API Endpoints

### POST /api/contact

Sends a contact message to the owner and a confirmation to the sender.

```json
{
  "name": "string (min 2)",
  "email": "string (valid email)",
  "phone": "string (E.164 format)",
  "subject": "string (min 3)",
  "message": "string (min 10)"
}
```

### POST /api/resume

Sends the resume PDF to the requester's email.

```json
{
  "name": "string (min 2)",
  "email": "string (valid email)"
}
```

### GET /health

Returns `{ "status": "ok" }`.

---

## Deployment

See `frontend/DEPLOY.md` and `backend/DEPLOY.md` for step-by-step Vercel deployment instructions.

---

## Contact

Email: oyedokunken@gmail.com  
LinkedIn: linkedin.com/in/oyedokunken  
GitHub: github.com/oyedokunken/oyedokun-SWE
