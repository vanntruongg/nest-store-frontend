import Image from "next/image";
import NoData from "../../public/assets/no-data.png";
import { IOrder } from "~/common/model/order.model";
import ItemOrder from "~/components/item-order";
import { ProductUtil } from "~/common/utility/product.util";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
export interface IPurchaseProps {
  orders: IOrder[];
}

export function Purchase({ orders }: IPurchaseProps) {
  return (
    <div className="w-full h-full">
      {orders.length === 0 ? (
        <div className="w-full h-full bg-white flex flex-col justify-center items-center">
          <Image src={NoData} alt="no data" width={250} height={250} />
          <p className="text-lg">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(
            ({
              orderId,
              address,
              phone,
              notes,
              orderDetail,
              orderStatus,
              totalPrice,
              paymentMethod,
            }) => (
              <div key={orderId} className="bg-white">
                <div className="flex justify-between gap-2 py-4 px-6 border-b">
                  <div className="">Mã đơn: {orderId}</div>
                  <div className="">{orderStatus}</div>
                </div>
                <div className="px-6 divide-y">
                  {orderDetail.map((itemOrder) => (
                    <ItemOrder key={itemOrder.orderDetailId} item={itemOrder} />
                  ))}
                </div>
                <div className="bg-zinc-50 p-6 flex justify-between items-center gap-4 border-t border-dotted">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Chi tiết đơn hàng</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                        <DialogDescription className="flex gap-4 uppercase">
                          <span className="">Mã đơn hàng: {orderId}</span>
                          <p className="w-0.5 h-full bg-gray-200"></p>
                          <p className="text-primary ">{orderStatus}</p>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-4 divide-x">
                        <div className="p-4 flex-1 flex flex-col gap-2">
                          <p className="text-lg font-medium">
                            Địa chỉ nhận hàng
                          </p>
                          <p className="font-semibold">Minh Thư</p>
                          <div className="flex flex-col gap-1 text-muted-foreground text-xs">
                            <p>{phone}</p>
                            <p>{address}</p>
                            <p>{notes}</p>
                          </div>
                        </div>
                        <div className="p-4 flex-1 text-sm divide-y">
                          <div className="p-4 flex justify-between">
                            <div className="px-4 text-muted-foreground text-nowrap">
                              Tổng tiền hàng
                            </div>
                            <div className="px-4">
                              {ProductUtil.formatPrice(totalPrice)}
                            </div>
                          </div>

                          <div className="p-4 flex justify-between">
                            <div className="px-4 text-muted-foreground text-nowrap">
                              Phí vận chuyển
                            </div>
                            <div className="px-4">
                              {ProductUtil.formatPrice(0)}
                            </div>
                          </div>
                          <div className="p-4 flex justify-between">
                            <div className="px-4 text-muted-foreground text-nowrap">
                              Thành tiền
                            </div>
                            <div className="px-4 text-primary">
                              {ProductUtil.formatPrice(totalPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <div className="w-full p-4 flex justify-end text-sm divide-x divide-dotted border-t border-dotted shadow-sm">
                          <div className="px-4 text-muted-foreground">
                            Phương thức thanh toán
                          </div>
                          <div className="px-4">{paymentMethod}</div>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <div className="flex gap-2">
                    Thành tiền:
                    <p className="text-primary font-semibold">
                      {ProductUtil.formatPrice(totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
