"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import orderApi from "~/apis/order-api";
import { ProductUtil } from "~/common/utility/product.util";
import LineChart from "~/components/charts/line-chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const Revenue = () => {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const year =
    searchParams.get("revenueByYear") ?? new Date().getFullYear().toString();
  const month = searchParams.get("revenueByMonth") ?? "";
  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.revenueStatistic(parseInt(year), month);

      setDataAxis(Object.keys(result.payload.data));
      setData(Object.values(result.payload.data));
    };
    fetchData();
  }, [year, month]);

  const handleChangeYear = (year: string) => {
    const month = searchParams.get("revenueByMonth") || "";
    handleSetQueryString(year, month);
  };
  const handleChangeMonth = (month: string) => {
    const year =
      searchParams.get("revenueByYear") || new Date().getFullYear().toString();
    handleSetQueryString(year, month);
  };

  const handleSetQueryString = (year: string, month: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("revenueByYear", year);
    params.set("revenueByMonth", month !== " " ? month : "");
    router.push(pathname + "?" + params.toString());
  };

  const totalRevenue = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr, 0);
  }, [data]);

  const optionsCustom = {
    yAxis: {
      axisLabel: {
        color: "#999",
        formatter: (value: number) => ProductUtil.formatPrice(value),
      },
    },

    toolbox: {
      right: 0,
      top: "middle",
      orient: "vertical",
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
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        axis: "auto",
      },
      show: true,
      formatter: (params: any) => {
        const name = month !== "" ? "Ngày" : "Tháng";
        return (
          `${name} ${params[0].name}` +
          "<br/>" +
          params[0].marker +
          " " +
          ProductUtil.formatPrice(params[0].value)
        );
      },
    },
  };

  return (
    <div className="p-2 w-full bg-white rounded-md shadow-lg">
      <div className="flex items-center space-x-4 py-2">
        <h3 className="font-bold text-xl">Doanh thu</h3>

        {/* select year */}
        <Select onValueChange={(value) => handleChangeYear(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={year} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chọn năm</SelectLabel>
              <SelectItem value={(new Date().getFullYear() - 2).toString()}>
                {new Date().getFullYear() - 2}
              </SelectItem>
              <SelectItem value={(new Date().getFullYear() - 1).toString()}>
                {new Date().getFullYear() - 1}
              </SelectItem>
              <SelectItem value={new Date().getFullYear().toString()}>
                {new Date().getFullYear()}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* select month */}
        <Select onValueChange={(value) => handleChangeMonth(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`Tháng ${month}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chọn tháng</SelectLabel>
              <SelectItem value=" ">Doanh thu tháng</SelectItem>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={(i + 1).toString()}>
                  {`Tháng ${i + 1}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <LineChart
        title={`Tổng doanh thu ${ProductUtil.formatPrice(totalRevenue)}`}
        dataAxis={dataAxis}
        data={data}
        optionCustom={optionsCustom}
      />
    </div>
  );
};

export default Revenue;
