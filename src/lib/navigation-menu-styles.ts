import { cn } from "@/lib/utils";

/** Shared className for navigation menu trigger and link. Safe to use in server and client. */
export const navigationMenuTriggerStyle = cn(
  "focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
);
