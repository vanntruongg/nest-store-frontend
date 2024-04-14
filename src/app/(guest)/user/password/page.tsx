"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
import { Label } from "~/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface ResetPassword {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
  [key: string]: boolean;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const form = useForm<TChangePasswordShema>({
    resolver: zodResolver(ChangePasswordShema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState<ResetPassword>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [passwords, setPasswords] = useState<IChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggle = (key: string) => {
    setShowPassword((preValue) => ({
      ...preValue,
      [key]: !preValue[key],
    }));
  };

  const onSubmit = async () => {
    try {
      const result = await userApi.changePassword(
        passwords.oldPassword,
        passwords.newPassword
      );
      toast({ description: result.payload.message });
      router.push("/user/profile");
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
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
        {/* <form action="" className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-40">Mật khẩu cũ</Label>
            <PasswordToggle
              type="oldPassword"
              password={passwords.oldPassword}
              setPasswords={setPasswords}
              showPassword={showPassword.oldPassword}
              onClick={() => handleToggle("oldPassword")}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-40">Mật khẩu mới</Label>
            <PasswordToggle
              type="newPassword"
              password={passwords.newPassword}
              setPasswords={setPasswords}
              showPassword={showPassword.newPassword}
              onClick={() => handleToggle("newPassword")}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-40">Xác nhận mật khẩu</Label>
            <PasswordToggle
              type="confirmPassword"
              password={passwords.confirmPassword}
              setPasswords={setPasswords}
              showPassword={showPassword.confirmPassword}
              onClick={() => handleToggle("confirmPassword")}
            />
          </div>

          <Button
            className="ml-[138px] self-start"
            onClick={handleChangePassword}
          >
            Lưu
          </Button>
        </form> */}
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

interface PasswordToggleProps {
  password: string;
  type: string;
  setPasswords: Dispatch<SetStateAction<IChangePasswordRequest>>;
  showPassword: boolean;
  onClick: (show: boolean) => void;
}

const PasswordToggle = ({
  password,
  type,
  setPasswords,
  showPassword,
  onClick,
}: PasswordToggleProps) => {
  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setPasswords((prevPasswords: IChangePasswordRequest) => ({
      ...prevPasswords,
      [type]: event.target.value,
    }));
  };

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => handlePasswordChange(e, type)}
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
        {showPassword ? (
          <Eye
            className="size-4 text-muted-foreground"
            onClick={() => onClick(false)}
          />
        ) : (
          <EyeOff
            className="size-4 text-muted-foreground"
            onClick={() => onClick(true)}
          />
        )}
      </div>
    </div>
  );
};
