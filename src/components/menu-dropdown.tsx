"use client";
import { useState } from "react";
import { ItemNav } from "~/static";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({ itemNav }: { itemNav: ItemNav }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navRef = useOutsideClick(() => {
    setIsOpen(false);
  });
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Popover open={isOpen}>
      <PopoverTrigger>
        <div
          ref={navRef}
          onClick={handleOpen}
          className="flex items-center gap-1 text-sm font-bold uppercase"
        >
          {itemNav.label}
          <ChevronDown
            className={cn("size-5 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="flex flex-col gap-4">
          {itemNav.children?.map(({ label, href }) => (
            <div key={href}>
              <Link
                href={href ?? "#"}
                className={cn(
                  "px-1 text-gray-900 text-sm font-bold uppercase leading-none transition duration-100 relative group hover:text-primary",
                  {
                    "text-primary": href && pathname.includes(href),
                  }
                )}
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavItems;
