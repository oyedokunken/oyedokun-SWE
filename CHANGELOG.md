# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.12.0] - 2026-08-12

### Changed
- Hero: Removed "Lagos, Nigeria" location tag from Available for work line; replaced with animated green status dot only (signals worldwide availability)
- Hero: "Get in Touch" outline button border increased from 1px to 2px for better visibility
- About: Subtext updated to be longer, more personal, and specific to shipped work across fintech, health, and climate platforms
- About: Subtext font size increased from 14px to 15px; removed fixed width cap so text is fully responsive on mobile
- Projects: Cover image container made explicitly full-width to ensure consistent height across all screen sizes
- WhatsApp modal: Display name changed from full name to oyedokunken; modal always uses WhatsApp light theme regardless of site theme; message rewritten to be more conversational; green status dot moved outside overflow-hidden container to be fully visible; z-index corrected

---

## [1.11.0] - 2026-08-12

### Added
- UI: WhatsApp chat modal replacing the direct link on float button and footer contact link; shows avatar, "Typically replies instantly" status, a message bubble, and an "Open WhatsApp to chat" CTA
- UI: `WhatsAppChatContext` provider to manage modal state globally across Footer and float button
- UI: Scroll-to-top button redesigned with a circular SVG progress ring that fills as the user scrolls down the page

### Changed
- About: Added subtext under "Thinking in systems." heading to balance left column height with right column
- Social: Behance replaced with Twitter/X (`https://x.com/oyedokunken_`) in Footer, MobileMenu, and email templates
- Contact: Footer WhatsApp link now opens the chat modal instead of navigating directly to WhatsApp

---

## [1.10.0] - 2026-08-02

### Changed
- Projects: RIOS URL updated from `rios-web.vercel.app` to `https://www.riosintell.com/`
- Projects: Rexta moved up in display order (after EduPilot), URL updated to `https://rextatech.com/`, category changed from Agency to Web App
- Projects: CGS Web URL updated from `cgs-web.vercel.app` to `https://coopergamingservices.com/`
- Hero: Projects Shipped count updated from 13 to 20
- UI: All "CV" references changed to "Resume" (Header button, Contact section, Resume modal)
- Social: LinkedIn URL updated from `linkedin.com/in/oyedokunken` to `https://www.linkedin.com/in/oyedokun` (across Footer, MobileMenu, email templates, GITHUB.md, README.md)
- Frontend: Favicon reverted to original SVG with PNG fallback (favicon.png, apple-touch-icon.png)

---

## [1.9.0] - 2026-07-12

### Added
- Projects: MSP Reports (SaaS) — automated white-label reporting for MSPs pulling data from 20+ tools into branded reports with AI-generated executive summaries and multi-tenant isolation
- Projects: `MSP-cover.png` added to `frontend/public/covers/`
- Frontend: 301 redirect from `oyedokunken.vercel.app` to `https://www.oyedokun.dev/`
- Frontend: `favicon.ico` and `apple-touch-icon.png` generated from `favicon.png`

### Changed
- SEO: Updated metadata description from "Based in Nigeria" to "Building globally from Lagos to enterprise teams"
- SEO: Updated `metadataBase`, Open Graph, and Twitter card URLs to `https://www.oyedokun.dev`
- Projects: Display order updated — Ren Power 1st, RIOS 2nd, MSP Reports 3rd, Glore 4th, Credence 5th
- Projects: Total project count is now 22
- README/WIKI: Project list and count updated to reflect MSP Reports and new Storebook link

---

## [1.8.0] - 2026-07-02

### Added
- Hero: New hero image `oyedokun-new.jpg` (replaces `oyedokun.jpg`)
- Photo marquee: Added `oyedokun.jpg` to marquee slides
- Photo marquee: Added new slides `oyedokun-slide-5.png` and `oyedokun-slide-6.jpg`
- Photo marquee: Added `oyedokunken.jpg` to both marquee rows (appears twice for even/odd distribution)
- Skills: Added Python (Languages), FastAPI (Backend), Vue.js (Frontend), MySQL (Data), AWS (DevOps), Postman (Tools)

### Changed
- Location: Updated all location references from Akure to Lagos across Hero, About, Experience, and Education sections
- Education: FUTA institution name updated to "Federal University of Technology, Lagos"
- Projects: Display order updated — Ren Power 1st, RIOS 2nd, Glore 3rd
- Photo marquee: Fixed alt text to use actual filename instead of array index (resolves "Oyedokun 11" display issue)

---

## [1.7.0] - 2026-06-25

