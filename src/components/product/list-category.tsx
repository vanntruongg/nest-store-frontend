import { Category } from "~/common/model/product.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { ProductUtil } from "~/common/utility/product.util";

interface ListCategoryProps {
  categories: Category[];
  fontSize: number;
}

const ListCategory = ({ categories, fontSize }: ListCategoryProps) => {
  fontSize = fontSize - 1;

  return (
    <div className="flex flex-col gap-2 items-start">
      {categories.map(({ id, name, children }, idx) =>
        children ? (
          <Accordion key={id} type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger
                style={{ fontSize: fontSize }}
                className="p-2 font-semibold text-gray-700"
              >
                <Link href={`/${ProductUtil.createSlugCategory(name, idx)}`}>
                  {name}
                </Link>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <ListCategory categories={children} fontSize={fontSize} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={id}
            href={`/${ProductUtil.createSlugCategory(name, idx)}`}
            style={{ fontSize: fontSize }}
            className={cn(
              buttonVariants({
                variant: "link",
                className: "px-2 py-0 text-gray-700",
              })
            )}
          >
            {name}
          </Link>
        )
      )}
    </div>
  );
};

export default ListCategory;
