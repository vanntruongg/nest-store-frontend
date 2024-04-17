"use client";

import { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import BarChart from "~/components/charts/bar-chart";

export function OrderStatisticByMonth() {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.getCountOrderByMonth();
      setDataAxis(Object.keys(result.payload.data));
      setData(Object.values(result.payload.data));
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 w-[40rem] bg-white rounded-2xl shadow-lg">
      <span className="font-medium text-xl">Tổng đơn hàng theo tháng</span>
      <BarChart dataAxis={dataAxis} data={data} />
    </div>
  );
}