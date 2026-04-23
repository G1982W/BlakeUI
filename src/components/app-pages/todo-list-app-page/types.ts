export type Priority = "high" | "medium" | "low";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    priority: Priority;
    createdAt: string;
}

export interface Section {
    id: string;
    title: string;
    color: "violet" | "amber" | "emerald";
    todos: Todo[];
}
