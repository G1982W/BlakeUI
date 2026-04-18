/**
 * Bundles source files for "app page" docs previews (multi-file tabbed code).
 * Add new entries to BUNDLES when you ship another full-page block.
 *
 * Run via: node scripts/build-app-page-sources.mjs
 * (Invoked from `pnpm registry:build`.)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/** @type {Record<string, string[]>} */
const BUNDLES = {
  "course-detail-page": [
    "src/components/ui/course-detail-page.tsx",
    "src/components/app-pages/course-detail page/course-header.tsx",
    "src/components/app-pages/course-detail page/video-player.tsx",
    "src/components/app-pages/course-detail page/course-curriculum.tsx",
    "src/components/app-pages/course-detail page/course-details.tsx",
    "src/components/app-pages/course-detail page/instructor-profile.tsx",
    "src/components/app-pages/course-detail page/circle-progress.tsx",
    "src/components/app-pages/course-detail page/data.ts",
  ],
};

function toDisplayPath(rel) {
  return rel.split(path.sep).join("/");
}

/** @type {Record<string, { files: { path: string; content: string }[] }>} */
const out = {};

for (const [id, relPaths] of Object.entries(BUNDLES)) {
  out[id] = {
    files: relPaths.map((rel) => {
      const abs = path.join(root, rel);
      if (!fs.existsSync(abs)) {
        throw new Error(`build-app-page-sources: missing file ${rel}`);
      }
      const content = fs.readFileSync(abs, "utf8");
      return { path: `/${toDisplayPath(rel)}`, content };
    }),
  };
}

const outPath = path.join(root, "src/generated/app-page-sources.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`);
console.log(`✅ App page sources: ${outPath}`);
