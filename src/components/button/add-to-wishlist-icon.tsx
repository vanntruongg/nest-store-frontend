"use client";
import { useEffect, useState } from "react";
import { useWishlist } from "~/hooks/useWishlist";
import { Heart, HeartOff, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Product } from "~/common/model/product.model";
import { cn } from "~/lib/utils";

interface AddtoWishlistIconProps {
  product: Product;
}

const AddtoWishlistIcon = ({ product }: AddtoWishlistIconProps) => {
  const { items, addItem, removeItem } = useWishlist();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [loading]);

  const existedProduct = items.find((item) => item.product.id === product.id);
  const handleAddOrRemoveItem = () => {
    setLoading(true);
    if (existedProduct) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "p-2 rounded-sm transition-all duration-200 self-start",
              {
                "bg-red-100 text-red-500 border border-transparent hover:bg-gray-100 hover:bg-opacity-50 hover:border hover:border-muted-foreground hover:text-black":
                  existedProduct,
                "hover:bg-red-100 bg-gray-100 bg-opacity-50 border border-muted-foreground hover:border-red-100 hover:text-red-500":
                  !existedProduct,
              }
            )}
            onClick={handleAddOrRemoveItem}
          >
            {loading ? (
              <Loader2
                strokeWidth={1.5}
                className="size-5 animate-spin text-primary"
              />
            ) : existedProduct ? (
              <HeartOff strokeWidth={1} className="size-5" />
            ) : (
              <Heart strokeWidth={1} className="size-5 " />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
          <p>{existedProduct ? "Bỏ yêu thích" : "Thêm vào yêu thích"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddtoWishlistIcon;
