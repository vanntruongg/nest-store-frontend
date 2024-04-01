import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description:
    "Khám phá danh mục sản phẩm đa dạng từ NEST Store - nơi cung cấp các sản phẩm thời trang chất lượng cao. Hãy khám phá ngay!",
};

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
