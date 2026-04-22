"use client";

import { NoteApp } from "@/components/app-pages/notes/note-app";
import { cn } from "@/lib/utils";

export interface NotesPageProps {
  className?: string;
}

export function NotesPage({ className }: NotesPageProps) {
  return (
    <div className={cn("bg-background min-h-screen w-full", className)}>
      <NoteApp />
    </div>
  );
}
