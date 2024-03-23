"use client";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ShoppingCart } from "lucide-react";

const AddtoCartIcon = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loading]);
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            onClick={() => setLoading(true)}
            className="p-2.5 bg-black text-white rounded-full hover:-translate-y-0.5 hover:bg-primary transition-all duration-200"
          >
            {loading ? (
              <div className="bg-transparent size-4 border-primary border-x-2 rounded-lg animate-spin"></div>
            ) : (
              <ShoppingCart strokeWidth={1.5} className="size-4" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
          <p>Thêm vào giỏ hàng</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddtoCartIcon;
