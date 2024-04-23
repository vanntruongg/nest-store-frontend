"use client";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/nest-logo-tranparent.png";
import { AreaChart, BaggageClaim, Home, Shirt, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import ButtonLogout from "../button/btn-logout";

const navLinks = [
  {
    id: uuid(),
    icon: <AreaChart strokeWidth={1.5} />,
    label: "Thống kê",
    link: "/dashboard/statistic",
  },
  {
    id: uuid(),
    icon: <Users strokeWidth={1.5} />,
    label: "Quản lý người dùng",
    link: "/dashboard/users",
  },
  {
    id: uuid(),
    icon: <BaggageClaim strokeWidth={1.5} />,
    label: "Quản lý đơn hàng",
    link: "/dashboard/orders",
  },
  {
    id: uuid(),
    icon: <Shirt strokeWidth={1.5} />,
    label: "Quản lý sản phẩm",
    link: "/dashboard/products",
  },
  {
    id: uuid(),
    icon: <Home strokeWidth={1.5} />,
    label: "Cửa hàng",
    link: "/",
  },
];

export function NavAdmin() {
  const pathname = usePathname();
  return (
    <nav className="bg-primary text-white h-full min-h-screen p-4 shadow">
      <Link
        href={"/dashboard/statistic"}
        className="overflow-hidden flex justify-center scale-150"
      >
        <Image
          src={Logo}
          alt="Logo"
          width={50}
          height={50}
          className="scale-150 overflow-hidden"
        />
      </Link>
      <ul className="px-3 flex flex-col mt-4">
        {navLinks.map(({ id, icon, label, link }) =>
          pathname === link ? (
            <li
              key={id}
              className="flex items-center gap-2 px-2 py-4 font-medium rounded-sm text-primary bg-white"
            >
              {icon}
              {label}
            </li>
          ) : (
            <li
              key={id}
              className="font-medium rounded-sm hover:bg-white hover:text-primary transition-colors duration-300"
            >
              <Link href={link} className="flex items-center gap-2 px-2 py-4">
                {icon}
                {label}
              </Link>
            </li>
          )
        )}
        <ButtonLogout className="px-2 py-4 font-medium rounded-sm hover:bg-white hover:text-primary transition-colors duration-300" />
      </ul>
    </nav>
  );
}
