"use client";

import { useMemo } from "react";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  StickyNote,
  X,
  Pin,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Toggle } from "@/components/ui/toggle";
import { useNoteStore, useUIStore } from "./store";
import { NoteCard } from "./note-card";
import { NoteForm } from "./note-form";
import { NoteSidebar } from "./note-sidebar";

export function NoteApp() {
  const { notes, viewMode, setViewMode, addNote, reorderNotes } =
    useNoteStore();
  const {
    search,
    activeCategory,
    activeColor,
    sidebarOpen,
    setSearch,
    setSidebarOpen,
    clearFilters,
  } = useUIStore();

  const isFiltered = !!(search || activeCategory || activeColor);

  const filtered = useMemo(() => {
    let result = [...notes];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q),
      );
    }
    if (activeCategory)
      result = result.filter((n) => n.category === activeCategory);
    if (activeColor) result = result.filter((n) => n.color === activeColor);

    if (isFiltered) {
      return result.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    }

    return result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return a.order - b.order;
    });
  }, [notes, search, activeCategory, activeColor, isFiltered]);

  const pinnedNotes = !isFiltered ? filtered.filter((n) => n.pinned) : [];
  const regularNotes = !isFiltered
    ? filtered.filter((n) => !n.pinned)
    : filtered;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderNotes(String(active.id), String(over.id));
    }
  };

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 @sm/cards:grid-cols-2 @lg/cards:grid-cols-3 @xl/cards:grid-cols-4 gap-3"
      : "flex flex-col gap-2";

  const strategy =
    viewMode === "grid" ? rectSortingStrategy : verticalListSortingStrategy;

  const renderSection = (sectionNotes: typeof filtered) => (
    <SortableContext items={sectionNotes.map((n) => n.id)} strategy={strategy}>
      <div className={gridClass}>
        {sectionNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            viewMode={viewMode}
            canDrag={!isFiltered}
          />
        ))}
      </div>
    </SortableContext>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-background flex w-full overflow-hidden @container max-[1440px]:h-screen min-[1441px]:h-full min-[1441px]:min-h-0">
        {/* Desktop Sidebar */}
        <aside className="hidden w-52 shrink-0 !border-r-0 @lg:flex @lg:flex-col">
          <div className="flex items-center gap-2 px-4 py-4">
            <StickyNote className="text-primary size-5" />
            <span className="font-semibold">Notes</span>
          </div>
          <div className="flex shrink-0 items-center justify-center border-b border-t px-3 py-3">
            <NoteForm onSubmit={addNote} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <NoteSidebar />
          </div>
        </aside>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Filters</SheetTitle>
            <div className="flex items-center gap-2 px-4 py-4">
              <StickyNote className="text-primary size-5" />
              <span className="font-semibold">Notes</span>
            </div>
            <div className="flex shrink-0 items-center justify-center border-b px-3 py-3">
              <NoteForm onSubmit={addNote} />
            </div>
            <div className="flex-1 overflow-y-auto">
              <NoteSidebar />
            </div>
          </SheetContent>
        </Sheet>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex flex-wrap shrink-0 items-center gap-2 border-b px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="@lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <SlidersHorizontal className="size-4" />
            </Button>

            <div className="relative max-w-sm flex-1">
              <div className="flex h-9 w-full items-stretch overflow-hidden rounded-md border border-border bg-white dark:bg-transparent">
                <div className="flex items-center justify-center px-3">
                  <Search className="text-muted-foreground/80 size-3.5" />
                </div>
                <input
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-full min-w-0 border-0 bg-white text-sm shadow-none ring-0 outline-none focus:ring-0 focus:outline-none dark:bg-transparent"
                />
              </div>
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
                  onClick={() => setSearch("")}
                >
                  <X className="size-3.5" />
                </Button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              {isFiltered && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-8 gap-1 text-xs"
                  onClick={clearFilters}
                >
                  <X className="size-3" />
                  Clear filters
                </Button>
              )}
              <div className="flex items-center gap-1 rounded-md border border-border bg-code-background p-1 text-xs text-foreground">
                <Toggle
                  pressed={viewMode === "grid"}
                  onPressedChange={() => setViewMode("grid")}
                  size="xs"
                  aria-label="Grid view"
                  className="cursor-pointer rounded-sm px-2 py-1 text-muted-foreground transition-all hover:bg-background hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
                >
                  <LayoutGrid className="size-3.5" />
                </Toggle>
                <Toggle
                  pressed={viewMode === "list"}
                  onPressedChange={() => setViewMode("list")}
                  size="xs"
                  aria-label="List view"
                  className="cursor-pointer rounded-sm px-2 py-1 text-muted-foreground transition-all hover:bg-background hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
                >
                  <List className="size-3.5" />
                </Toggle>
              </div>

              <div className="@lg:hidden">
                <NoteForm
                  onSubmit={addNote}
                  trigger={
                    <Button size="sm" className="h-8 gap-1.5">
                      Add note
                    </Button>
                  }
                />
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="@container/cards flex-1 overflow-y-auto p-4 @lg:p-5">
            {filtered.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <StickyNote className="text-muted-foreground/30 mx-auto mb-3 size-12" />
                  <p className="text-muted-foreground text-sm font-medium">
                    No notes found
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {isFiltered
                      ? "Try adjusting your filters"
                      : "Create your first note"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {pinnedNotes.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-1.5">
                      <Pin className="text-muted-foreground size-3" />
                      <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                        Pinned
                      </span>
                    </div>
                    {renderSection(pinnedNotes)}
                  </div>
                )}

                {regularNotes.length > 0 && (
                  <div>
                    {pinnedNotes.length > 0 && (
                      <div className="mb-3 flex items-center gap-1.5">
                        <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                          {isFiltered
                            ? `${regularNotes.length} results`
                            : "Notes"}
                        </span>
                      </div>
                    )}
                    {renderSection(regularNotes)}
                  </div>
                )}

                {!isFiltered && (
                  <p className="text-muted-foreground/50 pt-2 text-center text-xs">
                    Drag notes to reorder
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DndContext>
  );
}
