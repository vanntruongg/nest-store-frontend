import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description: "Sản phẩm của NEST store",
};

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
