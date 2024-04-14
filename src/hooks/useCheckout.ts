import { cookies } from "next/headers";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IItem } from "~/common/model/cart.model";
import { IOrderShippingDetail } from "~/common/model/order.model";

type CheckoutState = {
  items: IItem[];
  shippingDetail: IOrderShippingDetail;
  notes: string;
  paymentMethod: number;
  addItem: (item: IItem, quantity: number) => void;
  removeItem: (itemId: number) => void;
  addItems: (items: IItem[]) => void;
  setShippingDetail: (name: string, phone: string, address: string) => void;
  setPaymentMethod: (methodId: number) => void;
  setNotes: (notes: string) => void;
  clearCheckout: () => void;
  updateQuantityItemCheckOut: (itemId: number, quantity: number) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      shippingDetail: { name: "", phone: "", address: "" },
      paymentMethod: 0,
      notes: "",
      addItem: (item, quantity) =>
        set((state) => {
          item.quantity = quantity;
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
      updateQuantityItemCheckOut: (itemId: number, newQuantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        })),
      setShippingDetail: (name, phone, address) =>
        set((state) => {
          return { shippingDetail: { name, phone, address } };
        }),
      setPaymentMethod: (methodId) =>
        set((state) => {
          return { paymentMethod: methodId };
        }),
      setNotes: (notes) =>
        set((state) => {
          return { notes: notes };
        }),
      clearCheckout: () =>
        set({
          items: [],
          shippingDetail: { name: "", phone: "", address: "" },
          paymentMethod: 0,
        }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
