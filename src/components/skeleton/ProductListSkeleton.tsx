import { cn } from "~/lib/utils";
import { Skeleton } from "../ui/skeleton";

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

export default ProductsPlaceHolder;
