import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { orderStatus as orderStts } from "~/static";
import { BaseUtil } from "~/common/utility/base.util";
import orderApi from "~/apis/order-api";
import { toast } from "~/components/ui/use-toast";

export interface IUpdateStatusProps {
  status: string;
  orderStatus: string;
  orderId: number;
  fetchData: () => void;
}

export function UpdateStatus({
  status,
  orderStatus,
  orderId,
  fetchData,
}: IUpdateStatusProps) {
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const result = await orderApi.updateStatus(id, status);
      toast({ description: result.payload.message });
      fetchData();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Cập nhật trạng thái đơn đơn hàng</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {orderStts
          .filter(
            ({ type, typeName }) =>
              type !== status && typeName != orderStatus && type !== "ALL"
          )
          .map(({ type, typeName }) => (
            <DropdownMenuItem key={typeName} className="p-0">
              <Button
                variant={"ghost"}
                onClick={() => handleUpdateStatus(orderId, type)}
              >
                {typeName}
              </Button>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
