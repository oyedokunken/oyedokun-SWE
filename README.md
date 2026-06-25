# oyedokun.dev

Personal portfolio and API backend for **Oyedokun Kehinde** — Software Engineer. Built with Next.js 14 on the frontend and Express.js on the backend, deployed as serverless functions on Vercel.

**Live:** [oyedokun.dev](https://oyedokunken.vercel.app/)  
**Repository:** [github.com/oyedokunken/oyedokun-SWE](https://github.com/oyedokunken/oyedokun-SWE)

---

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Data Flow](#data-flow)
- [Features](#features)
- [Projects Showcased](#projects-showcased)
- [Local Development](#local-development)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

---

## Overview

This is a production-grade portfolio site built to reflect the same quality standards applied to client work. It is not a template. Every component, animation, and API route was written from scratch.

The frontend is a statically exported Next.js app with App Router, Tailwind CSS, and Framer Motion. The backend is an Express.js serverless API that handles contact form submissions and resume delivery via SMTP.

Key design decisions:
- Preloader with progress ring that gates all entrance animations via a custom `siteReady` event
- Dark and light themes using CSS variables and a React context
- Scroll-spy navigation with active section highlighting
- Rate-limited API with Helmet security headers
- Email templates with HTML/CSS layout for professional delivery

---

## Repository Structure

```text
oyedokun/
  frontend/               Next.js 14 portfolio (deployed to Vercel)
    app/
      layout.tsx          Root layout with metadata, providers
      page.tsx            Main page assembling all sections
      globals.css         CSS variables, Tailwind base, utility classes
    components/
      layout/             Header, Footer, MobileMenu
      sections/           Hero, About, Skills, Services, WhyMe, Projects,
                          Experience, Education, Testimonials, PhotoScroll, Contact
      ui/                 Preloader, ResumeModal, Modal, ThemeToggle,
                          ScrollToTop, WhatsAppFloat
    context/              ThemeContext, ResumeModalContext
    lib/                  utils.ts, useSiteReady.ts
    public/               Images, fonts, og.png, robots.txt

  backend/                Express.js API (deployed as Vercel Serverless)
    src/
      index.ts            App entry, CORS, Helmet, rate limiting
      routes/
        contact.ts        POST /api/contact
        resume.ts         POST /api/resume
      services/
        mailer.ts         Nodemailer SMTP transport
      templates/
        contact.html      Email template for contact confirmation
        resume-delivery.html  Email template for resume delivery
    resume.pdf            Attached to resume delivery emails
    vercel.json           Serverless function config
```

---

## Architecture

```text
                   Browser
                      |
          +-----------+-----------+
          |                       |
     Next.js 14              Express.js API
   (Vercel CDN)           (Vercel Serverless)
          |                       |
    Static Pages          /api/contact
    Client Components     /api/resume
    Framer Motion         /health
    ThemeContext          /
    useSiteReady               |
                        Nodemailer
                               |
                          Gmail SMTP
                               |
                    Owner + Sender Inbox
```

The frontend and backend are separate Vercel projects with independent deployment pipelines. The frontend calls the backend API using the `NEXT_PUBLIC_API_URL` environment variable. Both are stateless and horizontally scalable.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14 (App Router) | React framework, SSG, metadata |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations, scroll-driven effects |
| Lucide React | Latest | Icon system |
| react-phone-number-input | 3 | International phone field |
| Zod | 3 | Form schema validation |
| Axios | 1 | HTTP client |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Express.js | 4 | HTTP server |
| TypeScript | 5 | Type safety |
| Nodemailer | 6 | SMTP email transport |
| Zod | 3 | Request body validation |
| Helmet | 7 | Security headers |
| express-rate-limit | 7 | Rate limiting (20 req / 15 min) |
| dotenv | 16 | Environment variable loading |

---

## Data Flow

### Contact form submission

```text
User fills form
  -> Zod validates on client (name, email, phone, subject, message)
  -> POST /api/contact with JSON body
  -> Zod re-validates on server
  -> Nodemailer sends two emails:
       1. Notification email to owner (oyedokunken@gmail.com)
       2. Confirmation email to sender with message summary
  -> 200 OK returned
  -> Frontend shows success modal
```

### Resume request

```text
User opens Resume modal
  -> Fills name and email
  -> Zod validates on client
  -> POST /api/resume
  -> Zod validates on server
  -> Log entry written to resume-log.txt
  -> Nodemailer sends email with resume.pdf attached
  -> 200 OK returned
  -> Frontend shows success state
```

### Page load and animation sequence

```text
Browser loads page
  -> Preloader renders with circular SVG progress ring
  -> Random progress increments over ~1.5s
  -> At 100%, 400ms delay, then:
       -> document.dispatchEvent('siteReady')
       -> Preloader starts clip-path exit animation (0.85s)
  -> useSiteReady hook fires in Header and Hero
       -> Header slides down: y:-20 to y:0, opacity 0 to 1
       -> Hero words animate in word by word with blur removal
       -> Hero image fades in
       -> CTA buttons and stats reveal sequentially
  -> Preloader fully unmounts after 900ms
  -> Remaining sections use whileInView for scroll-triggered entrance
```

---

## Features

- Preloader with SVG ring, percentage counter, and `siteReady` event system
- Dark mode default with persistent light mode toggle via ThemeContext
- Scroll-spy navigation with active section indicator dot
- Header entrance animation gated on preloader exit
- Hero: animated word-by-word heading, parallax image, counting stats, green availability dot
- About: animated philosophy statement, personal details grid
- Skills: 30+ technologies in grouped icon grid
- Services: 9 cards with equalized descriptions, no em dashes
- Projects: 21 projects filterable by category (Platform, SaaS, SaaS/AI, Blockchain, Healthcare, EdTech, E-commerce, Agency, WordPress); real cover image per card rendered in greyscale (colour reveals on hover); category pill and icon links use black bg only (no theme toggle); bottom section (bg, title, desc, tags) fully theme-responsive
- Experience: animated scroll-driven timeline line, spring-pop dots, impact-focused bullet points
- Education: FUTA B.Tech, Cipher Software cert, Aspire Leaders Program (Harvard collab) in card grid (currently hidden)
- WhyMe: 6 USP cards with alternating elevated backgrounds (cards 2/4/6 elevated at rest)
- Testimonials: quote cards with avatar images
- Photo scroll: infinite bidirectional marquee in two rows
- Contact: form with field icons, Zod validation, rate-limited API, success/error modal
- CV modal: name and email form, PDF delivery via Nodemailer
- Open Graph and Twitter card metadata with custom 1200x630 OG image
- Sitemap and robots.txt for search engine indexing
- WhatsApp float button with "Let's chat" sticky label, scroll-to-top button
- Responsive across mobile, tablet, and desktop

---

## Projects Showcased

| Project | Category | Live URL |
|---|---|---|
| Glore | Platform | [gloreenergy.com](https://gloreenergy.com) |
| Ren Power | Platform | [renpowerltd.com](https://renpowerltd.com) |
| RIOS | SaaS | [rios-web.vercel.app](https://rios-web.vercel.app) |
| Credence | Blockchain | [credencely.vercel.app](https://credencely.vercel.app) |
| Traqify | SaaS | [traqify.vercel.app](https://traqify.vercel.app) |
| Storebook | SaaS | [storebook-production.up.railway.app](https://storebook-production.up.railway.app) |
| EduPilot | EdTech | [edupilotly.vercel.app](https://edupilotly.vercel.app) |
| Kwiker | Platform | [kwiker-main.vercel.app](https://kwiker-main.vercel.app) |
| TitanBid | SaaS / AI | [titan-bid-frontend.vercel.app](https://titan-bid-frontend.vercel.app) |
| GramOne | Platform | [gramone.vercel.app](https://gramone.vercel.app) |
| Dubai Avenue Scents | E-commerce | [dubaiavenuescent.com](https://dubaiavenuescent.com) |
| DPA Summit | Platform | [digitalprocurement.africa](https://digitalprocurement.africa) |
| FUTA HMS | Healthcare | [futahms.vercel.app](https://futahms.vercel.app) |
| Ascentor LDP | Platform | [ascentorbi.com](https://ascentorbi.com) |
| Cooper Gaming Services | Agency | [cgs-web.vercel.app](https://cgs-web.vercel.app) |
| Glory Fashion | WordPress | [glorybyjes.com](https://glorybyjes.com) |
| Noble Land Africa | WordPress | [noblelandafrica.com](https://noblelandafrica.com) |
| Rexta | Agency | [rexta.vercel.app](https://rexta.vercel.app) |
| NextStars | WordPress | [nexstars.org](https://nexstars.org) |
| WIME Awards | WordPress | [wimeawards.org](https://wimeawards.org) |
| Minuteman | E-commerce | [minuteman.com.ng](https://minuteman.com.ng) |

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 10+

### Clone

```bash
git clone https://github.com/oyedokunken/oyedokun-SWE.git
cd oyedokun-SWE
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`.

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs on `http://localhost:4000`.

Create `backend/.env`:

```bash
PORT=4000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your_email@gmail.com
```

Gmail requires an App Password, not your account password. Generate one at `myaccount.google.com/apppasswords` with 2FA enabled.

### Resume PDF

Place your resume at `backend/resume.pdf`. It is attached automatically to every resume delivery email.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | / | Health check |
| GET | /health | Health check |
| POST | /api/contact | Send contact message |
| POST | /api/resume | Request resume delivery |

### POST /api/contact

Body:

```json
{
  "name": "string (min 2)",
  "email": "string (valid email)",
  "phone": "string (E.164 format)",
  "subject": "string (min 3)",
  "message": "string (min 10)"
}
```

Sends a notification email to the owner and a confirmation to the sender.

### POST /api/resume

Body:

```json
{
  "name": "string (min 2)",
  "email": "string (valid email)"
}
```

Logs the request and delivers `resume.pdf` via SMTP.

### Rate Limiting

All `/api/*` routes are limited to 20 requests per 15 minutes per IP.

---

## Deployment

See `frontend/DEPLOY.md` and `backend/DEPLOY.md` for full step-by-step Vercel deployment guides including environment variable setup, SMTP configuration, and file bundling.

---

## License

MIT. See [LICENSE](./LICENSE).

---

## Contact

Email: [oyedokunken@gmail.com](mailto:oyedokunken@gmail.com)  
LinkedIn: [linkedin.com/in/oyedokunken](https://linkedin.com/in/oyedokunken)  
Portfolio: [oyedokun.dev](https://oyedokunken.vercel.app/)
