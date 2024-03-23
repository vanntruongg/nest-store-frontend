("use client");
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserRound, LogOut, ShoppingCart, Sun } from "lucide-react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { routes } from "~/static";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const menu = [
  {
    icon: <UserRound className="size-5" />,
    label: "Tài khoản",
    href: routes.ACCOUNT,
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
    href: routes.LOGOUT,
    status: "notAvailable",
  },

  {
    icon: <LogOut className="size-5" />,
    label: "Đăng xuất",
    href: routes.LOGOUT,
    status: "available",
  },
];

export function UserAuthCheck() {
  const [profile, setProfile] = useState<User>();
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div>
      {true ? (
        <Link href={"/login"} className="hover:bg-gray-100 p-2 rounded-full ">
          <UserRound strokeWidth={1.5} className="size-5 text-slate-700" />
        </Link>
      ) : (
        <div ref={ref} className="relative">
          <div
            className="hover:bg-gray-100 p-2 rounded-full cursor-pointer group"
            onClick={() => setOpen(!open)}
          >
            <UserRound strokeWidth={1.5} className="size-5 text-slate-700" />
          </div>
          {open && (
            <div
              className={`min-w-60 p-2 bg-white border border-gray-300 rounded-2xl shadow-md absolute top-11 right-0 z-10 transition-all duration-300",
            `}
            >
              <Link
                href={routes.ACCOUNT}
                className="p-2 flex items-center gap-4 border-b hover:opacity-80"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar user"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <p className="font-semibold">Trần Văn Trường</p>
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
                    <Link
                      key={item.href}
                      href={item.href}
                      className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md pointer-events-none opacity-50"
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
