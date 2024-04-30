"use client";

import { memo, useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import BarChart from "~/components/charts/bar-chart";

const TotalRevenue = () => {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await orderApi.getTotalRevenue();
    //   setDataAxis(Object.keys(result.payload.data));
    //   setData(Object.values(result.payload.data));
    // };
    // fetchData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-lg">
      {/* <h3 className="text-xl font-bold">Tổng doanh thu</h3> */}
    </div>
  );
};

export default memo(TotalRevenue);
