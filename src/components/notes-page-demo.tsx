"use client";

import { NoteApp } from "@/components/app-pages/notes-demo/note-app";
import { cn } from "@/lib/utils";

export function NotesPageDemo({ className }: { className?: string }) {
  return (
    <div className={cn("bg-background w-full", className)}>
      <NoteApp />
    </div>
  );
}
