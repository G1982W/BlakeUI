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

interface TodoCardContentProps {
  todo: Todo;
  overlay?: boolean;
  className?: string;
}

export function TodoCardContent({
  todo,
  overlay,
  className,
}: TodoCardContentProps) {
  const { toggleTodo, deleteTodo, updateTodoPriority } = useTodoStore();

  return (
    <div
      className={cn(
        "group bg-card border-border/60 flex items-start gap-3 rounded-xl border p-3.5 shadow-xs transition-shadow hover:shadow-sm",
        overlay && "shadow-lg rotate-1 ring-2 ring-primary/20",
        className,
      )}
    >
      <GripVertical className="text-muted-foreground/40 mt-0.5 size-4 shrink-0" />

      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="mt-0.5 shrink-0"
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-relaxed",
            todo.completed && "text-muted-foreground line-through",
          )}
        >
          {todo.text}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium transition-opacity",
                  PRIORITY_STYLES[todo.priority],
                )}
              >
                {PRIORITY_LABELS[todo.priority]}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-32">
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
        </div>
      </div>

      {!overlay && (
        <Button
          variant="ghost"
          size="sm"
          className="size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
        </Button>
      )}
    </div>
  );
}

interface TodoCardProps {
  todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
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
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        className="cursor-grab active:cursor-grabbing [&_.lucide-grip-vertical]:pointer-events-none"
      >
        <TodoCardContent todo={todo} />
      </div>
    </div>
  );
}
