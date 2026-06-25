# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.7.0] - 2026-06-25

### Added
- Projects: Storebook (SaaS) — Laravel 11 store management system with POS, multi-branch inventory, role-based access (Admin / Manager / Cashier / Staff), PDF & email reports, public storefront, guest checkout, debtor tracking, supplier management, OTP authentication, and full audit logging; deployed on Railway
- Projects: `storebook-cover.png` added to `public/covers/`

### Changed
- Projects: Cover images now render in greyscale by default; colour reveals on card hover via Tailwind `grayscale` / `group-hover:grayscale-0` — consistent with the B/W site palette
- Projects: Display order updated — Ren Power 2nd, RIOS 3rd, Glore 4th, EduPilot 5th, Kwiker 6th, Traqify 7th, Storebook 8th (beside Traqify as twin store-management projects), TitanBid 9th
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
