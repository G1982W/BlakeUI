import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NoteColor =
  | "default"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "purple"
  | "pink";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export const NOTE_COLORS: Record<
  NoteColor,
  { bg: string; border: string; dot: string; label: string }
> = {
  default: {
    bg: "bg-card",
    border: "border-border",
    dot: "bg-muted-foreground/30",
    label: "Default"
  },
  red: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    dot: "bg-red-400",
    label: "Red"
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
    dot: "bg-orange-400",
    label: "Orange"
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    border: "border-yellow-200 dark:border-yellow-800",
    dot: "bg-yellow-400",
    label: "Yellow"
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800",
    dot: "bg-green-400",
    label: "Green"
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-950/40",
    border: "border-teal-200 dark:border-teal-800",
    dot: "bg-teal-400",
    label: "Teal"
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    dot: "bg-blue-400",
    label: "Blue"
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    border: "border-purple-200 dark:border-purple-800",
    dot: "bg-purple-400",
    label: "Purple"
  },
  pink: {
    bg: "bg-pink-50 dark:bg-pink-950/40",
    border: "border-pink-200 dark:border-pink-800",
    dot: "bg-pink-400",
    label: "Pink"
  }
};

export const CATEGORIES = ["Personal", "Work", "Ideas", "Study", "Shopping", "Other"];

const now = Date.now();

const SAMPLE_NOTES: Note[] = [
  {
    id: "1",
    title: "Welcome to Notes",
    content:
      "Start capturing your thoughts, ideas, and tasks. Use categories and colors to stay organized.",
    category: "Personal",
    color: "blue",
    pinned: true,
    createdAt: new Date(now - 864e5 * 3).toISOString(),
    updatedAt: new Date(now - 864e5 * 3).toISOString(),
    order: 0
  },
  {
    id: "2",
    title: "Project Kickoff",
    content:
      "Review the project scope, assign roles, set milestones for Q3. Send calendar invites to all stakeholders before Friday.",
    category: "Work",
    color: "purple",
    pinned: false,
    createdAt: new Date(now - 864e5 * 2).toISOString(),
    updatedAt: new Date(now - 864e5 * 2).toISOString(),
    order: 1
  },
  {
    id: "3",
    title: "App Ideas",
    content:
      "1. Recipe tracker with ingredient lists\n2. Habit tracker with streaks\n3. Budget planner with categories\n4. Travel journal",
    category: "Ideas",
    color: "yellow",
    pinned: false,
    createdAt: new Date(now - 864e5).toISOString(),
    updatedAt: new Date(now - 864e5).toISOString(),
    order: 2
  },
  {
    id: "4",
    title: "Grocery List",
    content: "• Milk\n• Bread\n• Eggs\n• Butter\n• Coffee beans\n• Olive oil\n• Pasta",
    category: "Shopping",
    color: "green",
    pinned: false,
    createdAt: new Date(now - 36e5 * 5).toISOString(),
    updatedAt: new Date(now - 36e5 * 5).toISOString(),
    order: 3
  },
  {
    id: "5",
    title: "TypeScript Tips",
    content:
      "Use 'satisfies' for type checking without widening. Discriminated unions make exhaustive checks easier. Template literal types for string manipulation.",
    category: "Study",
    color: "teal",
    pinned: false,
    createdAt: new Date(now - 36e5 * 2).toISOString(),
    updatedAt: new Date(now - 36e5 * 2).toISOString(),
    order: 4
  },
  {
    id: "6",
    title: "Books to Read",
    content:
      "— Atomic Habits · James Clear\n— Deep Work · Cal Newport\n— The Pragmatic Programmer\n— Clean Code · Robert Martin",
    category: "Personal",
    color: "orange",
    pinned: false,
    createdAt: new Date(now - 36e5).toISOString(),
    updatedAt: new Date(now - 36e5).toISOString(),
    order: 5
  },
  {
    id: "7",
    title: "Weekly Goals",
    content:
      "✓ Finish the dashboard redesign\n✓ Review pull requests\n○ Write unit tests\n○ Update documentation\n○ Deploy to staging",
    category: "Work",
    color: "red",
    pinned: false,
    createdAt: new Date(now - 18e5).toISOString(),
    updatedAt: new Date(now - 18e5).toISOString(),
    order: 6
  },
  {
    id: "8",
    title: "Morning Routine",
    content:
      "6:00 Wake up · 6:15 Meditate · 6:30 Exercise · 7:15 Shower · 7:30 Breakfast · 8:00 Start work",
    category: "Personal",
    color: "pink",
    pinned: false,
    createdAt: new Date(now - 9e5).toISOString(),
    updatedAt: new Date(now - 9e5).toISOString(),
    order: 7
  }
];

type NoteStore = {
  notes: Note[];
  viewMode: "grid" | "list";
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt" | "order" | "pinned">) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, "id" | "createdAt">>) => void;
  deleteNote: (id: string) => void;
  reorderNotes: (fromId: string, toId: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  togglePin: (id: string) => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: SAMPLE_NOTES,
      viewMode: "grid",

      addNote: (note) =>
        set((state) => ({
          notes: [
            {
              ...note,
              id: crypto.randomUUID(),
              pinned: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              order: 0
            },
            ...state.notes.map((n) => ({ ...n, order: n.order + 1 }))
          ]
        })),

      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          )
        })),

      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),

      reorderNotes: (fromId, toId) =>
        set((state) => {
          const arr = [...state.notes];
          const from = arr.findIndex((n) => n.id === fromId);
          const to = arr.findIndex((n) => n.id === toId);
          if (from === -1 || to === -1) return state;
          const [item] = arr.splice(from, 1);
          arr.splice(to, 0, item);
          return { notes: arr.map((n, i) => ({ ...n, order: i })) };
        }),

      setViewMode: (viewMode) => set({ viewMode }),

      togglePin: (id) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
        }))
    }),
    { name: "note-app-storage" }
  )
);

type UIStore = {
  search: string;
  activeCategory: string | null;
  activeColor: NoteColor | null;
  sidebarOpen: boolean;
  setSearch: (search: string) => void;
  setActiveCategory: (category: string | null) => void;
  setActiveColor: (color: NoteColor | null) => void;
  setSidebarOpen: (open: boolean) => void;
  clearFilters: () => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  search: "",
  activeCategory: null,
  activeColor: null,
  sidebarOpen: false,
  setSearch: (search) => set({ search }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setActiveColor: (activeColor) => set({ activeColor }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  clearFilters: () => set({ search: "", activeCategory: null, activeColor: null })
}));
