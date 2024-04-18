"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  ResetPasswordShema,
  TResetPasswordShema,
} from "~/app/schema-validations/auth.shema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import authApi from "~/apis/auth-api";
import { BaseUtil } from "~/common/utility/base.util";
import { toast } from "~/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import Loading from "~/components/loading";
import { useRouter } from "next/navigation";
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const ResetPassword = ({ searchParams }: PageProps) => {
  const token = searchParams.token ? searchParams.token : "";
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<TResetPasswordShema>({
    resolver: zodResolver(ResetPasswordShema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({ password }: TResetPasswordShema) => {
    setLoading(true);
    try {
      if (token && typeof token === "string") {
        const result = await authApi.resetPassword({
          token,
          newPassword: password,
        });
        toast({ description: result.payload.message });
      }
      router.push("/login");
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative my-10 flex flex-col lg:items-center justify-start lg:px-0 max-w-xl mx-auto min-h-screen">
      {loading && <Loading />}
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="lg:text-center">
          Yêu cầu đặt lại mật khẩu
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[370px] lg:p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhân mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Lưu thay đổi
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
