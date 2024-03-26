"use client";
import React, { useEffect, useState } from "react";
import { UserRound, LogOut, ShoppingCart, Sun } from "lucide-react";
import Link from "next/link";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { routes } from "~/static";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "~/lib/utils";
import DevelopingTooltip from "./developing-tooltip";
import { tokenStorage } from "~/common/utility/auth.util";
import { useUser } from "~/hooks/useUser";
import ButtonLogout from "./button/btn-logout";

const menu = [
  {
    icon: <UserRound className="size-5" />,
    label: "Tài khoản",
    href: routes.PROFILE,
    status: "available",
  },
  {
    icon: <ShoppingCart className="size-5" />,
    label: "Giỏ hàng",
    href: routes.CART,
    status: "available",
  },
  {
    icon: <Sun className="size-5" />,
    label: "Chế độ tối",
    href: "",
    status: "notAvailable",
  },
];

const NavUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <div
        className="hover:bg-gray-100 p-2 rounded-full cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        {tokenStorage.value.rawToken.accessToken && isMounted ? (
          <Avatar className="size-7">
            <AvatarImage src={user.imageUrl} alt="avatar user" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
        ) : (
          <Link href={"/login"}>
            <UserRound strokeWidth={1.5} className="size-5 text-slate-700" />
          </Link>
        )}
        {tokenStorage.value.rawToken.accessToken && (
          <div
            className={cn(
              "min-w-60 p-2 bg-white border border-gray-300 rounded-2xl shadow-md absolute top-12 right-0 z-50 transition-all duration-300 invisible origin-top-right transform scale-0 opacity-0 group-hover:visible",
              {
                "visible scale-100 opacity-100": open,
              }
            )}
          >
            <Link
              href={routes.PROFILE}
              className="p-2 flex items-center gap-4 border-b hover:opacity-80"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="avatar user"
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              {isMounted && (
                <p className="font-semibold">{`${user.lastName} ${user.firstName}`}</p>
              )}
            </Link>
            <div className="p-2">
              {menu.map((item) =>
                item.status === "available" ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md"
                  >
                    {item.icon}
                    <p>{item.label}</p>
                  </Link>
                ) : (
                  <DevelopingTooltip
                    key={item.href}
                    className={
                      "p-2 w-full flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md opacity-50"
                    }
                  >
                    {item.icon}
                    <p>{item.label}</p>
                  </DevelopingTooltip>
                )
              )}
              <ButtonLogout className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavUser;
