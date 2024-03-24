import Image from "next/image";
import React from "react";

import SentEmail from "../../../../../public/assets/sent-mail.svg";
import VerifyEmail from "~/components/verify-email";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail />
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-52 w-52 text-muted-foreground">
              <Image src={SentEmail} alt="email sent image" fill />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to
                <span className="font-semibold"> {toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
