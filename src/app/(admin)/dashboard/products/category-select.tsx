import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import productApi from "~/apis/produc-api";
import { Category, ICategory } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export interface ICategorySelectProps {
  category?: Category;
  setValue: any;
}

export function CategorySelect({ category, setValue }: ICategorySelectProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  // lưu categories trước khi chọn, để sử dụng chức năng quay lại
  const [historyCategories, setHistoryCategories] = useState<ICategory[][]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productApi.getCategory();
        setCategories(result.payload.data);
        // console.log(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, []);

  const handleSelectSubCategory = (
    e: any,
    category: Category,
    subCategories: ICategory[] | undefined
  ) => {
    e.preventDefault();
    if (subCategories && subCategories?.length > 0) {
      setCategories(subCategories);
      setHistoryCategories((prev) => [...prev, categories]);
    } else {
      setValue("category", category);
    }
  };

  const handleBackCategory = () => {
    if (historyCategories.length === 0) return;
    setCategories(historyCategories[historyCategories.length - 1]); // Gán phần tử cuối cùng của stack vào setCategories
    setHistoryCategories((prevCategories) => {
      const newHistoryCategories = [...prevCategories]; // Tạo bản sao của mảng stack
      newHistoryCategories.pop(); // Xóa phần tử cuối cùng
      return newHistoryCategories; // return new stack
    });
  };

  return (
    <div className="bg-white border rounded-sm overflow-hidden">
      <h3 className="p-2">Danh mục sản phẩm</h3>
      <Separator />
      <div
        className={cn(
          "p-4 flex items-center space-x-8 min-h-full transition-all duration-300",
          {
            "-translate-x-20": historyCategories.length === 0,
          }
        )}
      >
        <Button
          variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            handleBackCategory();
          }}
          disabled={historyCategories.length === 0}
          className={cn("transition-all duration-300", {
            "invisible opacity-0 -translate-x-4":
              historyCategories.length === 0,
          })}
        >
          <ChevronLeft />
        </Button>
        {categories.map(({ category, subCategories }) => {
          return (
            <Button
              key={category.id}
              variant={"outline"}
              className="py-6 space-x-2"
              onClick={(e) =>
                handleSelectSubCategory(e, category, subCategories)
              }
            >
              <div className="aspect-square h-8 rounded-sm">
                <Image
                  src={category.image || "/assets/product-default.jpg"}
                  alt={`${category.name}`}
                  width={50}
                  height={50}
                />
              </div>
              <p className="text-sm">{category.name}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
