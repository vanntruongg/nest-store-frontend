import React, { ChangeEvent, useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useCheckout } from "~/hooks/useCheckout";
import { CartItem } from "~/common/model/product.model";
import { ProductUtil } from "~/common/utility/product.util";

interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const { items, addItem, removeItem } = useCheckout();

  const inCreaseQuantity = (item: CartItem) => {
    setQuantity(++item.quantity);
  };

  const deCreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      setQuantity(--item.quantity);
    }
  };

  const handleUpdateQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    item: CartItem
  ) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      item.quantity = newQuantity;
    }
  };

  const handleSelectedItem = (checked: CheckedState) => {
    if (checked) {
      addItem(item.product, quantity);
    } else {
      removeItem(item.product.id);
    }
  };

  return (
    <div key={item.product.id} className="flex items-center py-6 sm:py-10">
      <div className="mt-1 pr-4">
        <Checkbox
          checked={items.some(
            (existingProduct) => existingProduct.product.id === item.product.id
          )}
          onCheckedChange={(checked) => handleSelectedItem(checked)}
        />
      </div>
      <div className="flex w-full">
        <div className="flex flex-1 gap-4">
          <div className="relative size-24">
            <Image
              src={item.product.imageUrl}
              fill
              alt="product image"
              className="h-full w-full rounded-md object-cover object-center sm:size-48"
            />
          </div>
          <div className="">
            <h3 className="text-base">
              <Link
                href={`product/${item.product.id}`}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {item.product.name}
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="">{ProductUtil.formatPrice(item.product.price)}</div>
          <div className="flex border border-gray-300">
            <div className="p-2 max-w-20 border-r flex justify-center">
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleUpdateQuantity(e, item)}
                className="w-full font-light text-center"
              />
            </div>
            <div className="flex flex-col divide-y divide-gray-300">
              <button
                onClick={() => inCreaseQuantity(item)}
                className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                <ChevronUp strokeWidth={1.5} className="size-5" />
              </button>
              <button
                onClick={() => deCreaseQuantity(item)}
                className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                <ChevronDown strokeWidth={1.5} className="size-5" />
              </button>
            </div>
          </div>
          <div className="">
            {ProductUtil.formatPrice(item.product.price * item.quantity)}
          </div>
          <Button variant={"link"} className="">
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
