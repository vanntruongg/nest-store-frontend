"use client";
import Image from "next/image";
import Link from "next/link";

import { routes } from "~/static";
import SentEmail from "../../../../../public/assets/sent-email.png";

import { Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import authApi from "~/apis/auth-api";
import { BaseUtil } from "~/common/utility/base.util";
import { buttonVariants } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmail = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (token && typeof token === "string") {
      handleVerifyAccount(token);
    }
  }, [token]);

  const handleVerifyAccount = async (token: string) => {
    setIsLoading(true);
    try {
      const result = await authApi.verifyEmail(token);
      toast({ description: result.payload.message });
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      BaseUtil.handleErrorApi({ error });
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="size-8 text-red-500" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="min-h-[725px] flex flex-col items-center justify-center">
        <div className="relative mb-4 h-52 w-52 text-muted-foreground">
          <Image src={SentEmail} alt="the email was sent image" fill />
        </div>
        <h3 className="font-semibold text-2xl">Bạn đã hoàn tất.</h3>
        <p className="text-muted-foreground text-center mt-1">
          Cảm ơn bạn đã xác thực email. Bây giờ bạn đã có thể đăng nhập vào tài
          khoản của mình
        </p>
        <Link
          href={routes.LOGIN}
          className={buttonVariants({ className: "mt-4" })}
        >
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 text-zinc-300 animate-spin" />
        <h3 className="font-semibold text-xl">Verifying...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
