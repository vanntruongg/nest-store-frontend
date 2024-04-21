import { useEffect, useState } from "react";
import productApi from "~/apis/produc-api";
import { Product } from "~/common/model/product.model";
import MaxWidthWrapper from "../max-width-wrapper";
import CardProduct from "./card-product";
import { ProductUtil } from "~/common/utility/product.util";
import { useRouter } from "next/navigation";

export interface ISimilarProductProps {
  product: Product;
}

export function SimilarProduct({ product }: ISimilarProductProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getProductByCategory(
        product.category.id,
        5
      ); // limit: 5
      setProducts(result.payload.data);
    };
    fetchData();
  }, [product.category.id]);

  const handleRedirect = () => {
    localStorage.setItem("category", product.category.name);
    router.push(
      ProductUtil.createSlugCategory(product.category.name, product.category.id)
    );
  };
  return (
    <MaxWidthWrapper className="bg-white">
      <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Các sản phẩm tương tự
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {`Các sản phẩm tương tự như ${product?.name}`}
            </p>
          </div>

          <div
            onClick={handleRedirect}
            className="hidden text-sm font-medium text-primary hover:text-purple-700 md:block cursor-pointer"
          >
            Xem danh mục {product.category.name}
            <span aria-hidden="true">&rarr;</span>
          </div>
        </div>

        <div className="relative">
          <div className="mt-6 flex items-center w-full">
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-10 lg:gap-x-8">
              {products.map((product, idx) => (
                <CardProduct key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
