# Wiki

## Architecture Overview

```
oyedokun.dev
├── frontend/   (Next.js 14 App Router)
└── backend/    (Express.js Serverless API)
```

Architecture and data flow diagrams in README use Mermaid flowcharts for better rendering in GitHub and Markdown viewers. API endpoint paths are quoted to avoid Mermaid lexical parsing errors.

### Frontend Routes
| Route | Description |
|---|---|
| `/` | Single-page portfolio (all sections) |

### Backend API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contact` | Submits contact form, emails owner + user |
| POST | `/api/resume` | Requests resume, emails PDF to requester |

## Email Flow

### Contact Form
1. User fills form and submits
2. Backend validates with Zod
3. Owner receives email with user details
4. User receives acknowledgement email
5. Submission logged to `backend/data/contacts.json`

### Resume Request
1. User clicks "Request Resume" and provides email
2. Backend sends resume PDF as attachment
3. User receives email with PDF
4. Request logged to `backend/data/resume-requests.json`

## Theme System

CSS custom properties drive both light and dark modes. The `ThemeContext` exposes `theme` and `toggleTheme`. Dark is the default. `next-themes` handles SSR hydration.

## Animation System

All animations use Framer Motion. Scroll-driven effects use `useScroll` + `useTransform`. Entry animations use `whileInView` with viewport detection.

### Post-Preloader Sequencing

The `useSiteReady` hook (`frontend/lib/useSiteReady.ts`) listens for the `siteReady` CustomEvent dispatched by `Preloader.tsx` when its exit animation begins. A 900ms delay is applied before setting `ready = true`, ensuring the preloader's 850ms `clipPath` exit animation fully completes before Hero entrance animations fire. A 4000ms fallback handles cases where the event never fires.

## Page Sections (in order)

| Section | ID | Notes |
|---|---|---|
| Hero | `#hero` | Entrance animations gated on `siteReady`; animated green dot inside section-label (after dash, before text) + "Available for work" (no location tag); mobile layout has increased spacing (mt-10) for clear separation; WhatsApp float button opens a chat modal (WhatsAppChatContext) with avatar, "Active Now" status, three-line message bubble ("Howdy, welcome to my space!" / "Are you working on a project or got an idea?" / "Reach out today. Let's build together! 🙂"), and CTA instead of navigating directly; scroll-to-top button has circular SVG progress ring |
| Marquee | - | Infinite horizontal scroll of 15 selected skills (React, TypeScript, Node.js, Next.js, PostgreSQL, Docker, Kubernetes, Tailwind CSS, WordPress, Java, C#, Firebase, Svelte, MongoDB, Prisma) |
| About | `#about` | Scroll-driven word reveal, icon detail items, philosophy cards; subtext paragraph under heading (15px, full-width responsive) focusing on delivery over impressing: "I don't code to impress, I code to deliver. I value quality code, performance and scalability over clever tricks and quick fixes." |
| Skills | `#skills` | Tool icon grid (6 categories: Languages [TypeScript, JavaScript, Java, PHP, Python], Frontend [React, Next.js, Tailwind CSS, Vue.js, Svelte], Backend [Node.js, Express, Laravel, FastAPI, C#], Data [PostgreSQL, MongoDB, MySQL, Prisma, Firebase], DevOps [Docker, GitHub Actions, Linux, AWS, Kubernetes], Tools [Git, VS Code, Supabase, Postman, WordPress]) |
| Services | `#services` | 11 equal-height cards (min-h-[380px]) in responsive grid with distinct SVG patterns; new services: WordPress Development (09, square pattern), Consultation (10, diamond pattern), Technical Leadership (11, line pattern) |
| Why Me | `#why-me` | 6 USP cards with alternating elevated backgrounds (2/4/6 elevated at rest) |
| Projects | `#projects` | 22 filterable cards with real cover images (aspect-video 16:9 top section) rendered greyscale by default, colour-on-hover via Tailwind `grayscale`/`grayscale-0`; category pill + GitHub/live icons overlay on image (black bg only, no theme toggle); bottom section (bg, title, desc, tags) fully theme-responsive |
| Experience | `#experience` | Timeline with animated progress line, impact-focused bullets |
| Education | `#education` | FUTA B.Tech, Cipher Software cert, Aspire Leaders Program (Harvard collab) in card grid — **currently commented out** |
| Testimonials | `#testimonials` | Client quotes with theme-aware avatar |
| Photo Scroll | - | Infinite marquee photos |
| Contact | `#contact` | Form with phone input + modal feedback |
| Footer + Brand | - | Large typographic brand mark back-to-top; WhatsApp contact link opens chat modal instead of navigating directly |

## Backend Email System

HTML templates are inlined as TypeScript string constants in `backend/src/services/mailer.ts`. No file I/O is performed at runtime, making the email system fully compatible with Vercel's serverless read-only file system. The `CV - Oyedokun Kehinde Joshua.pdf` attachment uses a fallback path chain (`__dirname`-based, `process.cwd()/backend`, `process.cwd()`) to resolve correctly across local and Vercel environments. All 4 email templates (contact-owner, contact-user, cv-delivery, cv-request) show `oyedokun.dev` text-only in the header (no SVG icon), explicit horizontal dividers, and PNG-based social footer links (LinkedIn, GitHub, Instagram, X/Twitter, Facebook) hosted at `public/email-icons/`. Behance replaced by X/Twitter (`x.com/oyedokunken_`) across all social link surfaces (Footer, MobileMenu, email templates). Resume delivery email subject and attachment filename use "CV" (file name preserved for backward compatibility). LinkedIn profile URL is `https://www.linkedin.com/in/oyedokunken/`.

## Deployment Notes

Both sub-projects deploy independently on Vercel. Set environment variables in each Vercel project dashboard.

### Required Backend Environment Variables

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP authentication email |
| `SMTP_PASS` | SMTP authentication password |
| `OWNER_EMAIL` | Destination for contact/resume notifications |
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `https://www.oyedokun.dev`) |
