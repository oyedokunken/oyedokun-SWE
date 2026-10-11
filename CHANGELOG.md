# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.16.8] - 2026-10-11

### Added
- Projects: Gistroom (Platform) added as the second project, right after Job Central. A progressive web app for Nigerians to talk live about local topics with friends, chats, one to one calls, and audio rooms for up to 32 people. Built with Next.js, Socket.IO, LiveKit, Prisma, and Supabase. Carries the auto-expiring "New" pill.

### Changed
- Projects: Job Central moved to first position in the project grid, GITHUB.md, and README.md

---

## [1.16.7] - 2026-10-11

### Changed
- Projects: Job Central moved to first position in the project grid, GITHUB.md, and README.md

---

## [1.16.6] - 2026-10-09

### Added
- Education: dashed "More on the way" placeholder card fills the sixth grid cell, keeping the 3x2 layout balanced

### Changed
- Education: card order now FUTA, Amazon (Coursera), Aspire (Harvard) on row one; Cipher, NACOSS, placeholder on row two
- WhyMe: AI-Augmented Delivery copy no longer names specific tools; FUTA CGPA corrected to 4.77

---

## [1.16.5] - 2026-10-09

### Added
- Education section re-enabled with corrected data: FUTA Akure B.Tech (Computer Information Systems, CGPA 4.72/5.00, Jul 2026), plus new cards for Amazon Professional Software Development Certification (Coursera, Sep 2026) and NACOSS FUTA Hackathon Emerging Award Winner (Sep 2025)

### Changed
- Experience: highlights rewritten with real metrics - Rexta (30% latency reduction via caching/WebSockets), Athena (99.9% uptime, 40% faster page loads, thousands onboarded), Ren Power (stack and production-stability focus)
- WhyMe: "Speed Without Shortcuts" (04) replaced by "AI-Augmented Delivery" (agentic AI tooling)

---

## [1.16.4] - 2026-10-09

### Added
- Projects: Job Central (SaaS) added immediately after Traqify - free two-sided hiring platform with auto-parsed resumes, employer form builder, and AI-ranked shortlists; carries the auto-expiring "New" pill

### Changed
- Contact: "Download Resume" button commented out and replaced with a "Hire Me" CTA linking to WhatsApp (resume modal/context and /api/resume backend route remain in place but unreachable)
- Projects: Job Central moved to immediately after Traqify (before Prompt AI)
- Experience: reordered to Rexta, Ascentor, Athena, PRO ALLY, Ren Power; closed out Athena Networks (Oct 2025 - Sep 2026), PRO ALLY (May 2025 - Sep 2026), and Ren Power (Jan 2025 - Jul 2026); Ascentor corrected to Software Engineer, Contract, January 2024 - Present

---

## [1.16.3] - 2026-09-29

### Added
- Header: wave emoji in the "Hire Me" CTA wiggles on page load (after header entrance), repeating every ~7s via rotate keyframes pivoting at the wrist
- WhatsApp float: smile emoji in the "Let's chat!" pill uses the same periodic wiggle

### Changed
- Skills/tools: Languages reordered to TypeScript, JavaScript, PHP, Python, Java (Java last) across the Skills grid, hero marquee, and GitHub profile docs

---

## [1.16.2] - 2026-09-29

### Added
- Projects: Prompt AI (SaaS/AI) added immediately after Traqify - chat-based prompt builder with a Python ML intent layer; carries the auto-expiring "New" pill

### Changed
- Projects: Digital Hub Africa and Salmired Properties moved to immediately after Storebook

---

## [1.16.1] - 2026-09-23

### Added
- Marquee (tech strip after hero): pauses on pointer interaction (hover, touch, pen) via animationPlayState, matching the photo marquee behavior
- WhatsApp chat widget: sticker icon beside the emoji icon in the mobile input bar

### Changed
- Hero: stats row (Projects Shipped / Companies / Years Building) removed on all breakpoints
- Hero: primary button renamed to "View Projects"; secondary button renamed to "My Services" with an arrow icon and now scrolls to the Services section instead of Contact
- Marquee (tech strip): item list synced with the full "Tools of the trade" set - now 30 technologies including JavaScript, PHP, Python, Vue.js, Express, Laravel, FastAPI, MySQL, GitHub Actions, Linux, AWS, Git, VS Code, Supabase, and Postman

---

## [1.16.0] - 2026-09-22

### Added
- Projects: three new entries - Digital Hub Africa (editorial magazine platform), Salmired Properties (real estate platform), and Mailly (AI inbox waitlist) with cover images
- Projects: "New" pill shown beside the project title for any entry with an `addedOn` date, auto-expiring after 30 days; red in light mode, white in dark mode
- WhatsApp chat widget: mobile-only message input bar with emoji and sticker icons, "Type a message" field, paperclip, and a mic/send button that deep-links to WhatsApp

