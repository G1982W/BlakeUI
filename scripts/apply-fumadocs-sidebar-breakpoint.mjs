/**
 * Align Fumadocs docs chrome with a 786px mobile breakpoint (see global.css).
 *
 * 1) SidebarProvider drawer mode: `(width < 768px)` → `(max-width: 786px)`.
 * 2) Sidebar placeholder: `max-md:hidden` hides only below 768px, so at 768px the
 *    [data-sidebar-placeholder] grid cell still shows and eats horizontal space.
 *    Use `max-[786px]:hidden` instead (matches base.js + global.css).
 * 3) Docs layout header / top tabs: same `max-md` → `max-[786px]` so behavior matches.
 *
 * Run from postinstall after `pnpm install`.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function patchFile(rel, edits) {
  const target = path.join(root, rel);
  if (!fs.existsSync(target)) {
    console.warn(`[apply-fumadocs-sidebar-breakpoint] skip missing: ${rel}`);
    return false;
  }
  let s = fs.readFileSync(target, "utf8");
  let changed = false;
  for (const { from, to } of edits) {
    if (s.includes(to)) continue;
    if (!s.includes(from)) continue;
    s = s.split(from).join(to);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(target, s);
    console.log("[apply-fumadocs-sidebar-breakpoint] patched", rel);
  }
  return changed;
}

const base = "node_modules/fumadocs-ui/dist/components/sidebar/base.js";
const sidebar = "node_modules/fumadocs-ui/dist/layouts/docs/sidebar.js";
const layoutIndex = "node_modules/fumadocs-ui/dist/layouts/docs/index.js";

patchFile(base, [
  {
    from: `useMediaQuery("(width < 768px)")`,
    to: `useMediaQuery("(max-width: 786px)")`,
  },
]);

patchFile(sidebar, [
  {
    from: `md:layout:[--fd-sidebar-width:268px] max-md:hidden`,
    to: `md:layout:[--fd-sidebar-width:268px] max-[786px]:hidden`,
  },
]);

patchFile(layoutIndex, [
  {
    from: `md:hidden max-md:layout:[--fd-header-height:--spacing(14)]`,
    to: `md:hidden max-[786px]:layout:[--fd-header-height:--spacing(14)]`,
  },
  {
    from: `xl:px-8 max-md:hidden`,
    to: `xl:px-8 max-[786px]:hidden`,
  },
]);

console.log("[apply-fumadocs-sidebar-breakpoint] done");
