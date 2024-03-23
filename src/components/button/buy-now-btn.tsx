"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const BuyNowButton = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return clearTimeout(timeout);
  }, []);
  return (
    <Button
      onClick={() => {
        // addItem(product);
        // setIsSuccess(true);
      }}
      size={"sm"}
      className="w-full border bg-primary text-white text-xs uppercase rounded-none transition-all duration-300"
    >
      {isSuccess ? (
        "Đã thêm!"
      ) : (
        <div className="flex items-center gap-1">Mua ngay</div>
      )}
    </Button>
  );
};

export default BuyNowButton;
