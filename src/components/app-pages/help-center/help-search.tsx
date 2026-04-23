"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useHelpCenterStore } from "./store";

export function HelpSearch() {
  const searchQuery = useHelpCenterStore((s) => s.searchQuery);
  const setSearchQuery = useHelpCenterStore((s) => s.setSearchQuery);

  return (
    <div className="relative w-full max-w-xl">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2" />
      <Input
        type="search"
        placeholder="Search articles, billing, security…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        inputClassName="h-10 rounded-lg pl-9"
        aria-label="Search help center"
      />
    </div>
  );
}
