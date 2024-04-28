"use client";
import React, { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { IOrder } from "~/common/model/order.model";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import { Purchase } from "~/components/purchase";
import { OrderStatus } from "~/components/order-status";
import { useUser } from "~/hooks/useUser";
import { orderStatus } from "~/static";
import { useSearchParams } from "next/navigation";

const PurchasePage = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const status = searchParams.get("orderStatus") || orderStatus[0].type;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (status === orderStatus[0].type) {
          const result = await orderApi.getAllByEmail(user.email);
          setOrders(result.payload.data);
          // console.log(result.payload.data);
        } else {
          const result = await orderApi.getByEmailAndStatus(user.email, status);
          setOrders(result.payload.data);
        }
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [status, user.email]);

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <OrderStatus />
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
