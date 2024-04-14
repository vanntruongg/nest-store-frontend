"use client";
import Image from "next/image";
import ThankYouImage from "../../../../public/assets/thankyou.svg";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight, MoveRight } from "lucide-react";

const ThankYouPage = () => {
  return (
    <main className="relative lg:min-h-screen ">
      <div className="hidden lg:block h-full overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          src={ThankYouImage}
          fill
          className="size-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-32 xl:gapx-24">
          <div className="lg:col-start-2 space-y-4">
            <p className="text-base font-medium text-primary">
              Đặt hàng thành công
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight  text-gray-900 sm:text-5xl">
              Cảm ơn bạn đã đặt hàng
            </h1>
            <Button variant={"outline"} className="space-x-2 group">
              <Link href={"/shop"}>Tiếp tục mua sắm</Link>
              <MoveRight
                strokeWidth={1}
                className="group-hover:translate-x-2 transition-all duration-200"
              />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
