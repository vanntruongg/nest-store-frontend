"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import orderApi from "~/apis/order-api";
import productApi from "~/apis/produc-api";
import userApi from "~/apis/user-api";
import IconTextLoading from "~/components/icon-text-loading";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SummaryStatistic {
  users: number;
  products: number;
  orders: { [key: string]: number };
}

export function SummaryStatistic() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
    setIsMounted(true);
  }, []);
  const totalOrders = Object.values(summary.orders).reduce(
    (acc, curr) => acc + curr,
    0
  );
  return (
    <div className="flex justify-between gap-4 font-semibold">
      <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
        <p className="text-sm">Tổng số người dùng</p>
        <span className="text-3xl font-semibold">
          {isMounted ? (
            <CountUp end={summary.users} />
          ) : (
            <Loader2
              strokeWidth={1.5}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div>

      <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
        <p className="text-sm">Tổng số sản phẩm</p>
        <span className="text-3xl font-semibold">
          {isMounted ? (
            <CountUp end={summary.products} />
          ) : (
            <Loader2
              strokeWidth={1.5}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div>
      <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
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
          {isMounted ? (
            <CountUp end={totalOrders} />
          ) : (
            <Loader2
              strokeWidth={1.5}
              className="text-muted-foreground size-5 animate-spin"
            />
          )}
        </span>
      </div>
    </div>
  );
}
