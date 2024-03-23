"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { Category, Product } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { Skeleton } from "../ui/skeleton";

interface ProductListingProps {
  category?: boolean;
}

const ProductListing = ({ category }: ProductListingProps) => {
  const [layout, setLayout] = useState<LayoutProduct>("grid");
  const [products, setProduct] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  const fetchProduct = async () => {
    const result = await productApi.getList();
    setProduct(result.payload.data.content);
    setTotalPages(result.payload.data.totalPages);
    setCurrentPage(result.payload.data.pageable.pageNumber);
    console.log(result);
  };
  return (
    <MaxWidthWrapper className="">
      <div className="flex flex-col mb-6 bg-white">
        <div className="col-span-3 grid grid-rows-subgrid row-span-3">
          <div className="p-4 flex border-b">
            <div className="w-full flex gap-2">
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <div
                      onClick={() => setLayout("grid")}
                      className={cn("hover:text-primary text-gray-400", {
                        "text-gray-900": layout === "grid",
                      })}
                    >
                      <LayoutGrid strokeWidth={1.5} className="size-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Lưới</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <div
                      onClick={() => setLayout("list")}
                      className={cn("hover:text-primary text-gray-400", {
                        "text-gray-700": layout === "list",
                      })}
                    >
                      <LayoutList strokeWidth={1.5} className="size-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Danh sách</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Giá trị</SelectLabel> */}
                  <SelectItem value="priceLowToHight">
                    Giá, Thấp - Cao
                  </SelectItem>
                  <SelectItem value="priceHoghtToLow">
                    Giá, Cao - Thấp
                  </SelectItem>
                  <SelectItem value="name-A-Z">Tên, A - Z</SelectItem>
                  <SelectItem value="name-Z-A">Tên, Z - A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className={cn("grid grid-cols-5 gap-8")}>
            {category && (
              <div
                className={cn("w-full px-2", {
                  "flex flex-col": layout === "list",
                  "w-full flex flex-col gap-8": layout === "grid",
                })}
              >
                <div className="flex flex-col gap-4 mt-6">
                  <ListCategory categories={categories} fontSize={17} />
                </div>
              </div>
            )}
            <div
              className={cn("mt-6 col-span-5 ", {
                "col-span-4": category,
              })}
            >
              {products.length > 0 ? (
                <div
                  className={cn("", {
                    "grid grid-cols-1 lg:grid-cols-5 gap-4 gap-y-8":
                      layout === "grid",
                    "grid lg:grid-cols-4": layout === "grid" && category,
                    "grid grid-cols-2 gap-16": layout === "list",
                    "grid-cols-1": category,
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
                <ProductsPlaceHolder layout={layout} category={category} />
              )}
              <PaginationSection
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;

const ProductsPlaceHolder = ({
  layout,
  category,
}: {
  layout: string;
  category: boolean | undefined;
}) => {
  const products = [];
  for (let i = 1; i <= 20; i++) {
    products.push(i);
  }
  return (
    <div
      className={cn("w-full", {
        "grid grid-cols-1 lg:grid-cols-5 gap-4 gap-y-8": layout === "grid",
        "grid lg:grid-cols-4": layout === "grid" && category,
        "grid grid-cols-2 gap-16": layout === "list",
        "grid-cols-1": category,
      })}
    >
      {products.map((product) => (
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-[200px]" />
          <div className="p-2 gap-2 flex flex-col">
            <Skeleton className="w-full h-[20px] rounded-full" />
            <Skeleton className="w-[50px] h-[18px] self-center rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface PaginationSectionProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationSection = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationSectionProps) => {
  const pages = [];

  // Tạo mảng chứa các trang từ 1 đến totalPages
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            title="Trước"
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            title="Tiếp"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
