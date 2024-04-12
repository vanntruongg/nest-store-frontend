"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginShema,
  LoginShemaType,
} from "~/app/schema-validations/auth.shema";

import { useUser } from "~/hooks/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Loading from "~/components/loading";
import authApi from "~/apis/auth-api";
import userApi from "~/apis/user-api";
import { cn } from "~/lib/utils";
import { useToast } from "~/components/ui/use-toast";
import { BaseUtil } from "~/common/utility/base.util";
import { tokenStorage } from "~/common/utility/auth.util";
import { jwtDecode } from "jwt-decode";
import { IJWTDecoded } from "~/common/model/auth.model";
import { ERole, UserRole } from "~/common/utility/enum.util";
// import { clientAuthToken } from "~/lib/http";

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginShemaType>({
    resolver: zodResolver(LoginShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (loginShema: LoginShemaType) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApi.login(loginShema);

      if (result.payload.success) {
        // call api to next server to set token to cookie
        toast({
          description: result.payload.message,
          variant: "default",
        });

        await authApi.auth(result.payload.data);

        const tokenDecoded: IJWTDecoded = jwtDecode(
          tokenStorage.value.rawToken.accessToken
        );
        if (tokenDecoded.roles.includes(UserRole.ADMIN)) {
          router.push("/dashboard/statistic");
        } else {
          router.back();
        }
        fetchProfile();
      }
    } catch (error: any) {
      BaseUtil.handleErrorApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  // call api get user profile and save to zustand
  const fetchProfile = async () => {
    try {
      const res = await userApi.getProfile(
        tokenStorage.value.rawToken.accessToken
      );
      setUser(res.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Vd: vantruong@gmail.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mật khẩu của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>

          <Link
            href={"/forgot-password"}
            className="text-xs text-blue-500 float-end hover:text-blue-600"
          >
            Quên mật khẩu?
          </Link>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
