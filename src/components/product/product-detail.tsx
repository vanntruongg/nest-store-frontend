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

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { id, name, category, price, material, style, imageUrl } = product;
  const [quantity, setQuantity] = useState<number>(1);
  const inCreaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const deCreaseQuantity = () => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1));
  };

  return (
    <MaxWidthWrapper>
      <div className="flex gap-8 p-10">
        <div className="w-full grid grid-cols-10 gap-4">
          <div className="col-span-8 aspect-square bg-gray-100 relative">
            {/* <Image /> */}
            <Image
              fill
              src={imageUrl}
              alt="image product"
              className="object-center size-full"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex justify-between">
            <h2 className="text-3xl">{name}</h2>
            <AddtoWishlistIcon product={product} />
          </div>
          <section className="mt-6">
            <p className="text-lg font-bold">
              {ProductUtil.formatPrice(price)}
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              {/* {description} */}
            </div>
            <div className="mt-6 flex items-center">
              <Check
                aria-hidden="true"
                className="size-5 flex-shrink-0 text-green-500"
              />
              <p className="ml-2 text-sm text-muted-foreground">
                Miễn phí vận chuyển
              </p>
            </div>
            <div className="flex items-center gap-8 my-6 py-2">
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
            <div className="flex gap-4">
              <div className="flex-1">
                <AddtoCartButton />
              </div>
              <div className="flex-1">
                <BuyNowButton />
              </div>
            </div>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductDetail;
