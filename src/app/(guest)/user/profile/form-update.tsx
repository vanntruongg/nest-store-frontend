"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import userApi from "~/apis/user-api";
import {
  UpdateUserWithoutRoleShema,
  UpdateUserWithoutShemaType,
} from "~/app/schema-validations/auth.shema";
import { FileWithPreview } from "~/common/model/file.model";
import { IUpdateUser } from "~/common/model/user.model";
import { BaseUtil } from "~/common/utility/base.util";
import { CloudinaryUtil } from "~/common/utility/cloudinary.util";
import IconTextLoading from "~/components/icon-text-loading";
import Loading from "~/components/loading";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { useUser } from "~/hooks/useUser";

export function FormUpdateUser() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState(user.imageUrl || "");
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );

  const form = useForm<UpdateUserWithoutShemaType>({
    resolver: zodResolver(UpdateUserWithoutRoleShema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      address: user.address || "",
      imageUrl: user.imageUrl || "",
    },
  });

  const handlePerviewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FileWithPreview;

    if (file) {
      setImageSelected(file);
      file.preview = URL.createObjectURL(file);
      setAvatarPreview(file.preview);
    }
  };

  const onSubmit = async (data: UpdateUserWithoutShemaType) => {
    try {
      if (!BaseUtil.checkPhoneAndSetErrorForm(data.phone, form.setError)) {
        return;
      }
      if (imageSelected) {
        data.imageUrl = await CloudinaryUtil.handleUploadImage(
          imageSelected,
          avatarPreview
        );
      }

      const dataUpdate: IUpdateUser = {
        email: user.email,
        ...data,
      };

      const result = await userApi.updateUser(dataUpdate);
      setUser(result.payload.data);
      toast({ description: result.payload.message });
      setOpen(false);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {loading && <Loading />}
      <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
        <Button variant={"outline"} onClick={() => setOpen(true)}>
          Cập nhật hồ sơ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Cập nhật tài khoản người dùng</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 space-x-16">
          <div className="col-span-2 flex flex-col space-y-4">
            <div className="bg-muted mx-auto w-1/2 bg-gray-100 aspect-square relative">
              <Image
                src={
                  avatarPreview ? avatarPreview : "/assets/avatar-default.png"
                }
                alt="Avatar"
                fill
                sizes="100"
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <input
                id="chooseAvatar"
                type="file"
                accept="png, jpeg"
                onChange={handlePerviewAvatar}
                className="border sr-only"
              />
              <label
                htmlFor="chooseAvatar"
                className="mt-8 mb-4 cursor-pointer"
              >
                <span className="px-4 py-1 border border-gray-500 rounded-full">
                  Chọn ảnh
                </span>
              </label>
              <span className="text-xs text-gray-500">
                Định dạng: PNG, JPEG
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="col-span-4 space-y-4"
            >
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Vd: 0357 888 999"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          {loading ? (
            <Button variant={"outline"}>
              <IconTextLoading />
            </Button>
          ) : (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Lưu thay đổi
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
