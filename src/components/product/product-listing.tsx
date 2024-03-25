"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { cn } from "~/lib/utils";
import { LayoutGrid, LayoutList } from "lucide-react";

import MaxWidthWrapper from "../max-width-wrapper";
import CardProduct from "./card-product";
import ListCategory from "./list-category";
import { ICategory, Product } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { BaseUtil } from "~/common/utility/base.util";
import ProductsPlaceHolder from "../skeleton/ProductListSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TooltipCustom from "../tooltip-custom";
import { ELayoutProduct } from "~/common/utility/enum.util";

interface ProductListingProps {
  categoryId?: string;
}

const ProductListing = ({ categoryId }: ProductListingProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [layout, setLayout] = useState<LayoutProduct>("grid");
  const [products, setProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get("pageNumber")) || 0
  );
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const order = searchParams.get("order") || "";
    const page = Number(searchParams.get("pageNumber"));
    const category = Number(searchParams.get("category"));
    setSort(order);
    setPageNumber(pageNumber);
    fetchCategory();
    fetchProduct(category, order, page);
  }, [searchParams, sort, pageNumber]);

  const fetchCategory = async () => {
    if (categoryId) {
      const result = await productApi.getAllSubCategory(categoryId);
      setCategories(result.payload.data);
    }
  };

  const fetchProduct = async (
    categoryId: number = 0,
    order: string = "",
    page: number = 0
  ) => {
    try {
      const result = await productApi.getList(categoryId, order, page);
      setProduct(result.payload.data.content);
      setTotalPages(result.payload.data.totalPages);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  const handleChangePage = (page: number) => {
    setPageNumber(page);
    router.push(
      pathname + "?" + createQueryString("pageNumber", page.toString())
    );
  };

  const handleSortChange = (value: string) => {
    // console.log(value);
    setSort(value);
    setPageNumber(0);
    const params = new URLSearchParams(searchParams.toString());
    params.set("order", value);
    params.set("sortBy", "price");
    router.push(pathname + "?" + params.toString());
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <MaxWidthWrapper className="">
      <div className="flex flex-col mb-6 bg-white">
        <div className="col-span-3 grid grid-rows-subgrid row-span-3">
          <div className="p-4 flex border-b">
            <div className="w-full flex gap-2">
              <TooltipCustom
                trigger={<LayoutGrid strokeWidth={1.5} className="size-5" />}
                content={ELayoutProduct.GRID}
                customClick={setLayout}
                options={{ layout }}
                className={cn("text-gray-400 hover:text-primary", {
                  "text-primary": layout === "grid",
                })}
              />
              <TooltipCustom
                trigger={<LayoutList strokeWidth={1.5} className="size-5" />}
                content={ELayoutProduct.LIST}
                customClick={setLayout}
                options={{ layout }}
                className={cn("text-gray-400 hover:text-primary", {
                  "text-primary": layout === "list",
                })}
              />
            </div>
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="asc">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="desc">Giá: Cao đến Thấp</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className={cn("grid grid-cols-5 gap-8")}>
            {categoryId && (
              <div
                className={cn("w-full px-2", {
                  "flex flex-col": layout === "list",
                  "w-full flex flex-col gap-8": layout === "grid",
                })}
              >
                <div className="flex flex-col gap-4 mt-6">
                  <ListCategory
                    categories={categories}
                    fontSize={17}
                    fetchData={fetchProduct}
                  />
                </div>
              </div>
            )}
            <div
              className={cn("mt-6 col-span-5 ", {
                "col-span-4": categoryId,
              })}
            >
              {products.length > 0 ? (
                <div
                  className={cn("", {
                    "grid grid-cols-1 lg:grid-cols-5 gap-4 gap-y-8":
                      layout === "grid",
                    "grid lg:grid-cols-4": layout === "grid" && categoryId,
                    "grid grid-cols-2 gap-16": layout === "list",
                    "grid-cols-1": categoryId,
                  })}
                >
                  {products.map((product) => (
                    <CardProduct
                      key={product.id}
                      product={product}
                      layout={layout}
                    />
                  ))}
                </div>
              ) : (
                <ProductsPlaceHolder layout={layout} category={categoryId} />
              )}
              <PaginationSection
                totalPages={totalPages}
                currentPage={pageNumber}
                onChangePage={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;

interface PaginationSectionProps {
  totalPages: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const PaginationSection = ({
  totalPages,
  currentPage,
  onChangePage,
}: PaginationSectionProps) => {
  return (
    <Pagination className="py-4">
      <PaginationContent>
        {currentPage !== 0 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              title="Trước"
              onClick={() => onChangePage(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => onChangePage(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== totalPages - 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              title="Tiếp"
              onClick={() => onChangePage(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
