"use client";

import * as echarts from "echarts";
import ReactECcharts from "echarts-for-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const lineChartOptions = {
      title: {
        text: title,
        textStyle: {
          color: "#000",
          fontStyle: "Normal",
          fontSize: 20,
          fontWeight: "bold",
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
          showBackground: true,
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
          data: data,
        },
      ],
      ...optionCustom,
    };

    setOption(lineChartOptions);
  }, [dataAxis, data, title, optionCustom]);

  return <ReactECcharts option={option}></ReactECcharts>;
};

export default LineChart;
