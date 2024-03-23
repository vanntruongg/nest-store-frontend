"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";

import Logo from "../../public/assets/nest-logo-tranparent.png";
import { navLinks } from "~/static";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="relative group -m-2 flex items-center p-2 rounded-full">
        <Menu
          strokeWidth={1.5}
          className="size-11 lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
          aria-hidden="true"
        />
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col w-3/5">
        <SheetHeader className="w-full mx-auto">
          <SheetTitle className="flex justify-center">
            <Image src={Logo} className="size-16 scale-150" alt="logo store" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 items-center text-lg font-semibold">
          {navLinks.map((link) => (
            <SheetClose key={link.label} asChild>
              {link.href && (
                <Link
                  href={link.href}
                  className={cn({
                    "text-primary": pathname === link.href,
                  })}
                >
                  {link.label}
                </Link>
              )}
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
