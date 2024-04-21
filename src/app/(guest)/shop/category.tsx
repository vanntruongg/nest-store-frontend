import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import productApi from "~/apis/produc-api";
import { Category as CategoryModel } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { ProductUtil } from "~/common/utility/product.util";
import { Skeleton } from "~/components/ui/skeleton";

const Category = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await productApi.getTopLevelCategory();
        setCategories(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    fetchData();
  }, []);

  const handleRedirect = (name: string, id: number) => {
    localStorage.setItem("category", name);
    router.push(ProductUtil.createSlugCategory(name, id));
  };
  return (
    <div className="bg-white">
      <h3 className="p-4 text-base uppercase text-muted-foreground shadow">
        Danh mục
      </h3>
      <div className="flex justify-between items-center divide-x">
        {categories.length > 0 ? (
          categories.map(({ id, name, image }) => (
            <div
              key={id}
              onClick={() => handleRedirect(name, id)}
              className="w-full text-center p-6 capitalize hover:shadow-sm cursor-pointer relative group"
            >
              <div className="w-1/3 mx-auto flex flex-col gap-2">
                <div className="aspect-square bg-gray-100 rounded-full overflow-hidden relative">
                  <Image
                    fill
                    sizes="full"
                    src={image}
                    alt={`image category ${name}`}
                    className="bg-gray-50 group-hover:scale-110 transition duration-300"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={image}
                  />
                </div>
                <p className="text-nowrap">{name}</p>
              </div>
            </div>
          ))
        ) : (
          <CategoryPlaholder />
        )}
      </div>
    </div>
  );
};

export default Category;

const CategoryPlaholder = () => {
  return (
    <div className="flex w-full justify-between items-center divide-x">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="flex-1 text-center p-6 capitalize hover:shadow-sm relative group"
        >
          <div className="w-1/3 mx-auto flex flex-col gap-2">
            <div className="aspect-square bg-gray-100 rounded-full overflow-hidden relative">
              <Skeleton className="w-full h-full rounded-full bg-gray-200" />
            </div>
            <Skeleton className="text-nowrap w-full mx-auto h-2 bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};
