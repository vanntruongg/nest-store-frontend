import type { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import "./globals.css";
import ScrollToTop from "~/components/scroll-to-top";
import { cn } from "../lib/utils";
import { Toaster } from "~/components/ui/toaster";
import AppTokenProvider from "./app-token-provider";
import CheckoutProvider from "./checkout-provider";

export const metadata: Metadata = {
  title: "NEST Store - Cửa hàng thời trang",
  description:
    "Mua sắm trực tuyến hàng triệu sản phẩm thời trang theo xu hướng mới nhất. Giá tốt &amp; Miễn phí vận chuyển. Mua và bán online trong 30 giây. Mã giảm giá | NEST Đảm Bảo",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const refreshToken = cookieStore.get("refreshToken")?.value || "";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("relative h-full font-nunito bg-gray-100 antialiased")}
      >
        <ScrollToTop>
          <AppTokenProvider initialToken={{ accessToken, refreshToken }}>
            <CheckoutProvider>{children}</CheckoutProvider>
          </AppTokenProvider>
        </ScrollToTop>
        <Toaster />
      </body>
    </html>
  );
}
