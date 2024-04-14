"use client";
import { useCheckout } from "~/hooks/useCheckout";
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
import { useEffect, useState } from "react";
import { useUser } from "~/hooks/useUser";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";

export function ShippingDetail() {
  const { user } = useUser();
  const { shippingDetail, setShippingDetail } = useCheckout();
  const [name, setName] = useState<string>(shippingDetail.name);
  const [phone, setPhone] = useState<string>(shippingDetail.phone);
  const [address, setAddress] = useState<string>(shippingDetail.address);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (BaseUtil.isShippingDetailEmpty(shippingDetail)) {
      setShippingDetail(
        user.firstName || "",
        user.phone || "",
        user.address || ""
      );
    }
  }, [isMounted]);

  const handleSaveChanges = () => {
    setShippingDetail(name, phone, address);
  };

  return (
    <div className="bg-white p-4 px-8">
      <p className="text-lg text-primary">Địa chỉ nhận hàng</p>
      <div className="w-full flex justify-between gap-8 items-center py-2">
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Họ tên:</p>
          {isMounted ? (
            <p className="font-medium">
              {shippingDetail.name ? shippingDetail.name : `...`}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Số điện thoại:</p>
          {isMounted ? (
            <p className="font-medium">
              {shippingDetail.phone ? shippingDetail.phone : `...`}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>
        <div className="w-full flex items-center gap-2 text-nowrap">
          <p className="text-muted-foreground">Địa chỉ:</p>
          {isMounted ? (
            <p className="font-medium">
              {shippingDetail.address ? shippingDetail.address : `...`}
            </p>
          ) : (
            <IconTextLoading />
          )}
        </div>

        {/* update */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Cập nhật thông tin giao hàng</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Cập nhật thông tin giao hàng</DialogTitle>
              <DialogDescription>
                Thêm mới hoặc cập nhật địa chỉ giao hàng
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex gap-2 items-center">
                <Label htmlFor="name" className="min-w-24">
                  Họ Tên
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className=""
                />
              </div>
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
      </div>
    </div>
  );
}
