import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Fullscreen } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ProductDetail from "../product/product-detail";
import { Product } from "~/common/model/product.model";

const QuickViewIcon = ({ product }: { product: Product }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="hidden lg:block p-2.5 border border-muted-foreground backdrop-blur-3xl text-black rounded-sm hover:text-white hover:-translate-y-0.5 hover:bg-primary transition-all duration-200">
                <Fullscreen strokeWidth={1.5} className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="backdrop-blur-3xl text-white bg-gray-500 bg-opacity-50 rounded-full px-2 py-1">
              <p>Xem nhanh</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-6xl p-0"
      >
        <ProductDetail product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewIcon;
