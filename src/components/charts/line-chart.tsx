"use client";

import * as echarts from "echarts";
import ReactECcharts from "echarts-for-react";
import { memo, useEffect, useState } from "react";

interface LineChartProps {
  title: string;
  subTitle?: string;
  dataSubText?: string | number;
  dataAxis: number[] | string[];
  data: number[];
  optionCustom?: any;
}
const LineChart = ({ title, dataAxis, data, optionCustom }: LineChartProps) => {
  const [option, setOption] = useState({});
  const data1 = data.map((data) => data * 2);
  useEffect(() => {
    const lineChartOptions = {
      title: {
        text: title,
        textStyle: {
          color: "#000",
          fontStyle: "Normal",
          fontSize: 16,
          fontWeight: "bolder",
          fontFamily: "Nunito, sans-serif",
        },
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: "#000",
          boundaryGap: false,
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
          smooth: 0.6, // boolean | number
          name: "revenue",
          showBackground: true,

          areaStyle: {
            opacity: 0.1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b394fc" },
              { offset: 0.5, color: "#8104fd" },
              { offset: 1, color: "#8104fd" },
            ]),
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b394fc" },
              { offset: 0.5, color: "#8104fd" },
              { offset: 1, color: "#8104fd" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#8104fd" },
                { offset: 0.7, color: "#8104fd" },
                { offset: 1, color: "#b394fc" },
              ]),
            },
          },
          animationEasing: "bounceInOut",
          animationDuration: 3000,
          data: data,
        },
      ],
      ...optionCustom,
    };

    setOption(lineChartOptions);
  }, [dataAxis, data, title, optionCustom]);

  return (
    <ReactECcharts
      // className="bg-red-100"
      option={option}
    ></ReactECcharts>
  );
};

export default memo(LineChart);
