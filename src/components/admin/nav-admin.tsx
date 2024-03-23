"use client";
import { v4 as uuid } from "uuid";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/nest-logo-tranparent.png";
import { AreaChart, BaggageClaim, Users } from "lucide-react";
import { usePathname } from "next/navigation";

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
];

export function NavAdmin() {
  const pathname = usePathname();
  return (
    <nav className="bg-white col-span-2 h-screen p-4 shadow">
      <div className="flex justify-center">
        <Image src={Logo} alt="Logo" width={100} height={100} className="" />
      </div>
      <ul className="p-3 flex flex-col">
        {navLinks.map(({ id, icon, label, link }) =>
          pathname === link ? (
            <li
              key={id}
              className="flex items-center gap-2 px-2 py-4 text-white font-medium rounded-sm bg-primary"
            >
              {icon}
              {label}
            </li>
          ) : (
            <li
              key={id}
              className="text-muted-foreground font-medium rounded-sm hover:bg-gray-100"
            >
              <Link href={link} className="flex items-center gap-2  px-2 py-4">
                {icon}
                {label}
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
