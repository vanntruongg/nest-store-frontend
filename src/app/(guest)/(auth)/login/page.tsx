import GoogleButton from "~/components/auth/google-button";
import FacebookButton from "~/components/auth/facebook-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";
import { cookies } from "next/headers";

const Login = () => {
  return (
    <Card className="relative flex flex-col lg:items-center justify-center lg:px-0 max-w-xl mx-auto">
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="lg:text-center">Đăng nhập</CardTitle>
        <CardDescription className="italic">
          Vui lòng đăng nhập để tiếp tục.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[370px] lg:p-5">
        <LoginForm />
      </CardContent>
      <CardFooter className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[370px] lg:p-5">
        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-1/2 translate-y-[-50%] bg-gray-400 h-[1px]"
          ></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* OAuth2 */}
        <div className="flex flex-col gap-2 w-full">
          <GoogleButton />
          <FacebookButton />
        </div>

        <div className="flex gap-1 text-sm">
          <p>Bạn chưa có tài khoản?</p>
          <Link href="/register" className="float-end text-primary">
            Đăng ký
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
