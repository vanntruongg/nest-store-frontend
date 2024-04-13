"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { IUser } from "~/common/model/user.model";
import { ERole, EUserStatus } from "~/common/utility/enum.util";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

interface IViewUserDetailProps {
  user: IUser;
}

export function ViewUserDetail({ user }: IViewUserDetailProps) {
  // console.log(user);

  return (
    <Dialog>
      <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
        <div className="w-full text-sm cursor-pointer">Xem chi tiết</div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[525px]"
      >
        <DialogHeader className="">
          <DialogTitle>Thông tin chi tiết</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-6 border-t border-b">
          <div className="flex gap-2">
            <div className="relative aspect-square h-16 min-w-fit overflow-hidden rounded cursor-pointer">
              <Image
                src={user.imageUrl || "/assets/avatar-default.png"}
                alt={"avatar"}
                fill
                sizes="full"
                className="absolute object-cover"
              />
            </div>
            <div className="">
              <h2 className="font-semibold">{`${user.lastName} ${user.firstName}`}</h2>
              <p className="text-sm text-muted-foreground">
                {(EUserStatus as { [key: string]: string })[user.status]}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-2">
              <Mail strokeWidth={1.5} size={18} />
              <p>{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Phone strokeWidth={1.5} size={18} />
              <p>{user.phone || "..."}</p>
            </div>
            <div className="flex gap-2">
              <MapPin strokeWidth={1.5} size={18} />
              <p>{user.address || "..."}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <p>Vai trò:</p>
            <div className="flex gap-2">
              {user.roles.map((role) => (
                <div
                  key={role}
                  className={cn("p-1 rounded-sm border", {
                    "bg-primary text-white":
                      (ERole as { [key: string]: string })[role] ==
                      ERole.ROLE_ADMIN,
                  })}
                >
                  {(ERole as { [key: string]: string })[role]}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
