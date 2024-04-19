"use client";

import * as echarts from "echarts";
import ReactECcharts from "echarts-for-react";
import { useEffect, useState } from "react";

interface BarChartProps {
  title: string;
  dataAxis: number[] | string[];
  data: number[];
  optionCustom?: any;
}

const BarChart = ({ title, dataAxis, data, optionCustom }: BarChartProps) => {
  const [option, setOption] = useState({});

  useEffect(() => {
    const barChartOptions = {
      title: {
        text: title,
        textStyle: {
          fontStyle: "normal",
        },
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          color: "#000",
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        tooltip: {
          show: true,
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
          type: "bar",
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
      tooltip: {
        trigger: `axis`,
        // axisPointer: {
        //   type: "shadow",
        // },
        className: "tooltip-design",
        textStyle: { color: "#fff" },
      },
      ...optionCustom,
    };

    setOption(barChartOptions);
  }, [dataAxis, data]);

  return <ReactECcharts option={option} className=""></ReactECcharts>;
};

export default BarChart;
