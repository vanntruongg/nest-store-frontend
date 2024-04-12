"use client";
import { ReactNode, useEffect } from "react";
import cartApi from "~/apis/cart-api";
import { BaseUtil } from "~/common/utility/base.util";
import { useCart } from "~/hooks/useCart";
import { useUser } from "~/hooks/useUser";

interface CartProviderClientProps {
  accessToken: string | undefined;
  children: ReactNode;
}

export default function CartProviderClient({
  accessToken,
  children,
}: CartProviderClientProps) {
  const { setItemCart } = useCart();
  const { user } = useUser();
  const fetchData = async () => {
    try {
      const result = await cartApi.getAll(user.email);

      const data = result.payload.data.items || [];
      setItemCart(data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setItemCart([]);
    } else {
      fetchData();
    }
  }, [accessToken]);
  return <>{children}</>;
}
