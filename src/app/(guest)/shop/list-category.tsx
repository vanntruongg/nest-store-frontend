"use client";
import { ICategory } from "~/common/model/product.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { buttonVariants } from "../../../components/ui/button";
import { cn } from "~/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ListCategoryProps {
  categories: ICategory[];
  fontSize: number;
}

const ListCategory = ({ categories, fontSize }: ListCategoryProps) => {
  fontSize = fontSize - 1;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFetchData = (categoryId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", categoryId.toString());
    router.push(pathname + "?" + params.toString());
  };
  console.log(categories);

  return (
    <div className="flex flex-col gap-2 items-start">
      {categories.map(({ category, subCategories }) =>
        subCategories && subCategories.length > 0 ? (
          <Accordion
            key={category.id}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger
                style={{ fontSize: fontSize }}
                className="p-2 font-semibold text-gray-700"
              >
                <div onClick={() => handleFetchData(category.id)}>
                  {category.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <ListCategory
                  categories={subCategories}
                  fontSize={fontSize}
                  // fetchData={fetchData}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div
            key={category.id}
            onClick={() => handleFetchData(category.id)}
            style={{ fontSize: fontSize }}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "px-2 py-0 text-gray-700 cursor-pointer",
              })
            )}
          >
            {category.name}
          </div>
        )
      )}
    </div>
  );
};

export default ListCategory;