### Added
- Projects: Storebook (SaaS) — Laravel 11 store management system with POS, multi-branch inventory, role-based access (Admin / Manager / Cashier / Staff), PDF & email reports, public storefront, guest checkout, debtor tracking, supplier management, OTP authentication, and full audit logging; deployed on Railway
- Projects: `storebook-cover.png` added to `public/covers/`

### Changed
- Projects: Cover images now render in greyscale by default; colour reveals on card hover via Tailwind `grayscale` / `group-hover:grayscale-0` — consistent with the B/W site palette
- Projects: Display order updated — Glore 1st, Ren Power 2nd, RIOS 3rd, Credence 4th, Traqify 5th, Storebook 6th, EduPilot 7th, Kwiker 8th, TitanBid 9th
- Projects: Total project count is now 21

---

## [1.6.1] - 2026-05-29

### Added
- Projects: FUTA HMS cover image added (all 20 projects now have covers)
- PWA: web manifest added at `public/manifest.json` with theme color, icons, and standalone display

### Changed
- Projects: Category pill and GitHub/live icon buttons now use black bg only (no theme toggle) — always black/white
- Projects: Bottom section (bg, title, description, tags) fully theme-responsive (uses CSS variables)
- Projects: Glore cover image replaced with updated version
- Projects: Removed fallback gradient (all projects have covers)

---

## [1.6.0] - 2026-05-29

### Added
- Projects: Kwiker (Platform) — Commerce OS for African SMBs; waitlist site with Next.js 16 frontend and Express/Supabase backend
- Projects: 20 real cover images added to `public/covers/` replacing all SVG abstract backgrounds
- Backend: `CV - Oyedokun Kehinde Joshua.pdf` added as the CV attachment (replaces `resume.pdf`)

### Changed
- Projects: RIOS live link updated to `https://rios-web.vercel.app/`
- Projects: Card redesign — image cover on top (h-44), dark text section below; category pill and icon buttons theme-responsive (black/white in light, white/black in dark)
- Projects: All project descriptions standardised to equal length (~145–155 chars, 2-line display)
- Projects: AbstractCover SVG component removed entirely; FUTA HMS uses CSS gradient fallback
- Backend: `getResumePath()` updated to resolve `CV - Oyedokun Kehinde Joshua.pdf`; email attachment filename updated to match
- Backend: Old `resume.pdf` deleted

---

## [1.5.0] - 2026-05-15

### Added
- Projects: NextStars (WordPress) — STEM career placement hub
- Projects: WIME Awards (WordPress) — women in maritime & energy awards platform
- Projects: Minuteman (E-commerce) — multi-category WooCommerce storefront
- Photo scroll: 4 new slide images added (oyedokun-slide-1 through slide-4)
- Email icons: LinkedIn, GitHub, Instagram, Behance, Facebook PNG assets added to `public/email-icons/`

### Changed
- Projects: tag/stack pills changed from filled white to outline style (theme-responsive border + text)
- Projects: Education section temporarily commented out from page
- Header CTA button: changed from outline to filled background (theme-responsive), label changed Resume → CV
- Contact section: "Download Resume" button relabelled to "Download CV"
- CV modal: title and submit button text updated to CV
- Email templates: removed SVG icon beside "oyedokun.dev" in header (text-only now)
- Email templates: social footer replaced with PNG icons (LinkedIn, GitHub, Instagram, Behance, Facebook); WhatsApp and Portfolio removed
- Email templates: all "Resume" references updated to "CV" (subject lines, attachment filename, template tags)
- WhatsApp float button: added "Let's chat" sticky text label beside the button

---

## [1.4.0] - 2026-05-09

### Changed
- Projects: category pill inside each project card now uses filled white background with black text (fixed, not theme-responsive)
- Projects: project tag pills now use filled white background with black text (fixed, not theme-responsive)

---

## [1.3.0] - 2026-05-09

### Changed
- Hero image: mobile and desktop both use `oyedokunken.jpg` with `object-cover object-center` to fill container completely
- Hero counters: animation now waits for `ready` state before starting (prevents early trigger)
- Header: mobile hamburger menu now shows on tablet (md→lg breakpoints), desktop nav hidden until lg
- Services: removed mobile card stacking effect completely; all cards have equal height (min-h-[380px] + h-full)
- Education: section heading changed to "My scholastic endeavours."

---

## [1.2.0] - 2026-05-09

### Added
- Education section after Experience: FUTA B.Tech, Cipher Software cert, Aspire Leaders Program (Harvard collab), with card grid, icons, animations, theme-aware
- White heart emoji to footer "Made with 🤍 by @oyedokunken"
- New photo `oyedokun-16.jpg` added to PhotoScroll marquee
- Hero desktop image swapped to `oyedokun-hero.png`

