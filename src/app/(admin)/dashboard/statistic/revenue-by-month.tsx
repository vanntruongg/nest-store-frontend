"use client";

import { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { ProductUtil } from "~/common/utility/product.util";
import BarChart from "~/components/charts/bar-chart";
import LineChart from "~/components/charts/line-chart";

export function RevenueByMonth() {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.getRevenueByMonth();
      setDataAxis(Object.keys(result.payload.data));
      setData(Object.values(result.payload.data));
    };
    fetchData();
  }, []);

  const optionsCustom = {
    yAxis: {
      axisLabel: {
        color: "#999",
        formatter: (value: number) => ProductUtil.formatPrice(value),
      },
    },

    toolbox: {
      feature: {
        // dataZoom: {},
        saveAsImage: {
          // backgroundColor: "#fff",
          // connectedBackgroundColor: "#fff",
          title: "Lưu",
        },

        dataView: {},
        magicType: {
          type: ["line", "bar"],
        },
      },
      borderColor: "#fff",
      backgroundColor: "transparent",
    },
    tooltip: {
      valueFormatter: (value: number) => ProductUtil.formatPrice(value),
    },
  };

  return (
    <div className="py-4 w-full bg-white rounded-md shadow-lg">
      <LineChart
        title={"Tổng doanh thu mỗi tháng"}
        dataAxis={dataAxis}
        data={data}
        optionCustom={optionsCustom}
      />
    </div>
  );
}
