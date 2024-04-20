"use client";

import { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import BarChart from "~/components/charts/bar-chart";

export function TotalRevenue() {
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
    <div className="p-4 bg-white rounded-md shadow-lg">
      <BarChart title="Tổng doanh thu" dataAxis={dataAxis} data={data} />
    </div>
  );
}
