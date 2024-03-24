"use client";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

import NotFoundImg from "../../../public/assets/not-found.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const [countDown, setCountDown] = useState<number>(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countDown === 0) {
        router.push("/");
      } else {
        setCountDown((prevCounDown) => prevCounDown - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown, router]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="relative mb-4 h-52 w-52 text-muted-foreground">
        <Image src={NotFoundImg} fill alt="not found" priority />
      </div>
      <p className="text-muted-foreground text-center mt-1">
        Không tìm thấy trang.
      </p>
      <Link href={"/"} className={buttonVariants({ className: "mt-4" })}>
        Trở lại trang chủ sau {countDown}s
      </Link>
    </div>
  );
};

export default NotFound;
