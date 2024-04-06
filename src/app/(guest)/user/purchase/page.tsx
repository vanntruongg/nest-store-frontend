"use client";
import React, { useEffect, useState } from "react";
import { Purchase } from "~/components/purchase";
import { cn } from "~/lib/utils";

const typePurchaseLinks = [
  {
    type: 1,
    typeName: "Tất cả",
  },
  {
    type: 2,
    typeName: "Chờ xác nhận",
  },
  {
    type: 3,
    typeName: "Vận chuyển",
  },
  {
    type: 4,
    typeName: "Hoàn thành",
  },
  {
    type: 5,
    typeName: "Đã hủy",
  },
];

const PurchasePage = () => {
  const [typePurchase, setTypePurchase] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <div className="p-1 bg-white flex justify-between font-medium">
        {typePurchaseLinks.map(({ type, typeName }) =>
          type === typePurchase ? (
            <div
              key={type}
              className={cn(
                "w-full p-2 bg-gray-50 text-center text-primary rounded-sm transition-all duration-200",
                {}
              )}
            >
              {typeName}
            </div>
          ) : (
            <div
              key={type}
              className={cn(
                "w-full text-center p-2 cursor-pointer hover:text-primary",
                {}
              )}
              onClick={() => setTypePurchase(type)}
            >
              {typeName}
            </div>
          )
        )}
      </div>

      {/* orders */}
      <Purchase orders={[]} />
    </div>
  );
};

export default PurchasePage;
