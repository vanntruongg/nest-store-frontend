"use client";

import { memo, useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import BarChart from "~/components/charts/bar-chart";

const OrderStatisticByMonth = () => {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  console.log("OrderStatisticByMonth re-render");
  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.getCountOrderByMonth();
      setDataAxis(Object.keys(result.payload.data));
      setData(Object.values(result.payload.data));
    };
    fetchData();
  }, []);

  const optionsCustom = {
    toolbox: {
      feature: {
        magicType: {
          type: ["line", "bar"],
        },
      },
      borderColor: "#fff",
      backgroundColor: "transparent",
    },
    tooltip: {
      valueFormatter: (value: number) => `${value} đơn`,
    },
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-lg">
      <BarChart
        title="Đơn hàng"
        dataAxis={dataAxis}
        data={data}
        optionCustom={optionsCustom}
      />
    </div>
  );
};

export default OrderStatisticByMonth;
