"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import { useUser } from "~/hooks/useUser";
import { Product } from "~/common/model/product.model";
import cartApi from "~/apis/cart-api";
import { IAddToCartRequest, IItem } from "~/common/model/cart.model";
import { toast } from "../ui/use-toast";
import { tokenStorage } from "~/common/utility/auth.util";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/useCart";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { ProductUtil } from "~/common/utility/product.util";

interface AddtoCartButtonProps {
  product: Product;
  quantity: number;
}

const AddtoCartButton = ({ product, quantity }: AddtoCartButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddtoCart = async () => {
    setLoading(true);
    if (tokenStorage.value.rawToken.accessToken === "") {
      router.push("/login");
      return;
    }

    try {
      if (!ProductUtil.validateStock(product.stock, quantity)) {
        return;
      }

      const item: IItem = {
        id: product.id,
        price: product.price,
        name: product.name,
        category: product.category.name,
        imageUrl: product.imageUrl,
        quantity,
      };
      const data: IAddToCartRequest = {
        email: user.email,
        itemDto: item,
      };

      await cartApi.add(data);

      addToCart(item);

      toast({
        title: "Thành công",
        description: "Thêm vào giỏ hàng thành công",
        action: (
          <ToastAction altText="Xem giỏ hàng">
            <Link href={"/cart"}>Xem giỏ hàng</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddtoCart}
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
