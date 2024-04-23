import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";

type CartState = {
  itemsCart: IItem[];
  setItemToCart: (items: IItem[]) => void;
  addToCart: (item: IItem) => void;
  removeFromCart: (id: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      itemsCart: [],
      setItemToCart: (itemsCart: IItem[]) => set({ itemsCart: itemsCart }),
      addToCart: (newItem) =>
        set((state) => {
          const existedProduct = state.itemsCart.find(
            (item) => item.id === newItem.id
          );
          if (!existedProduct) {
            return { itemsCart: [...state.itemsCart, newItem] };
          }
          return { itemsCart: state.itemsCart };
        }),
      removeFromCart: (productId: number) =>
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
