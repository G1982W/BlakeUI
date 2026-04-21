/**
 * Fumadocs `SidebarProvider` hardcodes `(width < 768px)` for drawer vs full mode
 * (`node_modules/fumadocs-ui/dist/components/sidebar/base.js`). Our docs layout
 * uses 786px — without this patch, 768–786px shows a broken mix (and odd overlays).
 *
 * Run from postinstall after `pnpm install`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const target = path.join(
  root,
  "node_modules/fumadocs-ui/dist/components/sidebar/base.js",
);

const FROM = `useMediaQuery("(width < 768px)")`;
const TO = `useMediaQuery("(max-width: 786px)")`;

if (!fs.existsSync(target)) {
  console.warn(
    "[apply-fumadocs-sidebar-breakpoint] skip: fumadocs-ui not installed yet",
  );
  process.exit(0);
}

let s = fs.readFileSync(target, "utf8");
if (s.includes(TO)) {
  console.log("[apply-fumadocs-sidebar-breakpoint] already applied");
  process.exit(0);
}
if (!s.includes(FROM)) {
  console.warn(
    "[apply-fumadocs-sidebar-breakpoint] skip: expected snippet not found (fumadocs-ui version changed?)",
  );
  process.exit(0);
}

s = s.replace(FROM, TO);
fs.writeFileSync(target, s);
console.log("[apply-fumadocs-sidebar-breakpoint] patched", path.relative(root, target));
