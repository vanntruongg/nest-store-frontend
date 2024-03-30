import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";

type CartState = {
  itemsCart: IItem[];
  setItemCart: (items: IItem[]) => void;
  add: (item: IItem) => void;
  remove: (id: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      itemsCart: [],
      setItemCart: (itemsCart: IItem[]) => set({ itemsCart: itemsCart }),
      add: (newItem) =>
        set((state) => {
          const existedProduct = state.itemsCart.find(
            (item) => item.id === newItem.id
          );
          if (!existedProduct) {
            return { itemsCart: [...state.itemsCart, newItem] };
          }
          return { itemsCart: state.itemsCart };
        }),
      remove: (productId: number) =>
        set((state) => ({
          itemsCart: state.itemsCart.filter((item) => item.id !== productId),
        })),
      updateQuantity: (itemId: number, newQuantity: number) =>
        set((state) => ({
          itemsCart: state.itemsCart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
