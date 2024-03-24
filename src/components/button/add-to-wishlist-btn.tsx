"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useWishlist } from "~/hooks/useWishlist";
import { Product } from "~/common/model/product.model";

const AddtoWishlistButton = ({ product }: { product: Product }) => {
  const { addItem } = useWishlist();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size={"lg"}
      className="w-full"
    >
      {isSuccess ? "Đã thêm!" : "Thêm vào giỏ hàng"}
    </Button>
  );
};

export default AddtoWishlistButton;
