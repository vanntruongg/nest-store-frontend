import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface SearchItem {
  id: string;
  searchValue: string;
}

type HistorySearchState = {
  items: SearchItem[];
  addItem: (searchItem: SearchItem) => void;
  removeItem: (id: string) => void;
  clearHistorySearch: () => void;
};

export const useHistorySearch = create<HistorySearchState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (searchItem) =>
        set((state) => {
          let newItems = state.items;

          // nếu đã có thì không thêm vào
          if (
            !state.items.some(
              (item) => item.searchValue === searchItem.searchValue
            ) &&
            searchItem.searchValue !== ""
          ) {
            // chỉ cho tối đa 10 ls tìm kiếm
            if (state.items.length >= 10) {
              newItems = [searchItem, ...state.items.slice(0, 1)];
            } else {
              newItems = [searchItem, ...state.items];
            }
          }

          return { items: newItems };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearHistorySearch: () => set({ items: [] }),
    }),
    {
      name: "search-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
