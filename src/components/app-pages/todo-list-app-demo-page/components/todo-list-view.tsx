"use client";

import { useState, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, X, Check, ChevronDown } from "lucide-react";
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
import { TodoRow } from "./todo-row";

const COLOR_DOT: Record<Section["color"], string> = {
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
};

function ListSection({ section }: { section: Section }) {
  const { addTodo } = useTodoStore();
  const { setNodeRef, isOver } = useDroppable({ id: section.id });
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = section.todos.filter((t) => t.completed).length;

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
    setCollapsed(false);
    setAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 transition-shadow",
        isOver && "ring-2 ring-primary/20",
      )}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 bg-muted/30 px-4 py-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex flex-1 items-center gap-2.5 text-left"
        >
          <div
            className={cn(
              "size-2.5 shrink-0 rounded-full",
              COLOR_DOT[section.color],
            )}
          />
          <span className="text-foreground text-sm font-semibold">{section.title}</span>
          <span className="text-muted-foreground ml-1 text-xs">
            {completedCount}/{section.todos.length}
          </span>
          <ChevronDown
            className={cn(
              "text-muted-foreground ml-auto size-3.5 transition-transform",
              collapsed && "-rotate-90",
            )}
          />
        </button>
        <Button
          variant="ghost"
          size="sm"
          className="size-7 shrink-0"
          onClick={startAdding}
        >
          <Plus className="size-3.5" />
        </Button>
      </div>

      {!collapsed && (
        <div ref={setNodeRef}>
          <SortableContext
            items={section.todos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {section.todos.map((todo) => (
              <TodoRow key={todo.id} todo={todo} />
            ))}
          </SortableContext>

          {section.todos.length === 0 && !adding && (
            <div className="flex h-12 items-center justify-center">
              <p className="text-muted-foreground text-xs">
                {isOver ? "Drop here" : "No tasks"}
              </p>
            </div>
          )}

          {/* Inline Add Form */}
          {adding && (
            <div className="flex items-center gap-3 border-b border-border/50 px-4 py-2.5">
              <div className="size-4 shrink-0" />
              <div className="size-4 shrink-0" />
              <Input
                ref={inputRef}
                placeholder="New task..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-7 flex-1 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
              />
              <Select
                value={newPriority}
                onValueChange={(v) => setNewPriority(v as Priority)}
              >
                <SelectTrigger className="h-7 w-28 shrink-0 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex shrink-0 gap-1">
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
          )}

          {!adding && (
            <button
              onClick={startAdding}
              className="text-muted-foreground hover:text-foreground flex w-full items-center gap-2 px-4 py-2.5 text-xs transition-colors hover:bg-muted/30"
            >
              <Plus className="size-3.5" />
              Add task
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function TodoListView() {
  const { sections } = useTodoStore();

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {sections.map((section) => (
        <ListSection key={section.id} section={section} />
      ))}
    </div>
  );
}
