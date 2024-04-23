import { Dispatch, SetStateAction } from "react";
import { cn } from "~/lib/utils";
import { orderStatus } from "~/static";

export interface IOrderTypeProps {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

export function OrderStatus({ status, setStatus }: IOrderTypeProps) {
  const renderStatus = ({
    type,
    typeName,
  }: {
    type: string;
    typeName: string;
  }) => {
    const isSelected = type === status;
    const className = isSelected
      ? "text-nowrap text-primary rounded-sm transition-all duration-200"
      : "cursor-pointer hover:text-primary";
    return (
      <div
        key={type}
        className={cn("w-full p-3 text-center text-sm font-bold", className)}
        onClick={() => setStatus(type)}
      >
        {typeName}
      </div>
    );
  };
  return (
    <div className="bg-white flex justify-between font-medium">
      {orderStatus.map(renderStatus)}
    </div>
  );
}
