"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterShema,
  RegisterShemaType,
} from "~/app/schema-validations/auth.shema";
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
import { useState } from "react";
import authApi from "~/apis/auth-api";
import { useRouter } from "next/navigation";
import Loading from "~/components/loading";
import { Toast } from "~/components/ui/toast";
import { BaseUtil } from "~/common/utility/base.util";

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<RegisterShemaType>({
    resolver: zodResolver(RegisterShema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterShemaType) => {
    setLoading(true);
    try {
      const result = await authApi.register({
        firstName,
        lastName,
        email,
        password,
      });

      if (result.payload.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      // BaseUtil.handleErrorApi({ error });
      // toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder="Vd: Trần" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Vd: Văn Trường" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
