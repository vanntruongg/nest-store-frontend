"use client";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";
import Category from "~/components/category";
import { cn } from "~/lib/utils";
import ListCategory from "~/app/(guest)/shop/list-category";
import productApi from "~/apis/produc-api";
import { ChevronRight } from "lucide-react";
import { ICategory } from "~/common/model/product.model";
import { useEffect, useState } from "react";

const BREADRUMBS = [
  {
    id: 1,
    name: "Sản phẩm",
    href: "/shop",
  },
];

export default async function ShopPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await productApi.getCategory();
      const data: ICategory[] = result.payload.data;

      const sortedCategories = data.sort(
        (category1, category2) => category1.category.id - category2.category.id
      );
      setCategories(sortedCategories);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <MaxWidthWrapper className="">
        <Category />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className={cn("grid grid-cols-5 gap-6")}>
          <div className={cn("bg-white col-span-1")}>
            <div className="p-6 flex justify-center border-b w-full relative">
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 p-1 bg-white text-muted-foreground rounded-full shadow cursor-pointer">
                <ChevronRight size={24} />
              </div>
              <p className="uppercase text-muted-foreground">Danh mục</p>
            </div>
            <ListCategory categories={categories} fontSize={17} />
          </div>
          <div className="bg-white col-span-4">
            <ProductListing />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
