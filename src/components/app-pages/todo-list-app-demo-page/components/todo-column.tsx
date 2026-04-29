"use client";

import { useState, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Section, Priority } from "../types";
import { useTodoStore } from "../store";
import { TodoCard } from "./todo-card";

const COLOR_STYLES = {
  violet: {
    accent: "bg-violet-500",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    drop: "bg-violet-50 dark:bg-violet-950/20",
  },
  amber: {
    accent: "bg-amber-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    drop: "bg-amber-50 dark:bg-amber-950/20",
  },
  emerald: {
    accent: "bg-emerald-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    drop: "bg-emerald-50 dark:bg-emerald-950/20",
  },
};

interface TodoColumnProps {
  section: Section;
}

export function TodoColumn({ section }: TodoColumnProps) {
  const { addTodo } = useTodoStore();
  const { setNodeRef, isOver } = useDroppable({ id: section.id });
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const inputRef = useRef<HTMLInputElement>(null);

  const colors = COLOR_STYLES[section.color];

  const handleAdd = () => {
    if (!newText.trim()) return;
    addTodo(section.id, newText.trim(), newPriority);
    setNewText("");
    setNewPriority("medium");
    setAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
    if (e.key === "Escape") {
      setAdding(false);
      setNewText("");
    }
  };

  const startAdding = () => {
    setAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Column Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={cn("size-2.5 rounded-full", colors.accent)} />
          <h2 className="text-foreground text-sm font-semibold">{section.title}</h2>
          <span
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-full p-0 text-[11px] leading-none font-medium",
              colors.badge,
            )}
          >
            {section.todos.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="size-7"
          onClick={startAdding}
        >
          <Plus className="size-3.5" />
        </Button>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[80px] flex-col gap-2 rounded-xl p-2 transition-colors",
          isOver && colors.drop,
        )}
      >
        <SortableContext
          items={section.todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </SortableContext>

        {section.todos.length === 0 && !adding && (
          <div className="border-border/60 flex h-16 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground text-xs">
              {isOver ? "Drop here" : "No tasks"}
            </p>
          </div>
        )}

        {/* Inline Add Form */}
        {adding && (
          <div className="border-border/60 bg-card space-y-2 rounded-xl border p-3 shadow-xs">
            <Input
              ref={inputRef}
              placeholder="Task name..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="placeholder:text-muted-foreground/60 h-8 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center gap-2">
              <Select
                value={newPriority}
                onValueChange={(v) => setNewPriority(v as Priority)}
              >
                <SelectTrigger className="h-7 w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="ml-auto flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-7"
                  onClick={() => {
                    setAdding(false);
                    setNewText("");
                  }}
                >
                  <X className="size-3.5" />
                </Button>
                <Button
                  size="sm"
                  className="size-7"
                  disabled={!newText.trim()}
                  onClick={handleAdd}
                >
                  <Check className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Button */}
      {!adding && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground h-8 w-full justify-start gap-2 text-xs"
          onClick={startAdding}
        >
          <Plus className="size-3.5" />
          Add task
        </Button>
      )}
    </div>
  );
}
