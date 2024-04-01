import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
import { IItem } from "~/common/model/cart.model";

interface CartItemProps {
  item: IItem;
  onUpdate: (quantity: number, item: IItem) => void;
  onDelete: (id: number) => void;
}

const CartItem = ({ item, onDelete, onUpdate }: CartItemProps) => {
  const { items, addItem, removeItem, updateQuantityItemCheckOut } =
    useCheckout();
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const updateQuantity = async (quantity: number) => {
    if (isNaN(quantity)) {
      quantity = item.quantity;
      setQuantity(item.quantity);
    }
    updateQuantityItemCheckOut(item.id, quantity);
    onUpdate(quantity, item);
  };
  const setIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(newQuantity);
    updateQuantityItemCheckOut(item.id, newQuantity);
  };

  const setDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity);
      updateQuantityItemCheckOut(item.id, newQuantity);
    }
  };

  const handleSelectedItem = (checked: CheckedState) => {
    if (checked) {
      addItem(item, quantity);
    } else {
      removeItem(item.id);
    }
  };

  const deleteItem = async () => {
    onDelete(item.id);
  };

  return (
    <div key={item.id} className="flex items-center py-6 sm:py-10">
      <div className="mt-1 pr-4">
        <Checkbox
          checked={items.some(
            (existingProduct) => existingProduct.id === item.id
          )}
          onCheckedChange={(checked) => handleSelectedItem(checked)}
        />
      </div>
      <div className="grid grid-cols-12 w-full gap-4 ">
        <div className="col-span-6 flex gap-4">
          <div className="relative size-24 ">
            <Image
              src={item.imageUrl ? item.imageUrl : ""}
              fill
              sizes="100"
              alt="product image"
              className="h-full w-full rounded-md object-cover object-center sm:size-48"
            />
          </div>
          <div className="">
            <h3 className="text-base">
              <Link
                href={"/"}
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {item.name}
              </Link>
            </h3>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-center ">
            {ProductUtil.formatPrice(item.price)}
          </div>
          <div className="flex items-center justify-center">
            <div className="flex border border-gray-300">
              <div className="p-2 max-w-20 border-r flex justify-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  onBlur={() => updateQuantity(quantity)}
                  className="w-full font-light text-center"
                />
              </div>
              <div className="flex flex-col divide-y divide-gray-300">
                <button
                  onClick={setIncrease}
                  className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ChevronUp strokeWidth={1.5} className="size-5" />
                </button>
                <button
                  onClick={setDecrease}
                  className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ChevronDown strokeWidth={1.5} className="size-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {ProductUtil.formatPrice(item.price * quantity || 0)}
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant={"link"}
              className="hover:border border-gray-200"
              onClick={deleteItem}
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
