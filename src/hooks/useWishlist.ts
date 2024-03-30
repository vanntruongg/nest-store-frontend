import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "~/common/model/product.model";

export type WishlistItem = {
  product: Product;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existedProduct = state.items.find(
            (item) => item.product.id === product.id
          );
          if (!existedProduct) {
            return { items: [...state.items, { product }] };
          }
          return { items: state.items };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
