"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { routes } from "~/static";
import SentEmail from "../../public/assets/sent-mail.svg";
import { Loader2, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const isLoading = undefined;
  const isError = true;

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
