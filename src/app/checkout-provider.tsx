"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useCheckout } from "~/hooks/useCheckout";

export default function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { clearCheckout } = useCheckout();

  useEffect(() => {
    if (pathname !== "/checkout" && pathname !== "/cart") {
      clearCheckout();
    }
  }, [pathname, clearCheckout]);

  return <>{children}</>;
}
