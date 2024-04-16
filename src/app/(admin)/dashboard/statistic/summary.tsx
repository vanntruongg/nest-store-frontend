"use client";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import orderApi from "~/apis/order-api";
import productApi from "~/apis/produc-api";
import userApi from "~/apis/user-api";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SummaryStatistic {
  users: number;
  products: number;
  orders: { [key: string]: number };
}

export function SummaryStatistic() {
  const [summary, setSummary] = useState<SummaryStatistic>({
    users: 0,
    products: 0,
    orders: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      const [users, products, orders] = await Promise.all([
        userApi.getUserCount(),
        productApi.getProductCount(),
        orderApi.getOrderCount(),
      ]);

      setSummary({
        users: users.payload.data,
        products: products.payload.data,
        orders: orders.payload.data,
      });
    };
    fetchData();
  }, []);
  const totalOrders = Object.values(summary.orders).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return (
    <div className="flex justify-between space-x-8">
      <div className="w-full p-4 flex items-center justify-between bg-white shadow-sm rounded-sm">
        <p className="text-sm">Tổng số người dùng</p>
        <span className="text-3xl font-semibold">
          <CountUp end={summary.users} separator="," />
        </span>
      </div>
      <div className="w-full p-4 flex items-center justify-between bg-white shadow-sm rounded-sm">
        <p className="text-sm">Tổng số sản phẩm</p>
        <span className="text-3xl font-semibold">
          <CountUp end={summary.products} separator="," />
        </span>
      </div>
      <div className="w-full p-4 flex items-center justify-between bg-white shadow-sm rounded-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Tổng số đơn hàng</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Chi tiết</DropdownMenuLabel>
            {Object.entries(summary.orders).map(([status, value]) => (
              <DropdownMenuItem key={status}>
                {status}: {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-3xl font-semibold">
          <CountUp end={totalOrders} separator="," />
        </span>
      </div>
    </div>
  );
}
