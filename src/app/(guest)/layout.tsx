import type { Metadata } from "next";
import { ReactNode } from "react";

import Header from "~/components/header";
import Footer from "~/components/footer";

export const metadata: Metadata = {
  title: "NEST Store - Cửa hàng thời trang",
  description: "NEST Store build by Van Truong Tran",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex-1 mt-[76px]">{children}</div>
      <Footer />
    </main>
  );
}
