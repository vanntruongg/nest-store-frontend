"use client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { X } from "lucide-react";
import { useUser } from "~/hooks/useUser";

export function FormUpdateUser() {
  const { user } = useUser();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  return (
    <>
      <Button variant={"outline"} onClick={() => setShowUpdate(true)}>
        Cập nhật
      </Button>
      <div
        className={cn(
          "bg-white p-5 absolute inset-0 -translate-y-96 transition-all duration-700",
          {
            "translate-y-0": showUpdate,
          }
        )}
      >
        <div
          className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-100 hover:rotate-90 transition-all duration-500 cursor-pointer"
          onClick={() => setShowUpdate(false)}
        >
          <X strokeWidth={1.5} className="size-5" />
        </div>
        <div className="max-w-2xl min-w-[600px]">
          <form action="" className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Label className="w-40">Họ:</Label>
              <Input />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-40">Tên:</Label>
              <Input />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-40">Số điện thoại:</Label>
              <Input
                type="number"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-40">Địa chỉ:</Label>
              <Input />
            </div>

            <Button className="self-end">Lưu</Button>
          </form>
        </div>
      </div>
    </>
  );
}
