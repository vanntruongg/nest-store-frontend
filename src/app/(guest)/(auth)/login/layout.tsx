import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Loading from "~/components/loading";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập để tiếp tục mua sắm tại NEST Store",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-5">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
