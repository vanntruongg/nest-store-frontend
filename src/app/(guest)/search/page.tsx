"use client";
import { useSearchParams } from "next/navigation";
import Breadrumbs from "~/components/breadrumbs";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Product } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { useEffect, useState } from "react";
import CardProduct from "~/components/product/card-product";
import Image from "next/image";
import { BaseUtil } from "~/common/utility/base.util";

const Search = () => {
  const searchParam = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const productName = decodeURIComponent(searchParam.get("keyword") as string);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await productApi.getProductByName(productName);
        setProducts(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchProducts();
  }, [productName]);
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs options={`Kết quả tìm kiếm cho "${productName}"`} />
      <MaxWidthWrapper>
        <div className="bg-white p-2 text-lg text-muted-foreground">
          Có <span className="text-primary">{products.length}</span> sản phẩm
          được tìm thấy.
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="">
        {products.length > 0 ? (
          <div className="grid grid-cols-5 gap-4 bg-white">
            {products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="h-80 flex flex-col justify-center items-center gap-8">
            <Image
              src={"/assets/empty-data-search.svg"}
              width={200}
              height={200}
              className="object-cover object-center"
              alt="no data"
            />
            <div className="text-center text-muted-foreground">
              <p>Không có kết quả nào được tìm thấy</p>
              <p>Hãy thử với những từ khóa khác</p>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default Search;
