"use client";
import { BaggageClaim, Loader2, Shirt, User } from "lucide-react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import orderApi from "~/apis/order-api";
import productApi from "~/apis/produc-api";
import userApi from "~/apis/user-api";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { v4 as uuid } from "uuid";
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

  const sumaryStatistic = [
    {
      id: uuid(),
      label: "Tổng số người dùng",
      value: summary.users,
      details: false,
      icon: <User strokeWidth={1.5} className="-mt-1" />,
    },
    {
      id: uuid(),
      label: "Tổng số sản phẩm",
      value: summary.products,
      details: false,
      icon: <Shirt strokeWidth={1.5} className="-mt-1" />,
    },
    {
      id: uuid(),
      label: "Tổng số đơn hàng",
      value: summary.orders,
      details: true,
      icon: <BaggageClaim strokeWidth={1.5} className="-mt-1" />,
    },
  ];
  return (
    <div className="flex justify-between gap-4 font-semibold">
      {sumaryStatistic.map(({ id, label, value, details, icon }) =>
        details ? (
          <div
            key={id}
            className="w-full p-2 flex flex-col space-y-2 justify-between bg-white border border-gray-300 shadow-sm rounded-md"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{label}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-lg">
                  Chi tiết
                </DropdownMenuLabel>
                {Object.entries(value).map(([status, value]) => (
                  <DropdownMenuItem key={status}>
                    {status}: {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="-translate-y-1 flex items-center justify-between">
              {icon}
              <span className="text-2xl font-semibold leading-none">
                {isMounted ? (
                  <CountUp end={totalOrders as number} />
                ) : (
                  <Loader2
                    strokeWidth={1.5}
                    className="text-muted-foreground size-5 animate-spin"
                  />
                )}
              </span>
            </div>
          </div>
        ) : (
          <div
            key={id}
            className="w-full p-3 flex flex-col space-y-2 justify-between bg-white border border-gray-300 shadow-sm rounded-md"
          >
            <p className="text-base">{label}</p>
            <div className="flex items-center justify-between">
              {icon}
              <span className="text-2xl font-semibold leading-none">
                {isMounted ? (
                  <CountUp end={value as number} />
                ) : (
                  <Loader2
                    strokeWidth={1.5}
                    className="text-muted-foreground size-5 animate-spin"
                  />
                )}
              </span>
            </div>
          </div>
        )
      )}
      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
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
      </div> */}

      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
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
      </div> */}
      {/* <div className="w-full p-4 flex items-center justify-between bg-white border border-gray-300 shadow-sm rounded-md">
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
      </div> */}
    </div>
  );
}
