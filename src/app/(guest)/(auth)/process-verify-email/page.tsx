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
import { useRouter } from "next/navigation";
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmail = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (token && typeof token === "string") {
      handleVerifyAccount(token);
    }
  }, [token]);

  const handleVerifyAccount = async (token: string) => {
    setIsLoading(true);
    try {
      const result = await authApi.verifyEmail(token);
      console.log(result);
      toast({ description: result.payload.message });
      router.push("/login");
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
  if (!isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative mb-4 h-52 w-52 text-muted-foreground">
          <Image src={SentEmail} alt="the email was sent image" fill />
        </div>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email
        </p>
        <Link
          href={routes.LOGIN}
          className={buttonVariants({ className: "mt-4" })}
        >
          Sign in
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
