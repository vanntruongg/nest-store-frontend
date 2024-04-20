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

import MaxWidthWrapper from "../../../components/max-width-wrapper";
import CardProduct from "../../../components/product/card-product";
import { Category, ProductResponse } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { BaseUtil } from "~/common/utility/base.util";
import ProductsPlaceHolder from "../../../components/skeleton/ProductListSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TooltipCustom from "../../../components/tooltip-custom";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../../../components/layout/grid-layout";
import { ListLayout } from "../../../components/layout/list-layout";

interface ProductListingProps {
  categoryId?: number;
}

const ProductListing = ({ categoryId }: ProductListingProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [layout, setLayout] = useState<ELayoutProduct>(ELayoutProduct.GRID);
  const [data, setData] = useState<ProductResponse>({
    products: [],
    first: false,
    last: false,
    pageNumber: 1,
    totalPages: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  // const [openCategory, setOpenCategory] =
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [searchParams, sort, data.pageNumber, categoryId]);

  const fetchData = async () => {
    try {
      const order = searchParams.get("order") || "";
      const page = Number(searchParams.get("pageNumber"));
      const category =
        categoryId && Number(searchParams.get("category")) === 0
          ? Number(categoryId)
          : Number(searchParams.get("category"));

      const result = await productApi.getList(category, order, page);
      console.log(result);

      setData({
        products: result.payload.data.content || [],
        first: result.payload.data.first,
        last: result.payload.data.last,
        pageNumber: result.payload.data.pageable.pageNumber + 1 || 0,
        totalPages: result.payload.data.totalPages,
      });

      if (categoryId) {
        const categoryResult = await productApi.getAllSubCategory(categoryId);
        console.log("categoryResult", categoryResult);

        setCategories(categoryResult.payload.data);
      }
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  // const fetchProduct = async (
  //   categoryId: number = 0,
  //   order: string = "",
  //   page: number = 0
  // ) => {
  //   try {
  //     setProduct(result.payload.data.content);
  //     setTotalPages(result.payload.data.totalPages);
  //   } catch (error) {
  //     BaseUtil.handleErrorApi({ error });
  //   }
  // };

  const handleChangePage = (page: number) => {
    setData((prevData) => ({ ...prevData, pageNumber: page }));
    router.push(
      pathname + "?" + createQueryString("pageNumber", page.toString())
    );
  };

  const handleSortChange = (value: string) => {
    // console.log(value);
    setSort(value);
    setData((prevData) => ({ ...prevData, pageNumber: 1 }));

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
    <MaxWidthWrapper>
      <div className="flex flex-col mb-6 bg-white">
        <div className="p-4 flex border-b">
          {/* Layout toggle */}
          <div className="w-full flex gap-2">
            <TooltipCustom
              trigger={<LayoutGrid strokeWidth={1.5} className="size-5" />}
              content={ELayoutProduct.GRID}
              customClick={setLayout}
              options={{ layout }}
              className={cn("text-gray-400 hover:text-primary", {
                "text-primary": layout === ELayoutProduct.GRID,
              })}
            />
            <TooltipCustom
              trigger={<LayoutList strokeWidth={1.5} className="size-5" />}
              content={ELayoutProduct.LIST}
              customClick={setLayout}
              options={{ layout }}
              className={cn("text-gray-400 hover:text-primary", {
                "text-primary": layout === ELayoutProduct.LIST,
              })}
            />
          </div>
          {/* Sort select */}
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

        {/* categories & products */}
        <div className={cn("")}>
          <div className={cn("mt-6")}>
            {data.products.length > 0 ? (
              layout === ELayoutProduct.GRID ? (
                <GridLayout>
                  {data.products.map((product) => (
                    <CardProduct
                      key={product.id}
                      product={product}
                      layout={layout}
                    />
                  ))}
                </GridLayout>
              ) : (
                <ListLayout>
                  {data.products.map((product) => (
                    <CardProduct
                      key={product.id}
                      product={product}
                      layout={layout}
                    />
                  ))}
                </ListLayout>
              )
            ) : (
              <ProductsPlaceHolder layout={layout} />
            )}
            {data.products.length > 0 && (
              <PaginationSection data={data} onChangePage={handleChangePage} />
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductListing;

interface PaginationSectionProps {
  data: ProductResponse;
  onChangePage: (page: number) => void;
}

const PaginationSection = ({ data, onChangePage }: PaginationSectionProps) => {
  return (
    <Pagination className="py-4">
      <PaginationContent>
        {!data.first && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              title="Trước"
              onClick={() => onChangePage(data.pageNumber - 1)}
            />
          </PaginationItem>
        )}
        {Array.from({ length: data.totalPages }, (_, i) => (
          <PaginationItem key={i} className="cursor-pointer">
            <PaginationLink
              isActive={data.pageNumber - 1 === i}
              onClick={() => onChangePage(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {!data.last && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              title="Tiếp"
              onClick={() => onChangePage(data.pageNumber + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
