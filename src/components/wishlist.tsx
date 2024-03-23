"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Heart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import EmptyCart from "../../public/assets/empty-cart.svg";
import { routes } from "~/static";
import { useWishlist } from "~/hooks/useWishlist";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./wishlist-item";

const Wishlist = () => {
  const { items } = useWishlist();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger className="hover:bg-gray-100 p-2 rounded-full">
        <Heart
          strokeWidth={1.5}
          className="size-5 text-slate-700"
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent
        // side={"left"}
        className="flex flex-col w-full pr-0 sm:max-w-lg"
      >
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Sản phẩm yêu thích ({items.length})</SheetTitle>
        </SheetHeader>
        {items.length > 0 ? (
          <ScrollArea className="flex w-full flex-col pr-6">
            {items.map(({ product }) => (
              <CartItem
                key={product.id}
                product={product}
                setOpenWishList={setOpen}
              />
            ))}
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-1 h-full ">
            <div
              aria-hidden="true"
              className="relative mb-4 w-60 text-muted-foreground"
            >
              <Image
                src={EmptyCart}
                alt="empty shopping cart"
                width={200}
                height={200}
                className="pointer-events-none select-none"
              />
            </div>
            <div className="text-18 font-semibold">
              Chưa có sản phẩm yêu thích
            </div>
            <SheetClose asChild>
              <Link
                href={routes.SHOP}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-14 text-muted-foreground",
                })}
              >
                Xem sản phẩm
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist;
