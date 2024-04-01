import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";

type CheckoutState = {
  items: IItem[];
  addItem: (item: IItem, quantity: number) => void;
  removeItem: (itemId: number) => void;
  addItems: (items: IItem[]) => void;
  clearCheckout: () => void;
  updateQuantityItemCheckOut: (itemId: number, quantity: number) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity) =>
        set((state) => {
          return { items: [...state.items] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      addItems: (items) =>
        set((state) => {
          return { items: items };
        }),
      updateQuantityItemCheckOut: (itemId: number, newQuantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        })),
      clearCheckout: () => set({ items: [] }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
