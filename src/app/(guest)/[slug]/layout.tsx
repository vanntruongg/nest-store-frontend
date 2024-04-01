import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "[Tên sản phẩm]",
  description:
    "Khám phá chi tiết sản phẩm [Tên sản phẩm] từ NEST Store. Hãy tìm hiểu thêm về đặc điểm, mô tả, và giá của sản phẩm để có quyết định mua hàng chính xác!",
};

// export async function generateMetadata({ params }) {
//   return {
//     title: '...',
//   }
// }

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
