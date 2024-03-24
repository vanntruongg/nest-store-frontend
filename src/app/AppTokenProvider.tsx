"use client";
import { ReactNode, useState } from "react";
import { IAuthResponse } from "~/common/model/auth.model";
import { tokenStorage } from "~/common/utility/auth.util";

export default function AppTokenProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken: IAuthResponse;
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      tokenStorage.value.rawToken.accessToken = initialToken.accessToken;
      tokenStorage.value.rawToken.refreshToken = initialToken.refreshToken;
    }
  });

  return <>{children}</>;
}
