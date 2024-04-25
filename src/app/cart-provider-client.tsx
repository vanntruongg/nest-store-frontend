"use client";
import { ReactNode, useEffect } from "react";
import cartApi from "~/apis/cart-api";
import { tokenStorage } from "~/common/utility/auth.util";
import { BaseUtil } from "~/common/utility/base.util";
import { useCart } from "~/hooks/useCart";
import { useUser } from "~/hooks/useUser";

interface CartProviderClientProps {
  children: ReactNode;
}

export default function CartProviderClient({
  children,
}: CartProviderClientProps) {
  const { setItemToCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cartApi.getAll(user.email);

        const data = result.payload.data.items || [];
        setItemToCart(data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    if (!tokenStorage.value.rawToken.accessToken) {
      setItemToCart([]);
    } else {
      fetchData();
    }
  }, [tokenStorage.value.rawToken.accessToken, setItemToCart, user.email]);
  return <>{children}</>;
}
