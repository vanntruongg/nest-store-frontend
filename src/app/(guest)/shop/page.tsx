import MaxWidthWrapper from "~/components/max-width-wrapper";
import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";
import Category from "~/components/category";
import { cn } from "~/lib/utils";
import ListCategory from "~/app/(guest)/shop/list-category";
import productApi from "~/apis/produc-api";
import { ChevronRight } from "lucide-react";
import { ICategory } from "~/common/model/product.model";

const BREADRUMBS = [
  {
    id: 1,
    name: "Sản phẩm",
    href: "/shop",
  },
];

// const getDataAndSort = async () => {
//   const result = await productApi.getCategory();

//   const data: ICategory[] = result.payload.data;
//   // console.log(data);

//   const categories: ICategory[] = [];
//   data.map(({ category, subCategories }) =>
//     categories.unshift({ category, subCategories })
//   );

//   return categories.sort(
//     (category1, category2) => category1.category.id - category2.category.id
//   );
// };

export default async function ShopPage() {
  // const categories = await getDataAndSort();
  const result = await productApi.getCategory();

  // const data: ICategory[] = result.payload.data;
  // // console.log(data);

  // const categories: ICategory[] = [];
  // data.map(({ category, subCategories }) =>
  //   categories.unshift({ category, subCategories })
  // );

  // categories.sort(
  //   (category1, category2) => category1.category.id - category2.category.id
  // );

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
            {/* <ListCategory categories={categories} fontSize={17} /> */}
          </div>
          <div className="bg-white col-span-4">
            <ProductListing />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
