"use client";
import React, { useState } from "react";
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

  return (
    <div className="h-full flex flex-col gap-4 rounded-sm">
      <div className="flex justify-between bg-white font-medium">
        {typePurchaseLinks.map(({ type, typeName }) =>
          type === typePurchase ? (
            <div
              key={type}
              className={cn(
                "w-full text-center p-2 text-primary border-b-2 border-primary",
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
      <Purchase orders={[]} />
    </div>
  );
};

export default PurchasePage;
