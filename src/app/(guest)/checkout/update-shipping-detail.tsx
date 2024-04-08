import { useState } from "react";
import { IOrderShippingDetail } from "~/common/model/order.model";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface IShippingDetailProps {
  shippingDetail: IOrderShippingDetail;
  setShippingDetail: (shippingDetail: IOrderShippingDetail) => void;
}

export function UpDateShippingDetail({
  shippingDetail,
  setShippingDetail,
}: IShippingDetailProps) {
  const [phone, setPhone] = useState<string>(shippingDetail.phone);
  const [address, setAddress] = useState<string>(shippingDetail.address);
  const handleSaveChanges = () => {
    setShippingDetail({
      phone,
      address,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cập nhật thông tin giao hàng</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin giao hàng</DialogTitle>
          <DialogDescription>
            Thêm mới hoặc cập nhật địa chỉ giao hàng
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex gap-2 items-center">
            <Label htmlFor="phone" className="min-w-24">
              Số điện thoại
            </Label>
            <Input
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=""
            />
          </div>
          <div className="flex gap-2 items-center">
            <Label htmlFor="address" className="min-w-24">
              Địa chỉ
            </Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=""
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveChanges}
            >
              Lưu thay đổi
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
