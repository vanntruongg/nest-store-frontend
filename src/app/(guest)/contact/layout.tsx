import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Liên hệ - NEST Store",
  description:
    "Liên hệ với NEST Store để nhận được hỗ trợ và thông tin chi tiết về sản phẩm. Hãy liên hệ ngay để chúng tôi có thể phục vụ bạn tốt nhất!",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
