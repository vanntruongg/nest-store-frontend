import type { Metadata } from "next";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import "./globals.css";
import ScrollToTop from "~/components/scroll-to-top";
import { cn } from "../lib/utils";
import { Toaster } from "~/components/ui/toaster";
import AppTokenProvider from "./AppTokenProvider";

export const metadata: Metadata = {
  title: "NEST Store - Cửa hàng thời trang",
  description: "NEST Store build by Van Truong Tran",
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
            {children}
          </AppTokenProvider>
        </ScrollToTop>
        <Toaster />
      </body>
    </html>
  );
}
