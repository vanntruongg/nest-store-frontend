"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApi from "~/apis/auth-api";
import { tokenStorage } from "~/common/utility/auth.util";
import { BaseUtil } from "~/common/utility/base.util";
import { useCheckout } from "~/hooks/useCheckout";
import { useUser } from "~/hooks/useUser";

const Logout = () => {
  const router = useRouter();
  const { clearUser } = useUser();
  const { clearCheckout } = useCheckout();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    handleLogout();
  }, [accessToken, router]);

  const handleLogout = async () => {
    if (accessToken === tokenStorage.value.rawToken.accessToken) {
      try {
        await authApi.logoutFromNextClientToNextServer(true);
        clearUser();
        tokenStorage.clearToken();
        router.push("/login");
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    }
  };
  return <div></div>;
};

export default Logout;
