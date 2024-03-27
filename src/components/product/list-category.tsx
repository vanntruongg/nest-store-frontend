import { ICategory } from "~/common/model/product.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ListCategoryProps {
  categories: ICategory[];
  fontSize: number;
  fetchData: (categoryId: number, order: string, page: number) => Promise<void>;
}

const ListCategory = ({
  categories,
  fontSize,
  fetchData,
}: ListCategoryProps) => {
  fontSize = fontSize - 1;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFetchData = (categoryId: number) => {
    fetchData(categoryId, "", 0);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId.toString());
    router.push(pathname + "?" + params.toString());
  };
  return (
    <div className="flex flex-col gap-2 items-start">
      {categories.map(({ id, name, subCategories }, idx) =>
        subCategories && subCategories.length > 0 ? (
          <Accordion key={id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger
                style={{ fontSize: fontSize }}
                className="p-2 font-semibold text-gray-700"
              >
                <div onClick={() => handleFetchData(id)}>{name}</div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <ListCategory
                  categories={subCategories}
                  fontSize={fontSize}
                  fetchData={fetchData}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div
            key={id}
            onClick={() => handleFetchData(id)}
            style={{ fontSize: fontSize }}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "px-2 py-0 text-gray-700 cursor-pointer",
              })
            )}
          >
            {name}
          </div>
        )
      )}
    </div>
  );
};

export default ListCategory;