### Changed
- Email templates: replaced `ok` text logo with the real SVG logo from codebase (circle, path, dot mark); explicit `<divider>` elements between header/body and body/footer
- Email footer: replaced text social links with icon-only buttons (WhatsApp, LinkedIn, GitHub, Portfolio); no email address text in any template
- `contact-user` email: title → "I got your message.", body → "Your message has been received, {{name}}."
- Email templates: fully consistent structure across all 4 (owner contact, user contact, resume delivery, resume request)
- Experience bullets: all rewritten for business impact and outcomes, removed tech-stack name-dropping
- WhyMe cards: cards 2, 4, 6 use elevated background by default; hover reverses to base (creates visual checkerboard rhythm)
- ScrollToTop button: dark mode = white bg + dark icon; light mode = dark bg + white icon
- Services: mobile-only card stacking (each card overlaps the previous by `-mt-12` with increasing z-index)

---

## [1.1.1] - 2026-05-09

### Added
- LinkedIn, GitHub, and Portfolio social buttons in all email template footers
- `ok` logo box (dark rounded square) in all email template headers

### Changed
- After-footer brand logo re-centered (reverted from left-aligned)
- Email templates completely redesigned: dark card layout, logo box, social links, `oyedokun.dev` branding
- All `https://oyedokun.dev` URLs replaced with `https://oyedokunken.vercel.app/` across codebase (domain pending purchase; display text preserved)
- `BASE_STYLES` + `SOCIALS` constants extracted for DRY template composition in `mailer.ts`

### Fixed
- Resume 500: `vercel.json` `includeFiles` path was `backend/resume.pdf` (wrong) → `resume.pdf` (correct, relative to `backend/`)
- Resume 500: `resume.ts` used `process.cwd()` for PDF path → removed early file check, delegated entirely to `getResumePath()` in mailer
- Contact and resume routes: `appendLog` file write (EROFS on Vercel) now silently swallowed so successful email send always returns 200

---

## [1.1.0] - 2026-05-09

### Added
- "Why Me" (Value Proposition) section between Services and Projects with 6 USP cards, Framer Motion stagger animations, and gap-px grid layout
- WordPress project category filter with Glory Fashion and Noble Land Africa
- Icon boxes beside all four About detail items (Based in, Stack, Focus, Education)
- Icons above philosophy cards (Clean Architecture, Performance First, Ship It)
- Dark mode avatar support in Testimonials (switches between avatar.png and avatar-dark.png)
- Hero section entrance animations gated on preloader exit via `siteReady` event
- Animated vertical progress line in Experience section visible on mobile and desktop
- Testimonials section with real client quotes
- `useSiteReady` hook for coordinated post-preloader animation sequencing

### Changed
- Footer after-logo is now large typographic brand mark constrained to `max-w-7xl` content width, left-aligned
- Contact form modal now uses same dark-themed design and `inset-0` positioning as Resume modal
- Phone input uses `limitMaxLength` to cap digits at country-code-adjusted length
- Backend HTML email templates inlined as TypeScript string constants (eliminates all Vercel file system errors)
- Resume PDF path uses fallback candidate chain for serverless reliability
- `app.set("trust proxy", 1)` added to Express for correct rate-limit behavior on Vercel
- `siteReady` event fires 900ms before hero animations start, ensuring clean post-preloader reveal
- GITHUB.md updated to reflect current stack and projects

### Fixed
- Backend 500 on contact form submission (ENOENT: template file not found)
- Backend 500 on resume request (ERR_ERL_UNEXPECTED_X_FORWARDED_FOR)
- Contact modal misaligned on desktop and mobile
- WhyMe section numbers rendering in monospace instead of system font

---

## [1.0.0] - 2025-05-09

### Added
- Initial release of oyedokun.dev portfolio
- Hero section with animated typography and parallax
- About / philosophy section with scroll-triggered text reveal
- Stacking services cards with scroll-driven animation
- Projects showcase with abstract visual covers
- Skills section with tool icon grid
- Professional experience timeline
- Horizontal photo scroll marquee
- Contact form with modal feedback
- Resume request via email (Nodemailer)
- Mobile off-canvas menu with advanced animation
- Scroll spy navigation
- Dark / light theme with system preference detection
- Preloader with SVG logo reveal animation
- Floating WhatsApp shortcut
- Scroll-to-top button
- Footer with social links
- Backend API: /api/contact and /api/resume
- JSON-based contact and resume request logs
- Branded HTML email templates (4 variants)
