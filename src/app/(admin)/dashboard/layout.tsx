import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { NavAdmin } from "~/components/admin/nav-admin";
import ButtonLogout from "~/components/button/btn-logout";

export const metadata: Metadata = {
  title: "NEST | Trang quản trị",
  description: "Trang quản trị, quản lý website của cửa hàng",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto bg-gray-100 flex">
      <div className="min-w-60 max-w-60 fixed top-0">
        <NavAdmin />
      </div>
      <div className="p-4 w-full ml-60">{children}</div>
      <div className="fixed bottom-4 flex flex-col justify-between min-w-60 px-8 space-y-2 text-sm font-semibold">
        <Link
          href={"/"}
          className="px-2 py-4 flex items-center space-x-2 cursor-pointer text-white hover:text-primary hover:bg-white rounded-sm duration-200"
        >
          <Home strokeWidth={2.5} className="size-5" />
          <p>Cửa hàng</p>
        </Link>
        <ButtonLogout className="px-2 py-4 text-white hover:text-primary hover:bg-white rounded-sm duration-200" />
      </div>
    </main>
  );
}
