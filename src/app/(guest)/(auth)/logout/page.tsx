"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import authApi from "~/apis/auth-api";
import { tokenStorage } from "~/common/utility/auth.util";
import { BaseUtil } from "~/common/utility/base.util";

const Logout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    handleLogout();
  }, [accessToken, router]);

  const handleLogout = async () => {
    if (accessToken === tokenStorage.value.rawToken.accessToken) {
      try {
        await authApi.logoutFromNextClientToNextServer(true);
        router.push("/login");
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    }
  };
  return <div></div>;
};

export default Logout;
