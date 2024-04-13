"use client";
import { ShieldAlert } from "lucide-react";
import { useState } from "react";
import userApi from "~/apis/user-api";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "~/components/ui/use-toast";

interface IConfirmDeleteProps {
  email: string;
  fetchData: () => void;
}

export function ConfirmDelete({ email, fetchData }: IConfirmDeleteProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleDeleteUser = async () => {
    try {
      const result = await userApi.deleteUser(email);
      toast({ description: result.payload.message });
      setOpen(false);
      fetchData();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        asChild
        className="p-1.5 rounded-sm hover:bg-gray-100"
      >
        <div
          className="w-full text-sm cursor-pointer hover:text-red-500"
          onClick={() => setOpen(true)}
        >
          Xóa
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[525px]"
      >
        <AlertDialogHeader className="">
          <AlertDialogTitle className="flex">
            Xóa tài khoản người dùng
            <ShieldAlert className="size-5 text-yellow-500" />
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant={"default"}>Hủy</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              variant={"secondary"}
              type="submit"
              onClick={handleDeleteUser}
            >
              Xác nhận xóa
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
