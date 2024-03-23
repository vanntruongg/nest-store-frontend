"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  ForgotPasswordShema,
  TForgotPasswordShema,
} from "~/app/schema-validations/auth.shema";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordShema>({
    resolver: zodResolver(ForgotPasswordShema),
  });

  const onSubmit = async ({ email }: TForgotPasswordShema) => {
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    console.log(email);
    // console.log(result);
  };

  return (
    <Card className="relative flex flex-col lg:items-center justify-start lg:px-0 max-w-xl mx-auto min-h-screen">
      <Link
        href="/login"
        className="self-start p-2 ml-4 mt-4 rounded-full hover:bg-gray-100"
      >
        <MoveLeft strokeWidth={1.5} className="" />
      </Link>
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="lg:text-center">
          Yêu cầu đặt lại mật khẩu
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[370px] lg:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* email */}
            <div className="grid gap-1 py-2">
              <Label htmlFor="email-login">Email</Label>
              <Input
                id="email-login"
                type="email"
                placeholder="vantruong@gmail.com"
                {...register("email")}
                className={cn({
                  "focus-visible:ring-red-500": errors.email,
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button className="text-base">Yêu cầu đặt lại mật khẩu</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
