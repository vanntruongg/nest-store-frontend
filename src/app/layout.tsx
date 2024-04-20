import type { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import "./globals.css";
import ScrollToTop from "~/components/scroll-to-top";
import { cn } from "../lib/utils";
import { Toaster } from "~/components/ui/toaster";
import AppTokenProvider from "./app-token-provider";

import { baseOpenGraph } from "~/app/shared-metadata";

export const metadata: Metadata = {
  title: "NEST Store - Cửa hàng thời trang",
  description:
    "Mua sắm trực tuyến hàng triệu sản phẩm thời trang theo xu hướng mới nhất và like new. Giá tốt &amp; Miễn phí vận chuyển. Mua và bán online trong 30 giây. Mã giảm giá | NEST Store Đảm Bảo",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  metadataBase: new URL("https://neststore.vercel.app"),
  openGraph: {
    title: "NEST Store - Cửa hàng thời trang",
    description:
      "Mua sắm trực tuyến hàng triệu sản phẩm thời trang theo xu hướng mới nhất và like new. Giá tốt &amp; Miễn phí vận chuyển. Mua và bán online trong 30 giây. Mã giảm giá | NEST Store Đảm Bảo",
    url: "https://neststore.vercel.app",
    siteName: "NEST Store",
    images: [
      {
        url: "/assets/og-image.png", // Must be an absolute URL
      },
    ],
    publishedTime: "2024-04-03T11:34:00.000Z",
    authors: ["VTD", "Van Truong Tran"],
    ...baseOpenGraph,
  },
  alternates: {
    canonical: "https://neststore.vercel.app",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const refreshToken = cookieStore.get("refreshToken")?.value || "";

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn("relative h-full font-nunito bg-gray-100 antialiased")}
      >
        <ScrollToTop>
          <AppTokenProvider initialToken={{ accessToken, refreshToken }}>
            {children}
          </AppTokenProvider>
        </ScrollToTop>
        <Toaster />
      </body>
    </html>
  );
}
