"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tokenStorage } from "~/common/utility/auth.util";
import { useCart } from "~/hooks/useCart";

const Cart = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { itemsCart } = useCart();

  useEffect(() => {
    setIsMounted(true);

    // if (tokenStorage.value.rawToken.accessToken) {
    //   itemsCart.length = 0;
    // }
  }, [isMounted]);

  return (
    <Link
      href={"/cart"}
      className="hover:bg-gray-100 p-2 rounded-full relative"
    >
      <ShoppingCart strokeWidth={1.5} className="size-5 text-slate-700" />
      <span className="absolute top-0 right-0 size-4 flex justify-center items-center text-xs bg-primary text-white rounded-full">
        {isMounted ? itemsCart.length : 0}
      </span>
    </Link>
  );
};

export default Cart;
