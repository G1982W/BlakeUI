"use client";

import { GripVertical, MoreHorizontal, Pin, PinOff, Pencil, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NOTE_COLORS, type Note } from "@/components/app-pages/notes/store";
import { NoteForm } from "@/components/app-pages/notes/note-form";
import { useNoteStore } from "@/components/app-pages/notes/store";

interface NoteCardProps {
  note: Note;
  viewMode: "grid" | "list";
  canDrag: boolean;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function NoteCard({ note, viewMode, canDrag }: NoteCardProps) {
  const { updateNote, deleteNote, togglePin } = useNoteStore();
  const colors = NOTE_COLORS[note.color];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: note.id, disabled: !canDrag });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition
  };

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 group-hover:opacity-100 focus:opacity-100 shrink-0"
          onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <NoteForm
          defaultValues={note}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pencil className="size-3.5 mr-2" />
              Edit
            </DropdownMenuItem>
          }
          onSubmit={(values) => updateNote(note.id, values)}
        />
        <DropdownMenuItem onClick={() => togglePin(note.id)}>
          {note.pinned ? (
            <><PinOff className="size-3.5 mr-2" />Unpin</>
          ) : (
            <><Pin className="size-3.5 mr-2" />Pin</>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => deleteNote(note.id)}>
          <Trash2 className="size-3.5 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const gripHandle = canDrag && (
    <GripVertical
      className="text-muted-foreground/40 size-4 shrink-0 cursor-grab active:cursor-grabbing touch-none"
      {...attributes}
      {...listeners}
    />
  );

  if (viewMode === "list") {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "group flex items-start gap-3 rounded-xl border px-4 py-3 transition-all",
          colors.bg,
          colors.border,
          isDragging && "opacity-40 scale-[0.98] z-50"
        )}>
        {gripHandle && <div className="mt-0.5">{gripHandle}</div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {note.pinned && <Pin className="size-3 text-muted-foreground shrink-0" />}
              <p className="truncate text-sm font-semibold">{note.title}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="secondary" className="text-[11px] h-5">{note.category}</Badge>
              <span className="text-muted-foreground text-[11px]">{timeAgo(note.updatedAt)}</span>
              {actions}
            </div>
          </div>
          {note.content && (
            <p className="text-muted-foreground mt-0.5 truncate text-xs">{note.content}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex flex-col rounded-xl border p-4 transition-all",
        colors.bg,
        colors.border,
        isDragging && "opacity-40 scale-[0.98] z-50"
      )}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {note.pinned && <Pin className="size-3 text-muted-foreground shrink-0" />}
          {gripHandle}
          <p className="truncate text-sm font-semibold">{note.title}</p>
        </div>
        {actions}
      </div>

      {note.content && (
        <p className="text-muted-foreground mb-3 line-clamp-4 flex-1 text-xs leading-relaxed whitespace-pre-line">
          {note.content}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
        <Badge variant="secondary" className="text-[11px] h-5">{note.category}</Badge>
        <span className="text-muted-foreground text-[11px]">{timeAgo(note.updatedAt)}</span>
      </div>
    </div>
  );
}
