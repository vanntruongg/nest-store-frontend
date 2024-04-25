import { cookies } from "next/headers";
import { ReactNode } from "react";
import CartProviderClient from "./cart-provider-client";
export default function CartProvider({ children }: { children: ReactNode }) {
  return <CartProviderClient>{children}</CartProviderClient>;
}
