import { cn } from "~/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { GridLayout } from "../layout/grid-layout";
import { ListLayout } from "../layout/list-layout";

const ProductsPlaceHolder = ({ layout }: { layout: string }) => {
  return (
    <>
      {layout === ELayoutProduct.GRID ? (
        <GridLayout>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-2 gap-2 flex flex-col">
                <Skeleton className="w-full h-[20px] rounded-full" />
                <Skeleton className="w-[50px] h-[18px] self-center rounded-full" />
              </div>
            </div>
          ))}
        </GridLayout>
      ) : (
        <ListLayout>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="w-full h-[200px]" />
              <div className="p-2 gap-2 flex flex-col">
                <Skeleton className="w-full h-[20px] rounded-full" />
                <Skeleton className="w-[50px] h-[18px] self-center rounded-full" />
              </div>
            </div>
          ))}
        </ListLayout>
      )}
      <div className="flex justify-center gap-4 my-8">
        <Skeleton className="w-20"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-5 h-5 rounded-full"></Skeleton>
        <Skeleton className="w-20"></Skeleton>
      </div>
    </>
  );
};

export default ProductsPlaceHolder;
