"use client";
import { useEffect, useState } from "react";
import { useWishlist } from "~/hooks/useWishlist";
import { Heart, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Product } from "~/common/model/product.model";

interface AddtoWishlistIconProps {
  product: Product;
}

const AddtoWishlistIcon = ({ product }: AddtoWishlistIconProps) =>
  // { product }: { product: Product }
  {
    const { addItem } = useWishlist();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 100);

      return () => clearTimeout(timeout);
    }, [loading]);

    const handleAddItem = () => {
      setLoading(true);
      addItem(product);
    };

    return (
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              className="p-2 border border-muted-foreground text-muted-foreground rounded-sm hover:-translate-y-0.5 hover:bg-red-100 hover:border-red-100 hover:text-red-500 transition-all duration-200 self-start"
              onClick={handleAddItem}
            >
              {loading ? (
                <Loader2
                  strokeWidth={1.5}
                  className="size-5 animate-spin text-primary"
                />
              ) : (
                <Heart strokeWidth={1.5} className="size-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
            <p>Thêm vào yêu thích</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

export default AddtoWishlistIcon;
