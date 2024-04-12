import { cookies } from "next/headers";
import { ReactNode } from "react";
import CartProviderClient from "./cart-provider-client";
export default function CartProvider({ children }: { children: ReactNode }) {
  const storage = cookies();
  const accessToken = storage.get("accessToken")?.value;
  return (
    <>
      <CartProviderClient accessToken={accessToken}>
        {children}
      </CartProviderClient>
    </>
  );
}
