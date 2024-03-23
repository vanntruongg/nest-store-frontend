import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "~/common/model/product.model";
import { ProductUtil } from "~/common/utility/product.util";
import { useWishlist } from "~/hooks/useWishlist";

const CartItem = ({
  product,
  setOpenWishList,
}: {
  product: Product;
  setOpenWishList: (state: boolean) => void;
}) => {
  const router = useRouter();

  const { removeItem } = useWishlist();

  const handleOpenItem = () => {
    setOpenWishList(false);
    router.push(`/${ProductUtil.createSlug(product.name, product.id)}`);
  };

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* image */}
          <div
            onClick={handleOpenItem}
            className="relative aspect-square h-16 min-w-fit overflow-hidden rounded cursor-pointer"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="absolute object-cover"
            />
          </div>

          {/* infor details */}
          <div className="flex flex-col self-start">
            <div
              onClick={handleOpenItem}
              className="line-clamp-1 text-sm font-medium mb-1 cursor-pointer"
            >
              {product.name}
            </div>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.category.name}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {ProductUtil.formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
