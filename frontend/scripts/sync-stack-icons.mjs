// Downloads every icon listed in data/stack.json into public/stack/ and writes the
// resulting local paths back into the JSON, so the site never hot-links a CDN.
//
// Sources, in order of preference:
//   svgl        - https://api.svgl.app (has light/dark variants for many logos)
//   simpleIcons - a pinned simple-icons release, for logos svgl doesn't carry
//
// Usage: npm run icons            (re-downloads everything)
//        npm run icons -- --check (fails if any icon file is missing; used in CI)

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SIMPLE_ICONS_VERSION = "16.35.0";
const SVGL_API = "https://api.svgl.app";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataFile = path.join(root, "data", "stack.json");
const outDir = path.join(root, "public", "stack");
const checkOnly = process.argv.includes("--check");

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

// Returns { light, dark? } source URLs for an exact svgl title match.
async function resolveSvgl(title) {
  const res = await fetch(`${SVGL_API}?search=${encodeURIComponent(title)}`);
  if (!res.ok) throw new Error(`svgl search failed for "${title}": ${res.status}`);
  const results = await res.json();
  const match = results.find((r) => r.title.toLowerCase() === title.toLowerCase());
  if (!match) throw new Error(`svgl has no icon titled "${title}"`);
  return typeof match.route === "string" ? { light: match.route } : match.route;
}

// simple-icons ships single-colour paths with no fill, so the dark variant is
// the same path painted white.
async function fetchSimpleIcon(slug) {
  const svg = await fetchText(
    `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/${slug}.svg`
  );
  return { light: svg, dark: svg.replace("<svg ", '<svg fill="#ffffff" ') };
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

const stack = JSON.parse(await readFile(dataFile, "utf8"));

if (checkOnly) {
  const missing = [];
  for (const skill of stack.groups.flatMap((g) => g.skills)) {
    for (const p of [skill.icon, skill.iconDark].filter(Boolean)) {
      if (!(await exists(path.join(root, "public", p)))) missing.push(p);
    }
    if (!skill.icon) missing.push(`${skill.name} (no icon)`);
  }
  if (missing.length) {
    console.error(`Missing stack icons:\n  ${missing.join("\n  ")}\nRun: npm run icons`);
    process.exit(1);
  }
  console.log("All stack icons present.");
  process.exit(0);
}

await mkdir(outDir, { recursive: true });

for (const skill of stack.groups.flatMap((g) => g.skills)) {
  const slug = slugify(skill.name);
  let light;
  let dark;

  if (skill.svgl) {
    const routes = await resolveSvgl(skill.svgl);
    light = await fetchText(routes.light);
    if (routes.dark) dark = await fetchText(routes.dark);
  } else if (skill.simpleIcons) {
    ({ light, dark } = await fetchSimpleIcon(skill.simpleIcons));
  } else {
    throw new Error(`"${skill.name}" needs an "svgl" title or a "simpleIcons" slug`);
  }

  await writeFile(path.join(outDir, `${slug}.svg`), light);
  skill.icon = `/stack/${slug}.svg`;
  if (dark) {
    await writeFile(path.join(outDir, `${slug}-dark.svg`), dark);
    skill.iconDark = `/stack/${slug}-dark.svg`;
  } else {
    delete skill.iconDark;
  }
  console.log(`✓ ${skill.name}${dark ? " (light + dark)" : ""}`);
}

await writeFile(dataFile, JSON.stringify(stack, null, 2) + "\n");
console.log(`\nWrote ${path.relative(root, dataFile)}`);
