"use client";
import { useEffect, useState } from "react";
import productApi from "~/apis/produc-api";
import { Category, Product } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { ProductUtil } from "~/common/utility/product.util";
import Breadrumbs from "~/components/breadrumbs";
import DevelopingTooltip from "~/components/developing-tooltip";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import ProductDetail from "~/components/product/product-detail";
import ProductReel from "~/components/product/product-reel";

interface PageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = ({ params }: PageProps) => {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productApi.getProductById(
          ProductUtil.extractProductIdFromSlug(params.slug)
        );
        setProduct(result.payload.data.product || {});
        setCategories(result.payload.data.categories);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, []);

  const breadcrumbs: Breadrumb[] = [];
  categories.map((category) => {
    breadcrumbs.unshift({
      id: category.id,
      name: category.name,
      href: ProductUtil.createSlugCategory(category.name, category.id),
    });
  });

  return (
    <div className="bg-gray-100 flex flex-col gap-4">
      <Breadrumbs
        breadrumbs={breadcrumbs}
        options={product?.name}
        optionPage={true}
      />
      <ProductDetail product={product} />

      <MaxWidthWrapper className="">
        <div className="bg-white p-4 rounded-sm">
          <div className="bg-gray-100">
            <h2 className="text-xl p-2">Chi tiết sản phẩm</h2>
          </div>
          <div className="py-8 flex flex-col gap-2 text-sm">
            <div className="flex gap-2 items-center">
              <span className="text-muted-foreground">Danh mục:</span>
              <Breadrumbs breadrumbs={breadcrumbs} className="h-4" />
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Chất liệu:</span>
              <p>{product?.material}</p>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Phong cách:</span>
              <p>{product?.style}</p>
            </div>
          </div>
          <div className="bg-gray-100">
            <DevelopingTooltip>
              <h2 className="text-xl p-2">Đánh giá sản phẩm</h2>
            </DevelopingTooltip>
          </div>
          <div className=""></div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <ProductReel
          href="/products"
          title={`Sản phẩm tương tự`}
          subtitle={`Các sản phẩm thuộc ${product?.category.name} tương tự như '${product?.name}'`}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductDetailPage;
