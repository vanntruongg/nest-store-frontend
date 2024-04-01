"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import AddtoWishlistIcon from "../button/add-to-wishlist-icon";
import QuickViewIcon from "../button/quick-view-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { Product } from "~/common/model/product.model";
import { ELayoutProduct } from "~/common/utility/enum.util";

interface CardProductProps {
  product: Product;
  layout?: ELayoutProduct;
}

const CardProduct = ({ product, layout }: CardProductProps) => {
  return (
    <div
      className={cn("group grid transition-all duration-500 hover:shadow", {
        "grid grid-cols-3 gap-4 transition-all duration-500":
          layout === ELayoutProduct.LIST,
        "grid-rows-subgrid row-span-3 gap-0": layout === ELayoutProduct.GRID,
      })}
    >
      <figure className={cn("aspect-square relative", {})}>
        <Link
          href={`${ProductUtil.createSlug(product.name, product.id)}`}
          className="size-full absolute"
        >
          {layout === ELayoutProduct.GRID ? (
            <Image
              fill
              src={product.imageUrl}
              alt="image product"
              sizes="full"
              priority
              className={cn("object-cover bg-gray-50", {})}
            />
          ) : (
            <Image
              src={product.imageUrl}
              alt="image product"
              width={400}
              height={400}
              priority
              className={cn("object-cover bg-gray-50", {})}
            />
          )}
        </Link>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <QuickViewIcon product={product} />
          <AddtoWishlistIcon product={product} />
        </div>
      </figure>

      <div
        className={cn("p-2 w-full", {
          "grid grid-rows-subgrid row-span-2": layout === ELayoutProduct.GRID,
          "col-span-2": layout === ELayoutProduct.LIST,
        })}
      >
        <Link
          href={`${ProductUtil.createSlug(product.name, product.id)}`}
          className={cn(
            "text-base text-pretty font-medium text-gray-700 hover:text-gray-800 pb-2",
            {
              "self-start": layout !== ELayoutProduct.GRID,
            }
          )}
        >
          {product.name}
        </Link>
        <p
          className={cn("mt-2 font-semibold", {
            "text-center": layout === ELayoutProduct.GRID,
          })}
        >
          {ProductUtil.formatPrice(product.price)}
        </p>
        <div
          className={cn("hidden", {
            "block mt-2": layout === ELayoutProduct.LIST,
          })}
        >
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>Chất liệu:</span>
            <p>{product.material}</p>
          </div>
          <div className="mt-1 flex gap-2 text-sm text-muted-foreground">
            <span>Phong cách:</span>
            <p>{product.style}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
