# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
