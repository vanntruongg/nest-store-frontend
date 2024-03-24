"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";

import EmptyCart from "../../../../public/assets/empty-cart.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Loader2 } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Checkbox } from "~/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useCheckout } from "~/hooks/useCheckout";
import { CartItem as CartItemModel } from "~/common/model/product.model";
import CartItem from "~/components/cart-item";
import { ProductUtil } from "~/common/utility/product.util";

// const products: CartItemModel[] = [
//   {
//     product: {
//       id: uuid(),
//       name: "Áo sơ mi",
//       price: 279000,
//       category: "Áo",
//       description:
//         "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
//       image:
//         "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
//     },
//     quantity: 2,
//   },
//   {
//     product: {
//       id: uuid(),
//       name: "Áo sơ mi",
//       price: 279000,
//       category: "Áo",
//       description:
//         "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
//       image:
//         "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
//     },
//     quantity: 2,
//   },
//   {
//     product: {
//       id: uuid(),
//       name: "Áo sơ mi",
//       price: 279000,
//       category: "Áo",
//       description:
//         "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
//       image:
//         "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
//     },
//     quantity: 2,
//   },
//   {
//     product: {
//       id: uuid(),
//       name: "Áo sơ mi",
//       price: 279000,
//       category: "Áo",
//       description:
//         "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
//       image:
//         "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
//     },
//     quantity: 2,
//   },
// ];
// const products: Product[] = [];
const Page = () => {
  const [cartItems, setCardItems] = useState<CartItemModel[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { items, addItems, clearCheckout } = useCheckout();

  const cartTotal = items.reduce(
    (total, item: CartItemModel) =>
      (total += item.product.price * item.quantity),
    0
  );

  useEffect(() => {
    setIsMounted(true);
    // setCardItems(products);
    clearCheckout();
  }, [clearCheckout]);

  const toggleSelectAll = (checked: CheckedState) => {
    if (checked) {
      // addItems(products);
    } else {
      clearCheckout();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Giỏ hàng
      </h1>
      <div className="mt-6">
        {isMounted && cartItems.length === 0 ? (
          <div
            className={cn(
              "lg:col-span-7 rounded-lg border-2 border-dashed border-zinc-200 p-12 h-full"
            )}
          >
            {/* image empty cart */}
            <div className="h-full flex flex-col items-center justify-center space-y-1">
              <div className="relative mb-4 size-40 text-muted-foreground">
                <Image
                  src={EmptyCart}
                  fill
                  loading="eager"
                  alt="empty shopping cart"
                />
              </div>
              <h3 className="font-semibold text-2xl">Giỏ hàng trống</h3>
              <p className="text-muted-foreground text-center">
                Rất tiếc! Chưa có gì để hiển thị ở đây.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative">
            <div className="px-8 py-2 bg-white shadow flex items-center">
              <div className="mt-1 pr-4">
                <Checkbox
                  onCheckedChange={toggleSelectAll}
                  checked={cartItems.length === items.length}
                />
              </div>
              <div className="flex w-full">
                <div className="flex-1 col-span-3">Sản phẩm</div>
                <div className="flex flex-1 justify-between text-muted-foreground">
                  <div className="col-span-2">Đơn giá</div>
                  <div className="col-span-2">Số lượng</div>
                  <div className="col-span-2">Thành tiền</div>
                  <div className="col-span-2">Thao tác</div>
                </div>
              </div>
            </div>

            <div className="px-8 my-4 bg-white divide-y">
              {isMounted &&
                cartItems.map((item) => {
                  return <CartItem key={item.product.id} item={item} />;
                })}
            </div>
            <section className="sticky bottom-0 flex items-center justify-between rounded-lg bg-white shadow py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-6">
              <div className="flex items-center justify-between gap-4 border-gray-200">
                <div className="text-base font-medium text-gray-900">
                  Tổng thanh toán {`(${items.length} Sản phẩm)`}:
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    ProductUtil.formatPrice(cartTotal + 0)
                  ) : (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="">
                <Link
                  href={"/checkout"}
                  className={cn(
                    buttonVariants({ size: "lg", className: "w-full" }),
                    {
                      "opacity-50 pointer-events-none": items.length === 0,
                    }
                  )}
                >
                  Thanh toán
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
