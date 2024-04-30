"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import orderApi from "~/apis/order-api";
import BarChart from "~/components/charts/bar-chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const OrderStatisticByMonth = () => {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const year =
    searchParams.get("orderByYear") ?? new Date().getFullYear().toString();
  const month = searchParams.get("orderByMonth") ?? "";

  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.orderStatistic(parseInt(year), month);
      setDataAxis(Object.keys(result.payload.data));
      setData(Object.values(result.payload.data));
    };
    fetchData();
  }, [year, month]);

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

  const handleChangeYear = (year: string) => {
    const month = searchParams.get("orderByMonth") || "";
    handleSetQueryString(year, month);
  };
  const handleChangeMonth = (month: string) => {
    const year =
      searchParams.get("orderByYear") || new Date().getFullYear().toString();
    handleSetQueryString(year, month);
  };

  const handleSetQueryString = (year: string, month: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderByYear", year);
    params.set("orderByMonth", month !== " " ? month : "");
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-lg">
      <div className="flex items-center space-x-4 py-2">
        <h3 className="font-bold text-xl">Đơn hàng</h3>

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
      <BarChart dataAxis={dataAxis} data={data} optionCustom={optionsCustom} />
    </div>
  );
};

export default OrderStatisticByMonth;
