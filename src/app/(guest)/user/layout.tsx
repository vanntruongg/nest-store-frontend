import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import NavProfile from "~/components/nav-profile";

export const metadata: Metadata = {
  title: "NEST | Tài khoản",
  description: "Quản lý tài khoản",
};

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="my-6 grid grid-cols-10 pt-8 gap-4 items-stretch">
      <div className="col-span-3 ">
        <div className="bg-white rounded-sm p-4 flex flex-col items-center">
          <div className="bg-white  p-1 rounded-sm -translate-y-12">
            <Image
              src={
                "https://demos.themeselection.com/sneat-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
              }
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
          <div className="-translate-y-8">
            <h3 className="text-2xl text-muted-foreground">Trần Văn Trường</h3>
          </div>
          <NavProfile />
        </div>
      </div>
      <div className="col-span-7">{children}</div>
    </MaxWidthWrapper>
  );
}
