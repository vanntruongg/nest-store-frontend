"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ShieldCheck, ShoppingBag, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "./ui/button";

const links = [
  {
    href: "/user/profile",
    label: "Tài khoản",
    icon: <User size={20} />,
  },
  {
    href: "/user/purchase",
    label: "Đơn mua",
    icon: <ShoppingBag size={20} />,
  },
  {
    href: "/user/password",
    label: "Mật khẩu",
    icon: <ShieldCheck size={20} />,
  },
];

const NavLinkUser = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 text-xs font-semibold uppercase">
      {links.map(({ href, label, icon }) =>
        pathname === href ? (
          <div
            key={href}
            className="px-4 py-2 flex items-center gap-2 rounded-sm bg-primary text-white"
          >
            {icon}
            <p>{label}</p>
          </div>
        ) : (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 flex items-center gap-2 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
          >
            {icon}
            <p>{label}</p>
          </Link>
        )
      )}

      <Dialog>
        <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
          <LogOut size={20} />
          <p className="text-xs font-semibold uppercase">Đăng xuất</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn có chắc chắn muốn đăng xuất?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button>Đăng xuất</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavLinkUser;
