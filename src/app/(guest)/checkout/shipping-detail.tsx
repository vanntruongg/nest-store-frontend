"use client";
import { useEffect, useState } from "react";
import { IOrderShippingDetail } from "~/common/model/order.model";
import { useUser } from "~/hooks/useUser";
import { UpDateShippingDetail } from "./update-shipping-detail";

interface IShippingDetailProps {
  shippingDetail: IOrderShippingDetail;
  setShippingDetail: (shippingDetail: IOrderShippingDetail) => void;
}

export function ShippingDetail({
  shippingDetail,
  setShippingDetail,
}: IShippingDetailProps) {
  const { user } = useUser();
  const [phone, setPhone] = useState<number>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    setShippingDetail({
      phone: user.phone || "",
      address: user.address || "",
    });
  }, []);
  return (
    <div className="bg-white p-4 px-8">
      <p className="text-lg text-primary">Địa chỉ nhận hàng</p>
      <div className="w-full flex justify-between gap-8 items-center py-2">
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Số điện thoại:</p>
          <p className="font-medium">{shippingDetail.phone || `...`}</p>
        </div>
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Địa chỉ:</p>
          <p className="font-medium">{shippingDetail.address || `...`}</p>
        </div>
        <UpDateShippingDetail
          shippingDetail={shippingDetail}
          setShippingDetail={setShippingDetail}
        />
      </div>
    </div>
  );
}
