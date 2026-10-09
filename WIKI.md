# Wiki

## Architecture Overview

```
oyedokun.dev
├── frontend/   (Next.js 14 App Router)
└── backend/    (Express.js Serverless API)
```

Architecture and data flow diagrams in README use Mermaid flowcharts for better rendering in GitHub and Markdown viewers. API endpoint paths are quoted to avoid Mermaid lexical parsing errors.

## GitHub Profile

`GITHUB.md` is the repository's GitHub-facing profile README. It mirrors the portfolio's project table and skills, and carries the personal intro and tagline. It is kept in sync with the SPA portfolio so the public GitHub profile reflects the same information as the site.

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

All animations use Framer Motion, except the Photo Scroll marquee which uses CSS keyframes so it can be paused via `animation-play-state`. Scroll-driven effects use `useScroll` + `useTransform`. Entry animations use `whileInView` with viewport detection. Periodic attention wiggles (rotate keyframes pivoting at ~70%/70%) run on the header "Hire Me" CTA 👋 (gated on `siteReady`, 1s delay) and the WhatsApp "Let's chat!" 🙂 pill, repeating every ~7 seconds via `repeat: Infinity` + `repeatDelay`.

### Post-Preloader Sequencing

The `useSiteReady` hook (`frontend/lib/useSiteReady.ts`) listens for the `siteReady` CustomEvent dispatched by `Preloader.tsx` when its exit animation begins. A 900ms delay is applied before setting `ready = true`, ensuring the preloader's 850ms `clipPath` exit animation fully completes before Hero entrance animations fire. A 4000ms fallback handles cases where the event never fires.

## Page Sections (in order)

| Section | ID | Notes |
|---|---|---|
| Hero | `#hero` | Entrance animations gated on `siteReady`; animated green dot inside section-label (after dash, before text) + "Available for work" (no location tag); mobile layout has increased spacing (mt-10) for clear separation; WhatsApp float button opens a chat modal (WhatsAppChatContext) with avatar, "Active Now" status, video/voice call icons beside the close button, a centered live date pill ("Tuesday 22nd September 2026"), an end-to-end encryption notice, a three-line message bubble ("Howdy, welcome to my space!" / "Are you working on a project or got an idea?" / "Reach out today. Let's build together! 🙂") with a live "h:mm am/pm" timestamp, a mobile-only input bar (emoji, sticker, paperclip, mic/send in deep green #075E54), and CTA instead of navigating directly; the "Let's chat!" pill emoji (🙂) wiggles periodically to call attention; scroll-to-top button has circular SVG progress ring |
| Marquee | - | Infinite horizontal scroll of all 30 tools-of-the-trade (full Skills set in group order); pauses on pointer interaction via `animationPlayState` |
| About | `#about` | Scroll-driven word reveal, icon detail items, philosophy cards; subtext paragraph under heading (15px, full-width responsive) focusing on delivery over impressing: "I don't code to impress, I code to deliver. I value quality code, performance and scalability over clever tricks and quick fixes." |
| Skills | `#skills` | Tool icon grid (6 categories: Languages [TypeScript, JavaScript, PHP, Python, Java], Frontend [React, Next.js, Tailwind CSS, Vue.js, Svelte], Backend [Node.js, Express, Laravel, FastAPI, C#], Data [PostgreSQL, MongoDB, MySQL, Prisma, Firebase], DevOps [Docker, GitHub Actions, Linux, AWS, Kubernetes], Tools [Git, VS Code, Supabase, Postman, WordPress]) |
| Services | `#services` | 11 equal-height cards (min-h-[380px]) in responsive grid with distinct SVG patterns; new services: WordPress Development (09, square pattern), Consultation (10, diamond pattern), Technical Leadership (11, line pattern) |
| Why Me | `#why-me` | 6 USP cards with alternating elevated backgrounds (2/4/6 elevated at rest); card 04 is "AI-Augmented Delivery" (Devin, Antigravity) |
| Projects | `#projects` | 27 filterable cards with real cover images; theme-aware "New" pill beside the title for entries with an `addedOn` date (auto-expires after 30 days, red bg in light mode / white bg in dark mode) (aspect-video 16:9 top section) rendered greyscale by default, colour-on-hover via Tailwind `grayscale`/`grayscale-0`; category pill + GitHub/live icons overlay on image (black bg only, no theme toggle); bottom section (bg, title, desc, tags) fully theme-responsive |
| Experience | `#experience` | Timeline with animated progress line, impact-focused bullets |
| Education | `#education` | 5 cards: FUTA Akure B.Tech (Computer Information Systems, CGPA 4.72/5.00, Jul 2026), Amazon Professional Software Development Certification (Coursera, Sep 2026), NACOSS FUTA Hackathon Emerging Award Winner (Sep 2025), Cipher Full Stack cert (Nov 2025), Aspire Leaders Program (Harvard collab, Aug 2025); type pills: Degree, Certificate, Award, Program |
| Testimonials | `#testimonials` | Client quotes with theme-aware avatar |
| Photo Scroll | - | Infinite two-row marquee of 58 photos driven by CSS keyframes (`marquee-scroll` / `marquee-scroll-reverse`); pauses on any pointer interaction (hover, touch, pen) via `animationPlayState` toggled by `onPointerEnter`/`onPointerLeave`/`onPointerCancel` |
| Contact | `#contact` | Form with phone input + modal feedback |
| Footer + Brand | - | Large typographic brand mark back-to-top; WhatsApp contact link opens chat modal instead of navigating directly |

## Backend Email System

HTML templates are inlined as TypeScript string constants in `backend/src/services/mailer.ts`. No file I/O is performed at runtime, making the email system fully compatible with Vercel's serverless read-only file system. The `CV - Oyedokun Kehinde.pdf` attachment uses a fallback path chain (`__dirname`-based, `process.cwd()/backend`, `process.cwd()`) to resolve correctly across local and Vercel environments. All 4 email templates (contact-owner, contact-user, cv-delivery, cv-request) show `oyedokun.dev` text-only in the header (no SVG icon), explicit horizontal dividers, and PNG-based social footer links (LinkedIn, GitHub, Instagram, X/Twitter, Facebook) hosted at `public/email-icons/`. Behance replaced by X/Twitter (`x.com/oyedokunken_`) across all social link surfaces (Footer, MobileMenu, email templates). Resume delivery email subject and attachment filename use "CV" (file name preserved for backward compatibility). LinkedIn profile URL is `https://www.linkedin.com/in/oyedokunken/`. GitHub social links (Footer, MobileMenu, email footer) point to the profile `https://github.com/oyedokunken/`, not the private portfolio repo.

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
