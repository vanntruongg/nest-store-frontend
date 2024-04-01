import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Loading from "~/components/loading";

export const metadata: Metadata = {
  title: "Đăng ký - NEST Store: Trở thành thành viên để nhận nhiều ưu đãi",
  description:
    "Tạo tài khoản mới trên NEST Store để trở thành thành viên của chúng tôi và nhận nhiều ưu đãi hấp dẫn. Khám phá thế giới thời trang nam đa dạng và thú vị, và bắt đầu mua sắm trực tuyến ngay hôm nay!",
};

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-5">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
