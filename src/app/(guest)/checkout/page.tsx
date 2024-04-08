"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
import { Loader2 } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import orderApi from "~/apis/order-api";
import {
  IOrderRequest,
  IOrderShippingDetail,
} from "~/common/model/order.model";
import { ShippingDetail } from "./shipping-detail";
import { toast } from "~/components/ui/use-toast";
import { PaymentMethod } from "./payment-method";
import { useUser } from "~/hooks/useUser";
import { UpDateShippingDetail } from "./update-shipping-detail";

const CheckOutPage = () => {
  const { items } = useCheckout();
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [shippingDetail, setShippingDetail] = useState<IOrderShippingDetail>({
    phone: "",
    address: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const totalPrice = useMemo(
    () => items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [items]
  );

  const handleCheckOut = () => {
    if (paymentMethod === 1) {
      processPaymentWithCOD();
    } else {
      processPaymentWithVNPAY();
    }
  };

  const processPaymentWithCOD = async () => {
    try {
      if (!BaseUtil.isShippingDetailEmpty(shippingDetail)) {
        const orderRequest: IOrderRequest = {
          email: user.email,
          phone: shippingDetail.phone,
          address: shippingDetail.address,
          totalPrice: totalPrice,
          paymentMethodId: "",
          listProduct: [],
        };
        console.log(orderRequest);
      } else {
        toast({
          description: "Thiếu thông tin giao hàng",
          variant: "destructive",
          action: (
            <UpDateShippingDetail
              shippingDetail={shippingDetail}
              setShippingDetail={setShippingDetail}
            />
          ),
        });
      }

      // const result = await orderApi.createOrder();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  const processPaymentWithVNPAY = async () => {
    try {
      const result = await orderApi.getUrlPaymentVNPay(totalPrice);
      console.log(result);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Thanh toán
      </h1>

      {/* Address */}
      <ShippingDetail
        shippingDetail={shippingDetail}
        setShippingDetail={setShippingDetail}
      />

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
          {isMounted &&
            items.map((item) => {
              return (
                <div key={item.id} className="flex items-center py-6 sm:py-10">
                  <div className="flex w-full">
                    <div className="flex flex-1 gap-4">
                      <div className="relative size-24">
                        <Image
                          src={item.imageUrl}
                          fill
                          sizes="100"
                          alt="product image"
                          className="h-full w-full rounded-md object-cover object-center sm:size-48"
                        />
                      </div>
                      <div className="">
                        <h3 className="text-base font-medium">{item.name}</h3>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm text-muted-foreground">
                      <div className="">
                        {ProductUtil.formatPrice(item.price)}
                      </div>
                      <div className="">{item.quantity}</div>
                      <div className="">
                        {ProductUtil.formatPrice(item.price * item.quantity)}
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
        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <section className="flex items-center justify-between bg-white py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-6">
          <div className="flex items-center justify-between gap-4 border-gray-200">
            <div className="text-base font-medium text-gray-900">
              Tổng thanh toán {`(${isMounted ? items.length : 0} Sản phẩm)`}:
            </div>
            <div className="text-base font-medium text-gray-900">
              {isMounted ? (
                ProductUtil.formatPrice(totalPrice)
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Loader2 className="size-4 animate-spin" />
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <Button
              className={cn("w-full", {
                "opacity-50 pointer-events-none":
                  isMounted && items.length === 0,
              })}
              size={"lg"}
              onClick={handleCheckOut}
            >
              Đặt hàng
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOutPage;
