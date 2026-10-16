# Portfolio audit plan

What to do with the reviewer's feedback, step by step. Sections 1–5 are yours to run; section 6 lists what has already been done in this repo.

> Context: recruiters increasingly point an AI agent (with a GitHub token) at your public repos and ask it to audit code quality. The portfolio has to hold up to that, and what it shows has to match reality.

---

## 1. Self-audit every public repo the way a recruiter's agent would

Do this for **this repo and each pinned / linked project** on https://github.com/oyedokunken.

1. Open the repo in Claude Code (`cd` into it and run `claude`).
2. Paste this prompt:

   ```
   Act as a senior engineer screening a candidate for a hiring manager. Audit this
   repository: code quality, structure, naming, error handling, security (secrets,
   input validation, auth), tests and coverage, CI, dependency hygiene, README
   accuracy, and anything that looks unfinished or copied. Give a score out of 10
   per area and a prioritised list of fixes. Be harsh.
   ```

3. Fix everything rated "high", then re-run the prompt until no area is below 7/10.
4. Per-repo checklist (an auditor checks all of these):
   - [ ] README: what it is, live link, screenshot, stack, how to run locally, how to test, architecture notes
   - [ ] At least a few meaningful tests, and a `test` script in `package.json`
   - [ ] CI (GitHub Actions) running lint, typecheck, tests, and build, with a status badge in the README
   - [ ] `.env.example` and no committed secrets (`gitleaks detect` locally, or check the CI job)
   - [ ] No dead code, `console.log` debugging, commented-out blocks, or TODOs you won't do
   - [ ] Pinned dependency versions (no `@latest` URLs or `*` ranges); `npm audit` clean
   - [ ] Meaningful commit messages (no "fix", "update", "asdf")
   - [ ] License file
   - [ ] Repo description, topics, and website filled in on GitHub
5. **Archive or make private** any repo you would not defend in an interview. Fewer strong repos beat many weak ones.
6. Check that every claim on oyedokun.dev and in your CV (stack, metrics, roles) can be backed by a repo, a live link, or a story you can tell.

## 2. Lighthouse on production via Chrome DevTools MCP

1. The MCP server is already configured for this project in `.mcp.json` (it runs
   `npx -y chrome-devtools-mcp@latest`, with Google's usage statistics turned off).
   Docs: https://developer.chrome.com/docs/devtools/agents
2. Start a **new** Claude Code session in this folder (the desktop app's Code tab works). Approve the
   `chrome-devtools` server when asked, then ask:

   ```
   Use the chrome-devtools MCP to run a Lighthouse audit (mobile and desktop) on
   https://www.oyedokun.dev/ . Report Performance, Accessibility, Best Practices and
   SEO scores, the LCP/CLS/TBT values, and the top fixes mapped to files in this repo.
   ```

3. Always audit the **production URL** (or `npm run build && npm start`), never `next dev`. Dev-mode scores are meaningless.
4. Fix the issues, deploy, and re-run until every category is **≥ 90 on mobile**. The usual culprits on this site:
   - Preloader delaying LCP (`components/ui/Preloader.tsx`)
   - Large hero / avatar images (`public/avatar*.png`, `public/shoot`) that should be correctly sized, use `priority` only on the hero, and convert to AVIF/WebP
   - framer-motion animating above-the-fold content from `opacity: 0`
   - Colour contrast on muted text (`--text-muted`)
5. Save the before/after scores (screenshots or the JSON report) in a short note to send back to the reviewer.

## 3. Agent-readiness (is-agentic.com)

1. Run https://www.oyedokun.dev/ through https://is-agentic.com/ and note every failed check.
2. After the changes in section 6 are deployed, run it again. Already in place: `robots.txt` allowing AI crawlers, `/llms.txt` (now listing projects), `sitemap.xml`, and JSON-LD structured data.
3. Fix whatever is still failing. If it asks for something like `/.well-known/` files or `llms-full.txt`, ask Claude Code to add them to `frontend/public/` or as Next.js route handlers.
4. Do the same for your best project sites. Each live project should at least have a good `<title>`, a meta description, OG tags, and a README linked from the site.

## 4. Stack icons via svgl, and the custom skill

Already done (see section 6). Your part:

1. Read `.claude/skills/stack-icon/SKILL.md` so you can explain it in an interview.
2. Try it: in Claude Code, type `/stack-icon Drizzle ORM in Data` and check that it adds the icon and that the site still builds.
3. When you change the stack, run `npm run icons` in `frontend/` so the local SVGs stay in sync with `data/stack.json`.

## 5. Reply to the reviewer

When sections 1–4 are done and deployed, send something like:

> Thanks again for the feedback. Here's what I did:
> - Ran an agent-driven code audit on my public repos and fixed the findings (tests and CI added, dependencies pinned, READMEs tightened).
> - Lighthouse via the Chrome DevTools MCP on the production build: before X/X/X/X → after Y/Y/Y/Y.
> - Agent-readiness: JSON-LD, an expanded llms.txt, and is-agentic.com checks passing.
> - Stack icons now come from svgl through a custom Claude Code skill I wrote (`.claude/skills/stack-icon`) that calls the svgl API.
>
> And yes, I use skills, MCPs and CLIs day to day (Claude Code, the DevTools MCP, custom skills).

Only send numbers you actually measured.

---

## 6. Done in this repo

- **Stack icons**: all tools now come from svgl's API (with light/dark variants), served locally from `frontend/public/stack/`. No `@latest` CDN hot-linking; `cdn.jsdelivr.net` was removed from the CSP and the image config. LiveKit, WebRTC and GitHub Actions aren't on svgl, so they come from a pinned `simple-icons` version.
  - Source of truth: `frontend/data/stack.json`
  - Sync script: `frontend/scripts/sync-stack-icons.mjs` (`npm run icons`)
- **Custom skill**: `.claude/skills/stack-icon/SKILL.md` adds a technology to the stack by searching the svgl API.
- **Backend tests**: Vitest + Supertest covering validation, the honeypot, the per-recipient limit, health/404 routes, CORS, and mailer failure handling (`backend/test/`). `npm test` runs in CI.
- **CI**: the backend job now runs the tests.
- **Agent-readiness**: JSON-LD (`Person` + `WebSite`) in the layout; `llms.txt` now lists projects.
