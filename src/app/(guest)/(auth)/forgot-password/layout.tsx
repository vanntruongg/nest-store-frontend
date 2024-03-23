import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Yêu cầu đặt lại mật khẩu",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="p-5">{children}</div>;
}
