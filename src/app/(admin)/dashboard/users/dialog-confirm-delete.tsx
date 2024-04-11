"use client";
import { ShieldAlert } from "lucide-react";
import authApi from "~/apis/auth-api";
import { BaseUtil } from "~/common/utility/base.util";
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

interface IConfirmDeleteProps {
  email: string;
}

export function ConfirmDelete({ email }: IConfirmDeleteProps) {
  const handleDeleteUser = async () => {
    try {
      // const result = await authApi.deleteUser(email);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  console.log("Delete user by email: ", email);
  return (
    <Dialog>
      <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
        <div className="w-full text-sm cursor-pointer hover:text-red-500">
          Xóa
        </div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[525px]"
      >
        <DialogHeader className="">
          <DialogTitle className="flex">
            Xóa tài khoản người dùng
            <ShieldAlert className="size-5 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"default"}>Hủy</Button>
          </DialogClose>
          <Button
            variant={"secondary"}
            type="submit"
            onClick={handleDeleteUser}
          >
            Xác nhận xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
