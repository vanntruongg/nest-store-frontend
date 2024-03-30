"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Search, X, Trash2, Loader2 } from "lucide-react";
import useDebounce from "~/hooks/useDebounce";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "./ui/input";
import { useHistorySearch } from "~/hooks/useHistorySearch";
import { v4 as uuid } from "uuid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ItemProductSearch from "./item-search";
import { cn } from "~/lib/utils";
import { Product } from "~/common/model/product.model";
import productApi from "~/apis/produc-api";
import { BaseUtil } from "~/common/utility/base.util";

const SearchComp = () => {
  const { replace } = useRouter();
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { items, addItem, removeItem, clearHistorySearch } = useHistorySearch();
  const [recommendProducts, setRecommedProduct] = useState<Product[]>([]);

  const [searchValue, setSearchValue] = useState<string | "">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounce.trim() === "") {
      setRecommedProduct([]);
      return;
    }
    fetchProduct();
  }, [debounce]);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const result = await productApi.getProductByName(debounce, 5);
      // console.log(result);
      setRecommedProduct(result.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: any, searchValue: string) => {
    e.preventDefault();

    addItem({ id: uuid(), searchValue: searchValue });

    const params = new URLSearchParams(searchParam);

    params.set("keyword", searchValue);

    const newParams = params.toString().replace(/\+/g, "%20");
    if (pathname === "/search") {
      replace(`${pathname}?${newParams}`);
    } else {
      router.push(`/search?${newParams}`);
    }

    resetInput();
    setOpen(false);
  };

  const resetInput = () => {
    setSearchValue("");
    setRecommedProduct([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-gray-100 hidden lg:block p-2 rounded-full group relative">
          <Search
            strokeWidth={1.5}
            className="size-5 cursor-pointer text-slate-700"
            onClick={() => {
              resetInput();
              setOpen(true);
            }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl flex flex-col justify-start max-h-screen top-1/4">
        <DialogHeader>
          <DialogTitle>Tìm kiếm sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="">
          <form
            onSubmit={(e) => handleSearch(e, searchValue)}
            className="flex gap-8"
          >
            <div className="w-full relative">
              <Input
                id="name"
                value={searchValue}
                className=""
                placeholder="Từ khóa tìm kiếm"
                required
                onChange={handleChangeSearchValue}
              />
              {loading && (
                <div className="absolute top-1/2 right-2 -translate-y-1/2">
                  <Loader2 strokeWidth={1.5} className="size-4 animate-spin" />
                </div>
              )}
              {/* {recommendProducts.length > 0 && ( */}
              {/* <div
                className={cn(
                  "h-0 invisible opacity-0 origin-top transition-all duration-1000",
                  {
                    "h-full visible opacity-100": recommendProducts.length > 0,
                  }
                )}
              >
                {recommendProducts.map((product) => (
                  <ItemProductSearch
                    key={product.id}
                    product={product}
                    setOpenDialog={setOpen}
                  />
                ))}
              </div> */}
              {/* )} */}
              <div
                className={cn(
                  "w-full p-2 absolute translate-y-2 rounded-sm bg-white shadow-2xl hidden",
                  {
                    block: recommendProducts.length > 0,
                  }
                )}
              >
                {recommendProducts.map((product) => (
                  <ItemProductSearch
                    key={product.id}
                    product={product}
                    setOpenDialog={setOpen}
                  />
                ))}
              </div>
            </div>
            <Button type="submit">Tìm kiếm</Button>
          </form>
        </div>

        <DialogFooter className="sm:max-w-xl overflow-hidden size-full">
          <div className="w-full flex flex-col justify-between">
            <div className="w-full pb-5 grid grid-flow-row grid-cols-4 gap-4">
              {items.map(({ id, searchValue }) => (
                <div
                  key={id}
                  className="p-1 flex justify-between items-center gap-1 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    setSearchValue(searchValue);
                    handleSearch(e, searchValue);
                  }}
                >
                  <p className="max-w-[100px] text-sm truncate">
                    {searchValue}
                  </p>
                  <div
                    className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(id);
                    }}
                  >
                    <X size={14} className="" />
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <Button
                variant={"link"}
                onClick={() => clearHistorySearch()}
                className="self-start felx gap-1 text-gray-700 hover:text-red-500"
              >
                <Trash2 className="size-5" />
                <p className="mt-1">Xóa lịch sử tìm kiếm</p>
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchComp;
