"use client";
import React, { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { IOrder } from "~/common/model/order.model";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import Loading from "~/components/loading";
import { Purchase } from "~/components/purchase";
import { useUser } from "~/hooks/useUser";
import { cn } from "~/lib/utils";

const typePurchaseLinks = [
  {
    type: "ALL",
    typeName: "Tất cả",
  },
  {
    type: "PENDING_CONFIRM",
    typeName: "Chờ xác nhận",
  },
  {
    type: "PROCESSING",
    typeName: "Đang xử lý",
  },
  {
    type: "SHIPPING",
    typeName: "Vận chuyển",
  },
  {
    type: "COMPLETED",
    typeName: "Hoàn thành",
  },
  {
    type: "CANCELED",
    typeName: "Đã hủy",
  },
];

const PurchasePage = () => {
  const { user } = useUser();
  const [typePurchase, setTypePurchase] = useState<string>(
    typePurchaseLinks[0].type
  );
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (typePurchase === "ALL") {
          const result = await orderApi.getAllByEmail(user.email);
          setOrders(result.payload.data);
          console.log(result.payload.data);
        } else {
          const result = await orderApi.getByEmailAndStatus(
            user.email,
            typePurchase
          );
          setOrders(result.payload.data);
        }
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [typePurchase]);

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <div className="p-1 bg-white flex justify-between font-medium">
        {typePurchaseLinks.map(({ type, typeName }) =>
          type === typePurchase ? (
            <div
              key={type}
              className={cn(
                "w-full p-2 bg-gray-50 text-center text-nowrap text-primary rounded-sm transition-all duration-200",
                {}
              )}
            >
              {`${typeName} (${orders.length})`}
            </div>
          ) : (
            <div
              key={type}
              className={cn(
                "w-full text-center p-2 cursor-pointer hover:text-primary",
                {}
              )}
              onClick={() => setTypePurchase(type)}
            >
              {typeName}
            </div>
          )
        )}
      </div>
      {/* orders */}

      {loading ? (
        <div className="h-full bg-white flex justify-center items-center">
          <IconTextLoading />
        </div>
      ) : (
        <Purchase orders={orders} />
      )}
    </div>
  );
};

export default PurchasePage;
