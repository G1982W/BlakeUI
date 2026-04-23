"use client";

import { Palette, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CATEGORIES, NOTE_COLORS, type NoteColor, useNoteStore, useUIStore } from "@/components/app-pages/notes/store";

export function NoteSidebar() {
  const { notes } = useNoteStore();
  const {
    activeCategory,
    activeColor,
    setActiveCategory,
    setActiveColor,
    setSidebarOpen,
    clearFilters
  } = useUIStore();

  const hasFilter = activeCategory !== null || activeColor !== null;

  const categoryCount = (cat: string) => notes.filter((n:any) => n.category === cat).length;
  const colorCount = (col: NoteColor) => notes.filter((n:any) => n.color === col).length;

  return (
    <div className="flex h-full flex-col gap-1 p-3">
      <div className="mb-1 flex items-center justify-between px-2 py-1">
        <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Filters
        </span>
        <div className="flex items-center gap-1">
          {hasFilter && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-6 px-2 text-xs"
              onClick={clearFilters}>
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="size-6 lg:hidden"
            onClick={() => setSidebarOpen(false)}>
            <X className="size-3.5" />
          </Button>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className={cn(
          "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
          !hasFilter
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}>
        <span>All Notes</span>
        <Badge variant="secondary" className="h-5 text-[11px]">
          {notes.length}
        </Badge>
      </button>
      {CATEGORIES.filter((c) => categoryCount(c) > 0).map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
            activeCategory === cat
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}>
          <span>{cat}</span>
          <Badge variant="secondary" className="h-5 text-[11px]">
            {categoryCount(cat)}
          </Badge>
        </button>
      ))}

      <Separator className="my-2" />

      <div className="mb-1 px-2">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
          <Palette className="size-3" />
          Colors
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-3">
        {(Object.keys(NOTE_COLORS) as NoteColor[])
          .filter((c) => colorCount(c) > 0)
          .map((col) => (
            <button
              key={col}
              title={NOTE_COLORS[col].label}
              onClick={() => setActiveColor(activeColor === col ? null : col)}
              className={cn(
                "size-6 rounded-full border-2 transition-all hover:scale-110",
                NOTE_COLORS[col].dot,
                activeColor === col ? "border-foreground scale-110" : "border-transparent"
              )}
            />
          ))}
      </div>

      {activeColor && (
        <p className="text-muted-foreground mt-1 px-3 text-xs">
          {NOTE_COLORS[activeColor].label} · {colorCount(activeColor)} notes
        </p>
      )}
    </div>
  );
}
