import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";

const RegisterPage = () => {
  return (
    <Card className="relative flex flex-col lg:items-center justify-center lg:px-0 max-w-xl mx-auto">
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="lg:text-center">Đăng ký</CardTitle>
        <CardDescription className="italic">
          Đăng ký tài khoản mới
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto w-full flex flex-col justify-center space-y-6 sm:w-[370px] lg:p-5">
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 text-sm">
          <p>Bạn đã có tài khoản?</p>
          <Link href="/login" className="float-end text-primary">
            Đăng nhập
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;
