import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Loading from "~/components/loading";

export const metadata: Metadata = {
  title: "Đăng nhập - NEST Store: Truy cập vào tài khoản của bạn",
  description:
    "Đăng nhập vào tài khoản của bạn trên NEST Store để trải nghiệm mua sắm trực tuyến tiện lợi và nhanh chóng. Khám phá các sản phẩm thời trang nam đa dạng và chất lượng cao ngay hôm nay!",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-5">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
