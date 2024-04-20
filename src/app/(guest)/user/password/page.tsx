"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import userApi from "~/apis/user-api";
import {
  ChangePasswordShema,
  TChangePasswordShema,
} from "~/app/schema-validations/auth.shema";
import { IChangePasswordRequest } from "~/common/model/user.model";
import { BaseUtil } from "~/common/utility/base.util";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const ChangePasswordPage = () => {
  const router = useRouter();
  const form = useForm<TChangePasswordShema>({
    resolver: zodResolver(ChangePasswordShema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: IChangePasswordRequest) => {
    try {
      const result = await userApi.changePassword(
        data.oldPassword,
        data.newPassword
      );
      toast({ description: result.payload.message });
      router.push("/user/profile");
    } catch (error) {
      BaseUtil.handleErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4 bg-white rounded-sm">
      <div className="border-b pb-4">
        <h1 className="text-xl font-medium">Đổi mật khẩu</h1>
        <p className="text-base text-muted-foreground">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <div className="max-w-2xl min-w-[600px] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="col-span-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu cũ:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới:</FormLabel>
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
                  <FormLabel>Xác nhận mật khẩu:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button onClick={form.handleSubmit(onSubmit)}>Lưu thay đổi</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
