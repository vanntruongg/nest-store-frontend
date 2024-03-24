"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Breadrumbs from "~/components/breadrumbs";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Product } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { useEffect, useState } from "react";
import CardProduct from "~/components/product/card-product";

const Search = () => {
  // const router = useRouter();
  // const [products, setProducts] = useState<Product[]>([]);
  const searchParam = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const productName = decodeURIComponent(searchParam.get("keyword") as string);

  useEffect(() => {
    fetchProducts();
  }, [productName]);

  const fetchProducts = async () => {
    const result = await productApi.getProductByName(productName);
    setProducts(result.payload.data);
  };
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs options={`Kết quả tìm kiếm cho "${productName}"`} />
      <MaxWidthWrapper className="">
        <div className="grid grid-cols-5 gap-4 bg-white">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Search;
