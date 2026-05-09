# Wiki

## Architecture Overview

```
oyedokun.dev
├── frontend/   (Next.js 14 App Router)
└── backend/    (Express.js Serverless API)
```

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
| Hero | `#hero` | Entrance animations gated on `siteReady` |
| Marquee | - | Infinite horizontal scroll |
| About | `#about` | Scroll-driven word reveal, icon detail items, philosophy cards |
| Skills | `#skills` | Tool icon grid |
| Services | `#services` | Equal-height cards (min-h-[380px]) in responsive grid |
| Why Me | `#why-me` | 6 USP cards with alternating elevated backgrounds (2/4/6 elevated at rest) |
| Projects | `#projects` | Filterable cards with abstract covers, filled white pills with black text (fixed across themes) |
| Experience | `#experience` | Timeline with animated progress line, impact-focused bullets |
| Education | `#education` | FUTA B.Tech, Cipher Software cert, Aspire Leaders Program (Harvard collab) in card grid |
| Testimonials | `#testimonials` | Client quotes with theme-aware avatar |
| Photo Scroll | - | Infinite marquee photos |
| Contact | `#contact` | Form with phone input + modal feedback |
| Footer + Brand | - | Large typographic brand mark back-to-top |

## Backend Email System

HTML templates are inlined as TypeScript string constants in `backend/src/services/mailer.ts`. No file I/O is performed at runtime, making the email system fully compatible with Vercel's serverless read-only file system. The `resume.pdf` attachment uses a fallback path chain (`__dirname`-based, `process.cwd()/backend`, `process.cwd()`) to resolve correctly across local and Vercel environments. All 4 email templates (contact-owner, contact-user, resume-delivery, resume-request) use the real SVG logo from the Hero component, explicit horizontal dividers, and icon-based social footer links (WhatsApp, LinkedIn, GitHub, Portfolio) with no text.

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
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `https://oyedokunken.vercel.app`) |
