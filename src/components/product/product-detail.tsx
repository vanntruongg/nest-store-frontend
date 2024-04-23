"use client";
import { useState } from "react";
import MaxWidthWrapper from "../max-width-wrapper";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import AddtoCartButton from "../button/add-to-cart-btn";
import BuyNowButton from "../button/buy-now-btn";
import Image from "next/image";
import AddtoWishlistIcon from "../button/add-to-wishlist-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { Product } from "~/common/model/product.model";
import { Skeleton } from "../ui/skeleton";

interface ProductDetailProps {
  product?: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const inCreaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const deCreaseQuantity = () => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1));
  };

  return (
    <MaxWidthWrapper>
      {product ? (
        <div className="bg-white flex gap-8 p-10 rounded-sm">
          <div className="w-full grid grid-cols-10 gap-2">
            <div className="col-span-8 aspect-square bg-gray-100 relative">
              <Image
                fill
                src={product ? product.imageUrl : "/assets/product-default.jpg"}
                alt="image product"
                className="object-center size-full"
                sizes="100"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex justify-between gap-6">
              <h1 className="text-3xl">{product?.name}</h1>
              <AddtoWishlistIcon product={product} />
            </div>
            <section className="mt-6 space-y-6">
              <p className="text-lg font-bold bg-gray-50 p-2">
                {ProductUtil.formatPrice(product ? product.price : 0)}
              </p>
              <div className="flex items-center">
                <Check
                  aria-hidden="true"
                  className="size-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Miễn phí vận chuyển
                </p>
              </div>
              <div className="flex items-center gap-8 py-2">
                <span>Quantity</span>
                <div className="flex border border-gray-300">
                  <div className="p-2 max-w-20 border-r flex justify-center">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full font-light text-center"
                    />
                  </div>
                  <div className="flex flex-col divide-y divide-gray-300">
                    <button
                      onClick={inCreaseQuantity}
                      className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <ChevronUp strokeWidth={1.5} className="size-5" />
                    </button>
                    <button
                      onClick={deCreaseQuantity}
                      className="p-1 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <ChevronDown strokeWidth={1.5} className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-sm">Còn lại: {product?.stock} sản phẩm</div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <AddtoCartButton product={product} quantity={quantity} />
                </div>
                <div className="flex-1">
                  <BuyNowButton product={product} quantity={quantity} />
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <Placeholder />
      )}
    </MaxWidthWrapper>
  );
};

export default ProductDetail;

const Placeholder = () => {
  return (
    <div className="bg-white flex gap-8 p-10 rounded-sm">
      <div className="w-full grid grid-cols-10 gap-2">
        <Skeleton className="col-span-8 aspect-square bg-gray-200 relative" />
      </div>
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col justify-between gap-2">
          <Skeleton className="bg-gray-200 w-full h-6" />
          <Skeleton className="bg-gray-200 w-2/3 h-6" />
          <Skeleton className="bg-gray-200 w-1/3 h-6" />
        </div>
        <section className="mt-6 space-y-6">
          <Skeleton className="bg-gray-200 w-2/3 h-6" />

          <div className="flex items-center">
            <Skeleton className="bg-gray-200 w-2/3 h-6" />
          </div>
          <div className="flex items-center gap-8 py-2">
            <Skeleton className="bg-gray-200 w-2/3 h-10" />
          </div>
          <Skeleton className="bg-gray-200 w-1/3 h-6" />

          <div className="flex gap-4">
            <Skeleton className="bg-gray-200 w-full h-12" />
            <Skeleton className="bg-gray-200 w-full h-12" />
          </div>
        </section>
      </div>
    </div>
  );
};
