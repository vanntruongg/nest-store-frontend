import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";

type CheckoutState = {
  items: IItem[];
  addItem: (item: IItem) => void;
  removeItem: (itemId: number) => void;
  addItems: (items: IItem[]) => void;
  clearCheckout: () => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          return { items: [...state.items, item] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      addItems: (items) =>
        set((state) => {
          return { items: items };
        }),
      clearCheckout: () => set({ items: [] }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
