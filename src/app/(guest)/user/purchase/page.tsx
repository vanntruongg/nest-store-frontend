"use client";
import { Type } from "lucide-react";
import React, { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { IOrder } from "~/common/model/order.model";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import Loading from "~/components/loading";
import { Purchase } from "~/components/purchase";
import { OrderStatus } from "~/components/order-status";
import { useUser } from "~/hooks/useUser";
import { cn } from "~/lib/utils";
import { orderStatus } from "~/static";

const PurchasePage = () => {
  const { user } = useUser();
  const [typePurchase, setTypePurchase] = useState<string>(orderStatus[0].type);
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
  }, [typePurchase, user.email]);

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <OrderStatus status={typePurchase} setStatus={setTypePurchase} />
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
