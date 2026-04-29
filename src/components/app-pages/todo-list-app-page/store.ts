import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Section, Priority } from "./types";

const now = Date.now();

const INITIAL_SECTIONS: Section[] = [
    {
        id: "todo",
        title: "To Do",
        color: "violet",
        todos: [
            {
                id: "t1",
                text: "Design new landing page mockups",
                completed: false,
                priority: "high",
                createdAt: new Date(now - 36e5 * 3).toISOString()
            },
            {
                id: "t2",
                text: "Write unit tests for auth module",
                completed: false,
                priority: "medium",
                createdAt: new Date(now - 36e5 * 2).toISOString()
            },
            {
                id: "t3",
                text: "Update project dependencies",
                completed: false,
                priority: "low",
                createdAt: new Date(now - 36e5).toISOString()
            }
        ]
    },
    {
        id: "in-progress",
        title: "In Progress",
        color: "amber",
        todos: [
            {
                id: "t4",
                text: "Build dashboard components in Figma",
                completed: false,
                priority: "high",
                createdAt: new Date(now - 36e5 * 5).toISOString()
            },
            {
                id: "t5",
                text: "Integrate payment gateway API",
                completed: false,
                priority: "high",
                createdAt: new Date(now - 36e5 * 4).toISOString()
            },
            {
                id: "t6",
                text: "Review pull requests from team",
                completed: false,
                priority: "medium",
                createdAt: new Date(now - 36e5 * 2).toISOString()
            }
        ]
    },
    {
        id: "done",
        title: "Done",
        color: "emerald",
        todos: [
            {
                id: "t7",
                text: "Set up CI/CD pipeline",
                completed: true,
                priority: "high",
                createdAt: new Date(now - 864e5 * 2).toISOString()
            },
            {
                id: "t8",
                text: "Configure ESLint and Prettier",
                completed: true,
                priority: "low",
                createdAt: new Date(now - 864e5).toISOString()
            }
        ]
    }
];

type TodoStore = {
    sections: Section[];
    viewMode: "kanban" | "list";
    setSections: (sections: Section[]) => void;
    setViewMode: (mode: "kanban" | "list") => void;
    addTodo: (sectionId: string, text: string, priority: Priority) => void;
    deleteTodo: (todoId: string) => void;
    toggleTodo: (todoId: string) => void;
    updateTodoPriority: (todoId: string, priority: Priority) => void;
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            sections: INITIAL_SECTIONS,
            viewMode: "list",

            setSections: (sections) => set({ sections }),
            setViewMode: (viewMode) => set({ viewMode }),

            addTodo: (sectionId, text, priority) =>
                set((state) => ({
                    sections: state.sections.map((s) =>
                        s.id === sectionId
                            ? {
                                ...s,
                                todos: [
                                    ...s.todos,
                                    {
                                        id: crypto.randomUUID(),
                                        text,
                                        completed: false,
                                        priority,
                                        createdAt: new Date().toISOString()
                                    }
                                ]
                            }
                            : s
                    )
                })),

            deleteTodo: (todoId) =>
                set((state) => ({
                    sections: state.sections.map((s) => ({
                        ...s,
                        todos: s.todos.filter((t) => t.id !== todoId)
                    }))
                })),

            toggleTodo: (todoId) =>
                set((state) => ({
                    sections: state.sections.map((s) => ({
                        ...s,
                        todos: s.todos.map((t) =>
                            t.id === todoId ? { ...t, completed: !t.completed } : t
                        )
                    }))
                })),

            updateTodoPriority: (todoId, priority) =>
                set((state) => ({
                    sections: state.sections.map((s) => ({
                        ...s,
                        todos: s.todos.map((t) => (t.id === todoId ? { ...t, priority } : t))
                    }))
                }))
        }),
        { name: "todo-app-storage" }
    )
);
