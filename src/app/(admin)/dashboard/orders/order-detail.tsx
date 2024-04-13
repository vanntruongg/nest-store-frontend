import { IOrder } from "~/common/model/order.model";
import { ProductUtil } from "~/common/utility/product.util";
import ItemOrder from "~/components/item-order";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface IOrderDetailProps {
  order: IOrder;
}

const OrderDetail = ({ order }: IOrderDetailProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-200">
          <span className="sr-only">Open detail</span>
          Xem chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1025px]">
        <DialogHeader>
          <DialogTitle>
            Thông tin chi tiết đơn hàng: {order.orderId}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 space-x-4">
          <div className="col-span-2  flex flex-col justify-between">
            <div className="">
              <h3 className="capitalize text-lg font-bold">
                Địa chỉ nhận hàng
              </h3>
              <div className="mt-4">
                <h3 className="capitalize text-sm font-semibold">
                  {order.name}
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{order.phone}</p>
                  <p>{order.address}</p>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500">(*)</span>
                  Ghi chú:
                  <p>{order.notes}</p>
                </div>
              </div>
            </div>
            <div className="space-x-2">
              <span> Tổng tiền:</span>
              <span className="font-semibold">
                {ProductUtil.formatPrice(order.totalPrice)}
              </span>
            </div>
          </div>
          <div className="col-span-4">
            <h3 className="capitalize text-lg font-bold">Sản phẩm</h3>
            <div className="px-4 max-h-[325px] border divide-y overflow-scroll">
              {order.orderDetail.map((orderDetail) => (
                <ItemOrder key={orderDetail.productId} item={orderDetail} />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="w-full flex items-center">
          <DialogClose asChild>
            <Button variant={"outline"}>Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
