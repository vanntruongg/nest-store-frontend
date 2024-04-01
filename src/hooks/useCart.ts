import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";

type CartState = {
  itemsCart: IItem[];
  setItemCart: (items: IItem[]) => void;
  add: (item: IItem) => void;
  remove: (id: number) => void;
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
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
