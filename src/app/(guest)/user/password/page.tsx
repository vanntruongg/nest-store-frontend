"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface ResetPassword {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
  [key: string]: boolean;
}

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState<ResetPassword>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleToggle = (key: string) => {
    setShowPassword((preValue) => ({
      ...preValue,
      [key]: !preValue[key],
    }));
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
        <form action="" className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label className="w-40">Mật khẩu cũ</Label>
            <PasswordToggle
              showPassword={showPassword.oldPassword}
              onClick={() => handleToggle("oldPassword")}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-40">Mật khẩu mới</Label>
            <PasswordToggle
              showPassword={showPassword.newPassword}
              onClick={() => handleToggle("newPassword")}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="w-40">Xác nhận mật khẩu</Label>
            <PasswordToggle
              showPassword={showPassword.confirmPassword}
              onClick={() => handleToggle("confirmPassword")}
            />
          </div>

          <Button className="ml-[138px] self-start">Xác nhận</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

interface PasswordToggleProps {
  showPassword: boolean;
  onClick: (show: boolean) => void;
}

const PasswordToggle = ({ showPassword, onClick }: PasswordToggleProps) => {
  return (
    <div className="relative w-full">
      <Input type={showPassword ? "text" : "password"} />
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
