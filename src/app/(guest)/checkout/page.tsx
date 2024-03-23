"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn, formatPrice } from "~/lib/utils";
import { useCheckout } from "~/hooks/useCheckout";
import { paymentMethods } from "~/static";

const CheckOutPage = () => {
  const { items } = useCheckout();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const totalPrice = useMemo(
    () =>
      items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0),
    [items]
  );

  return (
    <div className="flex flex-col gap-6 mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Thanh toán
      </h1>

      {/* Address */}
      <div className="bg-white p-4 px-8">
        <p className="text-lg text-primary">Địa chỉ nhận hàng</p>
        <div className="flex justify-between items-center py-2">
          <div className="">Văn Trường (+84) 357749210</div>
          <div className="">
            Nguyễn Văn Linh, Phường An Khánh, Quận Ninh Kiều, Cần Thơ
          </div>
          <Button variant={"link"} className="">
            Thay đổi
          </Button>
        </div>
      </div>

      {/* List items */}
      <div className="h-full w-full bg-white py-6 divide-y relative">
        <div className="px-8 py-2 flex items-center">
          <div className="flex w-full">
            <div className="flex-1 col-span-3">Sản phẩm</div>
            <div className="flex flex-1 justify-between text-muted-foreground">
              <span className="col-span-2">Đơn giá</span>
              <span className="col-span-2">Số lượng</span>
              <span className="col-span-2">Thành tiền</span>
            </div>
          </div>
        </div>

        <div className="px-8 divide-y">
          {items.map((item) => {
            return (
              <div
                key={item.product.id}
                className="flex items-center py-6 sm:py-10"
              >
                <div className="flex w-full">
                  <div className="flex flex-1 gap-4">
                    <div className="relative size-24">
                      <Image
                        src={item.product.image}
                        fill
                        alt="product image"
                        className="h-full w-full rounded-md object-cover object-center sm:size-48"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-base font-medium">
                        {item.product.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-between text-sm text-muted-foreground">
                    <div className="">{formatPrice(item.product.price)}</div>
                    <div className="">{item.quantity}</div>
                    <div className="">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Order */}
      <div className="rounded-sm divide-y">
        <div className="flex items-center gap-4 bg-white p-4">
          <p>Phương thức thanh toán</p>
          <div className="flex gap-2">
            {paymentMethods.map(({ id, method }) => (
              <div
                key={id}
                className={cn(
                  "border p-2 cursor-pointer hover:border-primary hover:text-primary transition-all duration-300",
                  {
                    "border-primary text-primary": selectedPaymentMethod === id,
                  }
                )}
                onClick={() => setSelectedPaymentMethod(id)}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        <section className="flex items-center justify-between bg-white py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-6">
          <div className="flex items-center justify-between gap-4 border-gray-200">
            <div className="text-base font-medium text-gray-900">
              Tổng thanh toán {`(${0} Sản phẩm)`}:
            </div>
            <div className="text-base font-medium text-gray-900">
              {formatPrice(totalPrice)}
            </div>
          </div>
          <div className="">
            <Button
              className={cn("w-full", {
                "opacity-50 pointer-events-none": items.length === 0,
              })}
              size={"lg"}
            >
              Thanh toán
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOutPage;
