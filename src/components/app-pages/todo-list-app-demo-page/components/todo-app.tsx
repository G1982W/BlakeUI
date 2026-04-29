"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CheckSquare2, LayoutGrid, List } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTodoStore } from "../store";
import { TodoColumn } from "./todo-column";
import { TodoListView } from "./todo-list-view";
import { TodoCardContent } from "./todo-card";
import { TodoRowContent } from "./todo-row";
import { Section, Todo } from "../types";

export function TodoApp() {
  const { sections, setSections, viewMode, setViewMode } = useTodoStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const getContainerIdOf = (id: string): string | null => {
    if (sections.some((s) => s.id === id)) return id;
    return (
      sections.find((s) => s.todos.some((t: Todo) => t.id === id))?.id ?? null
    );
  };

  const getActiveTodo = (): Todo | null => {
    if (!activeId) return null;
    for (const section of sections) {
      const todo = section.todos.find((t: Todo) => t.id === activeId);
      if (todo) return todo;
    }
    return null;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(String(active.id));
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    const activeContainerId = getContainerIdOf(activeId);
    const overContainerId = getContainerIdOf(overId);

    if (!activeContainerId || !overContainerId) return;
    if (activeContainerId === overContainerId) return;

    setSections(
      sections.map((s: Section) => {
        if (s.id === activeContainerId) {
          return {
            ...s,
            todos: s.todos.filter((t: Todo) => t.id !== activeId),
          };
        }
        if (s.id === overContainerId) {
          const todo = sections
            .find((sec) => sec.id === activeContainerId)!
            .todos.find((t: Todo) => t.id === activeId)!;

          const overTodoIdx = s.todos.findIndex((t: Todo) => t.id === overId);
          const newTodos = [...s.todos];

          if (overTodoIdx >= 0) {
            newTodos.splice(overTodoIdx, 0, todo);
          } else {
            newTodos.push(todo);
          }

          return { ...s, todos: newTodos };
        }
        return s;
      }),
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const activeContainerId = getContainerIdOf(activeId);
    const overContainerId = getContainerIdOf(overId);

    if (!activeContainerId || !overContainerId) return;
    if (activeContainerId !== overContainerId) return;

    const section = sections.find((s) => s.id === activeContainerId)!;
    const fromIdx = section.todos.findIndex((t: Todo) => t.id === activeId);
    const toIdx = section.todos.findIndex((t: Todo) => t.id === overId);

    if (fromIdx !== -1 && toIdx !== -1 && fromIdx !== toIdx) {
      setSections(
        sections.map((s: Section) =>
          s.id === activeContainerId
            ? { ...s, todos: arrayMove(s.todos, fromIdx, toIdx) }
            : s,
        ),
      );
    }
  };

  const totalTasks = sections.reduce(
    (sum, s: Section) => sum + s.todos.length,
    0,
  );
  const doneTasks = sections.reduce(
    (sum, s: Section) => sum + s.todos.filter((t: Todo) => t.completed).length,
    0,
  );
  const activeTodo = getActiveTodo();

  return (
    <div className="@container bg-background flex h-screen min-h-0 min-[1441px]:h-full min-[1441px]:max-h-full flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 border-b px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex size-8 items-center justify-center rounded-lg">
              <CheckSquare2 className="text-primary size-4" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">My Tasks</h1>
              <p className="text-muted-foreground text-xs">
                {doneTasks} of {totalTasks} completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 @sm:flex">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-primary h-full rounded-full transition-all"
                  style={{
                    width:
                      totalTasks > 0
                        ? `${Math.round((doneTasks / totalTasks) * 100)}%`
                        : "0%",
                  }}
                />
              </div>
              <span className="text-muted-foreground w-8 text-right text-xs tabular-nums">
                {totalTasks > 0
                  ? Math.round((doneTasks / totalTasks) * 100)
                  : 0}
                %
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-md border border-border bg-code-background p-1 text-xs text-foreground">
              <Toggle
                pressed={viewMode === "kanban"}
                onPressedChange={() => setViewMode("kanban")}
                size="xs"
                aria-label="Kanban view"
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
          </div>
        </div>
      </header>

      {/* Board */}
      <div className="flex-1 overflow-auto bg-white p-4 dark:bg-transparent lg:p-5">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          modifiers={[restrictToWindowEdges]}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {viewMode === "kanban" ? (
            <div className="grid grid-cols-1 gap-6 @md:grid-cols-2 @lg:grid-cols-3">
              {sections.map((section: Section) => (
                <TodoColumn key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <TodoListView />
          )}

          <DragOverlay>
            {activeTodo ? (
              viewMode === "list" ? (
                <TodoRowContent todo={activeTodo} overlay />
              ) : (
                <TodoCardContent todo={activeTodo} overlay />
              )
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
