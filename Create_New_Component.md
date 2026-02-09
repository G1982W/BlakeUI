# Adding a New Component

Follow these steps to add a new component to the documentation:

### 1. Install via shadcn CLI
Run the following command in `apps/shalcn-docs`:
```bash
pnpm dlx shadcn@latest add [component-name]
```

### 2. Register Component for Docs
Add the component implementation to `apps/shalcn-docs/src/components/registry.tsx`:
```tsx
import { [ComponentName] } from "@/components/ui/[component-name]"

export const registry = {
  // ...
  [ComponentName],
}
```

### 3. Update Code & Prop Registry
Run the build script to extract the source code for the "Copy Code" feature and automatically generate prop metadata for the `PropsTable`:
```bash
pnpm registry:build
```

### 4. Add Documentation Page
Create a new MDX file in `apps/shalcn-docs/content/docs/[component-name].mdx`:

```mdx
---
title: [ComponentName]
description: [Description]
---

import { [ComponentName] } from "@/components/ui/[component-name]"

## Example
<ComponentPreview name="[component-name]">
  <[ComponentName] />
</ComponentPreview>

## Variants
<VariantGrid component="[ComponentName]" variants={{ ... }} />

## Playground
<Playground component="[ComponentName]" controls={{ ... }} />

## Props
<PropsTable component="[ComponentName]" />
```

### 5. Document Props (via JSDoc)
Prop metadata is extracted automatically. To add descriptions or default values to the `PropsTable`, use JSDoc comments in your component's TypeScript definition:

```tsx
interface [ComponentName]Props {
  /** The visual style of the component */
  variant?: "default" | "outline"
  /**
   * Whether to render as a child element
   * @default false
   */
  asChild?: boolean
}
```
The `registry:build` script will pick these up and update `src/props.json`.

> [!TIP]
> **Base HTML Components**: If your component directly inherits from a base HTML element (like `Input` or `Textarea`) without adding custom types, you should explicitly re-declare the props you want to show in the documentation within your local interface. This ensures they aren't filtered out by the automated parser.
