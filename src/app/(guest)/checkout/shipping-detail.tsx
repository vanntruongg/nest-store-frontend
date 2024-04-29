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
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import { toast } from "~/components/ui/use-toast";

export function ShippingDetail() {
  const { shippingDetail, setShippingDetail } = useCheckout();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    setName(shippingDetail.name);
    setPhone(shippingDetail.phone);
    setAddress(shippingDetail.address);
  }, [
    isMounted,
    shippingDetail.address,
    shippingDetail.phone,
    shippingDetail.name,
  ]);

  const handleSaveChanges = () => {
    if (phone && !BaseUtil.validateVietnamesePhoneNumber(phone)) {
      toast({
        description: "Số điện thoại không hợp lệ",
        variant: "destructive",
      });
      return;
    }
    setShippingDetail(name, phone, address);
    setOpen(false);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Cập nhật thông tin giao hàng
            </Button>
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveChanges}
              >
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
