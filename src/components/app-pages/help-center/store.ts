import { create } from "zustand";
import { helpArticles, helpCategories } from "./data";

export type HelpCategoryFilter = "all" | string;

interface HelpCenterStore {
  searchQuery: string;
  categoryId: HelpCategoryFilter;
  setSearchQuery: (q: string) => void;
  setCategoryId: (id: HelpCategoryFilter) => void;
}

const normalize = (s: string) => s.trim().toLowerCase();

export const useHelpCenterStore = create<HelpCenterStore>((set) => ({
  searchQuery: "",
  categoryId: "all",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategoryId: (categoryId) => set({ categoryId }),
}));

export function filterHelpArticles(
  searchQuery: string,
  categoryId: HelpCategoryFilter,
) {
  const q = normalize(searchQuery);
  const cat = categoryId;

  return helpArticles.filter((article) => {
    const matchesCat = cat === "all" || article.categoryId === cat;
    if (!matchesCat) return false;
    if (!q) return true;
    const catLabel =
      helpCategories.find((c) => c.id === article.categoryId)?.label ?? "";
    const hay = `${article.title} ${article.excerpt} ${catLabel}`;
    return normalize(hay).includes(q);
  });
}
