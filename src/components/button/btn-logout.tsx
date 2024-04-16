"use client";

import authApi from "~/apis/auth-api";
import { useRouter } from "next/navigation";
import { BaseUtil } from "~/common/utility/base.util";
import { LogOut } from "lucide-react";
import { useUser } from "~/hooks/useUser";
import { tokenStorage } from "~/common/utility/auth.util";
import { cn } from "~/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

export default function ButtonLogout({ className }: { className?: string }) {
  const router = useRouter();
  const { clearUser } = useUser();
  const handleLogout = async () => {
    try {
      await authApi.logoutFromNextClientToNextServer();
      clearUser();
      tokenStorage.clearToken();
      router.push("/login");
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className={cn(
            "flex items-center space-x-2 cursor-pointer",
            className
          )}
        >
          <LogOut className="size-5" />
          <p>Đăng xuất</p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắn chắn muốn đăng xuất?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
