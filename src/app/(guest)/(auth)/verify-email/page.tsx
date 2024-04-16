"use client";
import { FormEvent, useState } from "react";

import authApi from "~/apis/auth-api";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";

const VerifyEmailPage = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSucess, setIsSuccess] = useState<boolean>(false);

  const handleRequestVerifyAccount = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authApi.requestVerifyEmail(email);
      toast({ description: result.payload.message });
      setIsSuccess(result.payload.success);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 className="text-2xl">Yêu cầu xác minh tài khoản.</h1>
        <form action="" onSubmit={(e) => handleRequestVerifyAccount(e)}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <IconTextLoading /> : "Yêu cầu xác minh tài khoản"}
            </Button>
          </div>
        </form>
        {isSucess && (
          <div>
            <span className="font-semibold">
              Yêu cầu xác minh tài khoản thành công.
            </span>
            <p className="text-lg text-primary">Vui lòng kiểm tra email.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
