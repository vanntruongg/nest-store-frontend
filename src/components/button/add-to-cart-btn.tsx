"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import { useUser } from "~/hooks/useUser";
import { Product } from "~/common/model/product.model";
import cartApi from "~/apis/cart-api";
import { IAddRequest } from "~/common/model/cart.model";

interface AddtoCartButtonProps {
  product: Product;
  quantity: number;
}

const AddtoCartButton = ({ product, quantity }: AddtoCartButtonProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const handlAddtoCart = async () => {
    setLoading(true);
    try {
      const data: IAddRequest = {
        email: user.email,
        itemDto: {
          id: product.id,
          quantity,
          price: product.price,
          name: product.name,
          category: product.category.name,
          imageUrl: product.imageUrl,
        },
      };

      await cartApi.add(data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlAddtoCart}
      size={"sm"}
      className="w-full border border-primary bg-purple-200 text-primary text-xs uppercase hover:bg-purple-100 hover:shadow-sm rounded-none transition-all duration-300"
    >
      {loading ? (
        <Loader2 strokeWidth={1.5} className="animate-spin" />
      ) : (
        <div className="flex items-center gap-1 font-semibold">
          <ShoppingCart strokeWidth={1.5} className="size-5" />
          Thêm vào giỏ hàng
        </div>
      )}
    </Button>
  );
};

export default AddtoCartButton;
