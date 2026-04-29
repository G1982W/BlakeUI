"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Todo, Priority } from "../types";
import { useTodoStore } from "../store";

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  low: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

interface TodoRowContentProps {
  todo: Todo;
  overlay?: boolean;
}

export function TodoRowContent({ todo, overlay }: TodoRowContentProps) {
  const { toggleTodo, deleteTodo, updateTodoPriority } = useTodoStore();

  return (
    <div
      className={cn(
        "group flex items-center gap-3 border-b border-border/50 px-4 py-2.5 transition-colors hover:bg-muted/30",
        overlay && "bg-card rounded-lg border shadow-lg",
      )}
    >
      <GripVertical className="text-muted-foreground/30 size-4 shrink-0" />

      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="shrink-0"
      />

      <p
        className={cn(
          "flex-1 text-sm",
          todo.completed && "text-muted-foreground line-through",
        )}
      >
        {todo.text}
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
              PRIORITY_STYLES[todo.priority],
            )}
          >
            {PRIORITY_LABELS[todo.priority]}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          {(["high", "medium", "low"] as Priority[]).map((p) => (
            <DropdownMenuItem
              key={p}
              onClick={() => updateTodoPriority(todo.id, p)}
              className={cn(todo.priority === p && "font-medium")}
            >
              <span
                className={cn(
                  "mr-2 inline-flex size-2 rounded-full",
                  p === "high" && "bg-rose-500",
                  p === "medium" && "bg-amber-500",
                  p === "low" && "bg-sky-500",
                )}
              />
              {PRIORITY_LABELS[p]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {!overlay && (
        <Button
          variant="ghost"
          size="sm"
          className="size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="text-muted-foreground size-3.5" />
        </Button>
      )}
    </div>
  );
}

export function TodoRow({ todo }: { todo: Todo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-0")}
    >
      <div
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <TodoRowContent todo={todo} />
      </div>
    </div>
  );
}
