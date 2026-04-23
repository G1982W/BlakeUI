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
  "onboardingflow-page": [
    "src/components/ui/onboardingflow-page.tsx",
    "src/components/app-pages/onboardingflow-page/onboarding.tsx",
    "src/components/app-pages/onboardingflow-page/cover-panel.tsx",
    "src/components/app-pages/onboardingflow-page/step-indicator.tsx",
    "src/components/app-pages/onboardingflow-page/store.ts",
  ],
  "notes-page": [
    "src/components/ui/notes-page.tsx",
    "src/components/app-pages/notes/note-app.tsx",
    "src/components/app-pages/notes/note-card.tsx",
    "src/components/app-pages/notes/note-form.tsx",
    "src/components/app-pages/notes/note-sidebar.tsx",
    "src/components/app-pages/notes/store.ts",
    "src/components/app-pages/notes/page.tsx",
  ],
  "chat-app": [
    "src/components/app-pages/chat-app/components/chat-layout.tsx",
    "src/components/app-pages/chat-app/components/chat-main.tsx",
    "src/components/app-pages/chat-app/components/chat-sidebar.tsx",
    "src/components/app-pages/chat-app/store.ts",
    "src/components/app-pages/chat-app/page.tsx",
  ],
  "multi-step-form": [
    "src/components/ui/multi-step-form-page.tsx",
    "src/components/app-pages/multi-step-form/page.tsx",
    "src/components/app-pages/multi-step-form/components/sidebar.tsx",
    "src/components/app-pages/multi-step-form/components/step-data-source.tsx",
    "src/components/app-pages/multi-step-form/components/step-first-flow.tsx",
    "src/components/app-pages/multi-step-form/components/step-invite-team.tsx",
    "src/components/app-pages/multi-step-form/components/step-role-use-case.tsx",
    "src/components/app-pages/multi-step-form/components/step-template.tsx",
  ],
  "help-center-app": [
    "src/components/ui/help-center-page.tsx",
    "src/components/app-pages/help-center/page.tsx",
    "src/components/app-pages/help-center/help-center-layout.tsx",
    "src/components/app-pages/help-center/help-search.tsx",
    "src/components/app-pages/help-center/help-categories-sidebar.tsx",
    "src/components/app-pages/help-center/help-articles-panel.tsx",
    "src/components/app-pages/help-center/help-faq.tsx",
    "src/components/app-pages/help-center/help-support.tsx",
    "src/components/app-pages/help-center/data.ts",
    "src/components/app-pages/help-center/store.ts",
    "src/components/help-center-page-demo.tsx",
  ],
  "todo-list-app": [
    "src/components/app-pages/todo-list-app-page/page.tsx",
    "src/components/app-pages/todo-list-app-page/store.ts",
    "src/components/app-pages/todo-list-app-page/types.ts",
    "src/components/app-pages/todo-list-app-page/components/todo-app.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-card.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-column.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-item.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-list-view.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-row.tsx",
    "src/components/app-pages/todo-list-app-page/components/todo-section.tsx",
    "src/components/app-pages/todo-list-app-demo-page/todo-list-app-demo-page.tsx",
    "src/components/app-pages/todo-list-app-demo-page/store.ts",
    "src/components/app-pages/todo-list-app-demo-page/types.ts",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-app.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-card.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-column.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-item.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-list-view.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-row.tsx",
    "src/components/app-pages/todo-list-app-demo-page/components/todo-section.tsx",
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
