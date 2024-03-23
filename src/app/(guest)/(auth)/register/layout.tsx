import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Loading from "~/components/Loading";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản mới để mua sắm với NEST Store",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-5">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
