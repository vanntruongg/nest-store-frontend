"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ScrollToTop = ({ children }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return <>{children}</>;
};

export default ScrollToTop;
