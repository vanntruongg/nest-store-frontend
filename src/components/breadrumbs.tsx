"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { cn } from "~/lib/utils";

interface BreadrumbsProps {
  breadrumbs?: Breadrumb[];
  options?: string;
  optionPage?: boolean;
  className?: string;
}

const Breadrumbs = ({
  breadrumbs,
  options,
  optionPage,
  className,
}: BreadrumbsProps) => {
  const pathname = usePathname();
  return (
    <div
      className={cn("bg-white flex justify-center items-center", className, {
        "h-20": !className,
      })}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href={"/"}>NEST Store</Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          {breadrumbs &&
            breadrumbs.map(({ name, href }, idx) => (
              <div key={href} className="flex items-center gap-2">
                <BreadcrumbItem>
                  {href === pathname ? (
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx !== breadrumbs.length - 1 || options ? (
                  <BreadcrumbSeparator />
                ) : null}
              </div>
            ))}
          {options &&
            (optionPage ? (
              <BreadcrumbPage>{options}</BreadcrumbPage>
            ) : (
              <BreadcrumbItem>{options}</BreadcrumbItem>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadrumbs;
