import type { Metadata } from "next";
import { ReactNode } from "react";
import { NavAdmin } from "~/components/admin/nav-admin";

export const metadata: Metadata = {
  title: "NEST | Trang quản trị",
  description: "Trang quản trị, quản lý website của cửa hàng",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-gray-100 grid grid-cols-10">
      <NavAdmin />
      <div className="p-4 col-span-8">{children}</div>
    </main>
  );
}
