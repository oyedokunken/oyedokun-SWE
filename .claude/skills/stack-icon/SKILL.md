---
name: stack-icon
description: Add, swap or remove a technology in the portfolio's "Tools of the trade" stack grid, sourcing its logo from the svgl API (https://svgl.app). Use when the user says things like "add Drizzle to my stack", "replace MySQL with SQLite", "/stack-icon Bun in Backend".
argument-hint: <technology> [in <group>] [replacing <technology>]
---

# Stack icon

The stack grid in `frontend/components/sections/Skills.tsx` renders `frontend/data/stack.json`.
Icons are downloaded into `frontend/public/stack/` by `frontend/scripts/sync-stack-icons.mjs`;
the site never hot-links an icon CDN.

## Steps

1. **Find the logo on svgl.** Query the API and pick the entry whose `title` is the technology:

   ```bash
   curl -s "https://api.svgl.app?search=<technology>"
   ```

   - Each result has `title`, `category` and `route`. `route` is either one URL or
     `{ "light": ..., "dark": ... }`; the sync script handles both.
   - If several results come back, choose the exact product (e.g. "Express.js", not "Expo").
   - If svgl has nothing, check simple-icons instead
     (`https://cdn.jsdelivr.net/npm/simple-icons@16.35.0/icons/<slug>.svg` returns 200)
     and use `"simpleIcons": "<slug>"`. If neither has it, stop and tell the user.

2. **Edit `frontend/data/stack.json`.** Add `{ "name": "<display name>", "svgl": "<exact svgl title>" }`
   to the requested group (ask which group if the user didn't say and it isn't obvious).
   - Every group must keep **exactly five** tools so the grid stays even. When adding to a
     full group, ask the user which tool to drop (or follow their "replacing X").
   - Don't hand-write `icon` / `iconDark`; the script fills them in.

3. **Sync the icons** from `frontend/`:

   ```bash
   npm run icons
   ```

   Delete any `public/stack/*.svg` belonging to a tool you removed.

4. **Verify** from `frontend/`: `npm run icons -- --check`, `npm run typecheck`, `npm run lint`.
   If a dev server is running, check the Stack section renders in both light and dark themes.

5. Report which source (svgl or simple-icons) each new icon came from and whether it has a dark variant.
