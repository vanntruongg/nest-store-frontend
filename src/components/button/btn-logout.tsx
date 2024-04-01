"use client";

import authApi from "~/apis/auth-api";
import { useRouter } from "next/navigation";
import { BaseUtil } from "~/common/utility/base.util";
import { LogOut } from "lucide-react";
import { useUser } from "~/hooks/useUser";
import { tokenStorage } from "~/common/utility/auth.util";

export default function ButtonLogout({ className }: { className: string }) {
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
    <div className={className} onClick={handleLogout}>
      <LogOut className="size-5" />
      <p>Đăng xuất</p>
    </div>
  );
}
