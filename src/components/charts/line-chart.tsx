"use client";

import * as echarts from "echarts";
import ReactECcharts from "echarts-for-react";
import { useEffect, useState } from "react";
const dataAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
const LineChart = () => {
  const [option, setOption] = useState({});

  useEffect(() => {
    const barChartOptions = {
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: "#fff",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: [
        {
          type: "line",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b394fc" },
              { offset: 0.5, color: "#8104fd" },
              { offset: 1, color: "#8104fd" },
            ]),
          },
          data: data,
        },
      ],
    };

    setOption(barChartOptions);
  }, []);

  return <ReactECcharts option={option}></ReactECcharts>;
};

export default LineChart;
