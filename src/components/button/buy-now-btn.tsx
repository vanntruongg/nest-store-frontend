"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Product } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { tokenStorage } from "~/common/utility/auth.util";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { IAddToCartRequest, IItem } from "~/common/model/cart.model";
import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { useCart } from "~/hooks/useCart";
import IconTextLoading from "../icon-text-loading";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
interface AddtoCartButtonProps {
  product: Product;
  quantity: number;
}

const BuyNowButton = ({ product, quantity }: AddtoCartButtonProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { addToCart } = useCart();
  const { addItem } = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleAddtoCartAndCheckout = async () => {
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
      addItem(item, quantity);
      addToCart(item);
      router.push("/checkout");
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleAddtoCartAndCheckout}
      size={"sm"}
      className="w-full border bg-primary text-white text-xs uppercase rounded-none transition-all duration-300"
    >
      {loading ? (
        <IconTextLoading />
      ) : (
        <div className="flex items-center gap-1">Mua ngay</div>
      )}
    </Button>
  );
};

export default BuyNowButton;
