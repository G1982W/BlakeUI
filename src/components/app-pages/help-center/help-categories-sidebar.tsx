"use client";

import {
  BookOpen,
  CreditCard,
  LayoutGrid,
  LifeBuoy,
  Puzzle,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { helpCategories, type HelpCategory } from "./data";
import { useHelpCenterStore, type HelpCategoryFilter } from "./store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconMap: Record<HelpCategory["icon"], LucideIcon> = {
  book: BookOpen,
  credit: CreditCard,
  shield: Shield,
  puzzle: Puzzle,
  lifebuoy: LifeBuoy,
};

function CategoryIcon({ id }: { id: HelpCategoryFilter }) {
  if (id === "all") return <LayoutGrid className="size-4" />;
  const c = helpCategories.find((x) => x.id === id);
  const Icon = c ? iconMap[c.icon] : BookOpen;
  return <Icon className="size-4" />;
}

export function HelpCategoriesSidebar() {
  const categoryId = useHelpCenterStore((s) => s.categoryId);
  const setCategoryId = useHelpCenterStore((s) => s.setCategoryId);

  const pill = (id: HelpCategoryFilter, label: string, active: boolean) => (
    <button
      key={id}
      type="button"
      onClick={() => setCategoryId(id)}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
        active
          ? "border-primary/30 bg-primary/5 text-foreground shadow-sm"
          : "border-transparent text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md border text-xs",
          active
            ? "border-primary/25 bg-primary/10 text-primary"
            : "border-border bg-background text-muted-foreground",
        )}
      >
        <CategoryIcon id={id} />
      </span>
      <span className="min-w-0 flex-1 font-medium">{label}</span>
    </button>
  );

  return (
    <>
      <div className="md:hidden">
        <Select
          value={categoryId}
          onValueChange={(v) => setCategoryId(v as HelpCategoryFilter)}>
          <SelectTrigger className="bg-background w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All topics</SelectItem>
            {helpCategories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav
        className="hidden flex-col gap-1 md:flex"
        aria-label="Help categories">
        {pill("all", "All topics", categoryId === "all")}
        {helpCategories.map((c) => (
          <div key={c.id}>
            {pill(c.id, c.label, categoryId === c.id)}
            {categoryId === c.id && (
              <p className="text-muted-foreground mt-1 mb-2 ml-11 text-xs leading-snug">
                {c.description}
              </p>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