### Changed
- Services: reordered to Full-Stack, SaaS Product Development, Backend Architecture, API Design, DevOps and Infrastructure, Technical Leadership, Frontend Engineering, Security, System Design, Consultation, WordPress
- Projects: Rexta moved above Storebook and EduPilot
- WhatsApp chat widget: mic/send button now uses the deep green (#075E54) instead of bright green

---

## [1.15.0] - 2026-09-22

### Added
- Photo marquee: 8 new photos added to the "Behind the Screen" section (oyedokun-43 through oyedokun-50), bringing the total to 58 images across both scrolling rows
- WhatsApp chat widget: video and voice call icons in the chat header (both linking to the wa.link chat), matching the real WhatsApp header layout
- WhatsApp chat widget: centered date pill showing the live full date (e.g. "Tuesday 22nd September 2026") and a centered end-to-end encryption notice bubble with lock icon
- WhatsApp chat widget: live timestamp on the welcome message showing the visitor's real current time (e.g. "3:46 am"), updating every 30 seconds

### Changed
- Hero image switched to `/shoot/oyedokun-47.jpg` on both mobile and desktop variants; the previous hero image moved into the photo marquee as `oyedokun-50.jpg`
- WhatsApp chat widget: header and message avatars now use the hero image (`oyedokun-47.jpg`)
- Photo marquee: new photos redistributed throughout the array so same-event shots sit 8-9 images apart instead of adjacent
- SEO: JSON-LD `image` URL updated to `/shoot/oyedokun-50.jpg` after the hero file move; metadata keywords expanded with name variants, FUTA, and Rexta Technologies

---

## [1.14.3] - 2026-09-08

### Changed
- Resume delivery: CV attachment now resolves and sends `CV - Oyedokun Kehinde.pdf` (previously `CV - Oyedokun Kehinde Joshua.pdf`); old file removed from backend

### Fixed
- Social links: GitHub icon in Footer and MobileMenu now links to the GitHub profile (`github.com/oyedokunken/`) instead of the private portfolio repo URL which returned a 404 for visitors; email template footer GitHub link normalized with trailing slash

---

## [1.14.2] - 2026-09-04

### Added
- Photo marquee: 16 new photos added to the "Behind the Screen" section (oyedokun-17 through oyedokun-32), bringing the total to 39 images across both scrolling rows

### Changed
- Photo marquee: Switched scroll animation from Framer Motion to CSS keyframes (`marquee-scroll` / `marquee-scroll-reverse` in globals.css) so the marquee pauses on any pointer interaction (hover, touch, pen) via `animationPlayState`

---

## [1.14.1] - 2026-08-31

### Changed
- GitHub profile README (GITHUB.md): Synced project table with SPA portfolio; added missing MSP Reports, WIME Awards, and Minuteman; fixed outdated live URLs for RIOS, Cooper Gaming Services, and Rexta
- GitHub profile README (GITHUB.md): Updated skill badges to include Java, Svelte, C#, Firebase, Kubernetes, and WordPress
- GitHub profile README (GITHUB.md): Rewrote intro to reflect systems thinking, end-to-end ownership, and edge-case-first design; updated location to Lagos, NG
- GitHub profile README (GITHUB.md): Changed bottom tagline to "Architecting systems. Shipping at scale."

---

## [1.14.0] - 2026-08-14

### Added
- Services: WordPress Development service (custom themes, plugins, headless, performance) added after DevOps (service 09)
- Services: Consultation service (technical advisory, architecture reviews, tech stack decisions) added as service 10
- Services: Technical Leadership renumbered to service 11 with distinct horizontal line SVG pattern
- Skills: Java added to Languages
- Skills: Svelte added to Frontend
- Skills: C# added to Backend
- Skills: Firebase added to Data
- Skills: Kubernetes added to DevOps
- Skills: WordPress added to Tools

### Changed
- WhatsApp modal: Status text changed from "Typically replies instantly" to "Active Now"
- WhatsApp modal: Message rewritten to three lines: "Howdy, welcome to my space!" / "Are you working on a project or got an idea?" / "Reach out today. Let's build together! 🙂"
- Services: New services (WordPress, Consultation, Technical Leadership) have distinct SVG patterns (squares, diamonds, lines) to differentiate from existing circle pattern
- Marquee: Updated with 15 selected skills from expanded Skills section including new additions (Kubernetes, WordPress, Java, C#, Firebase, Svelte)
- README: All ASCII diagrams converted to Mermaid flowcharts for better rendering in GitHub and Markdown viewers; API endpoint paths quoted to fix Mermaid lexical parsing error

---

## [1.13.0] - 2026-08-12

### Added
- UI: WhatsApp chat modal replacing the direct link on float button and footer contact link; shows avatar, "Typically replies instantly" status, a message bubble with two lines, and an "Open WhatsApp to chat" CTA
- UI: `WhatsAppChatContext` provider to manage modal state globally across Footer and float button
- UI: Scroll-to-top button redesigned with a circular SVG progress ring that fills as the user scrolls down the page
- CSS: `declarations.d.ts` added to resolve TypeScript lint error for CSS imports

### Changed
- Hero: Removed "Lagos, Nigeria" location tag from Available for work line; animated green status dot now appears inside section-label (after dash, before text) to signal worldwide availability
- Hero: Mobile layout spacing increased (mt-10) for clearer separation between image and text content
- About: Added subtext paragraph under "Thinking in systems." heading to balance left column height with right column
- About: Subtext font size increased to 15px; removed fixed width cap so text is fully responsive on mobile
- About: Subtext rewritten to focus on delivery over impressing: "I don't code to impress, I code to deliver. I value quality code, performance and scalability over clever tricks and quick fixes. The code that survives is the code that was built to last."
- Projects: Cover image container changed from fixed h-44 to aspect-video (16:9) for consistent proportional height across all screen sizes
- Social: Behance replaced with Twitter/X (`https://x.com/oyedokunken_`) in Footer, MobileMenu, and email templates
- Contact: Footer WhatsApp link now opens the chat modal instead of navigating directly to WhatsApp
- WhatsApp modal: Display name changed from full name to oyedokunken; modal always uses WhatsApp light theme regardless of site theme; message rewritten to two-line conversation style; green status dot moved outside overflow-hidden container to be fully visible; z-index corrected
- SEO: Expanded keywords in layout.tsx to 28 terms including Nigeria-specific and hiring-related phrases for better Google discoverability

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
- Social: LinkedIn URL updated from `linkedin.com/in/oyedokunken` to `https://www.linkedin.com/in/oyedokunken/` (across Footer, MobileMenu, email templates, GITHUB.md, README.md)
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
