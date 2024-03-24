"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

const AddtoCartButton = () =>
  // { product }: { product: Product }
  {
    // const { addItem } = useWishlist();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     setIsSuccess(false);
    //   }, 2000);

    //   return () => clearTimeout(timeout);
    // }, [isSuccess]);

    return (
      <Button
        onClick={() => {
          // addItem(product);
          // setIsSuccess(true);
        }}
        size={"sm"}
        className="w-full border border-primary bg-purple-200 text-primary text-xs uppercase hover:bg-purple-100 hover:shadow-sm rounded-none transition-all duration-300"
      >
        {isSuccess ? (
          "Đã thêm!"
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
