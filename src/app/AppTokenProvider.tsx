"use client";
import { ReactNode, useState } from "react";
import { tokenStorage } from "~/common/utility/auth.util";

export default function AppTokenProvider({
  children,
  initialToken,
}: {
  children: ReactNode;
  initialToken: AuthToken;
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      tokenStorage.value.rawToken.accessToken = initialToken.accessToken;
      tokenStorage.value.rawToken.refreshToken = initialToken.refreshToken;
    }
  });

  return <>{children}</>;
}
