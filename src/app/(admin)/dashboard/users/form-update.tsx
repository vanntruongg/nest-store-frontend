"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import {
  UpdateUserShema,
  UpdateUserShemaType,
} from "~/app/schema-validations/auth.shema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import authApi from "~/apis/auth-api";
import { Checkbox } from "~/components/ui/checkbox";
import { IUser } from "~/common/model/user.model";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ERole, UserRole } from "~/common/utility/enum.util";
import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { FileWithPreview } from "~/common/model/file.model";

interface IFormUpdateUserProps {
  user: IUser;
}

export function FormUpdateUser({ user }: IFormUpdateUserProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState(user.imageUrl || "");
  const [imageSelected, setImageSelected] = useState<FileWithPreview | null>(
    null
  );
  const form = useForm<UpdateUserShemaType>({
    resolver: zodResolver(UpdateUserShema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || "",
      address: user.address || "",
      imageUrl: user.imageUrl || "",
      roles: user.roles,
    },
  });

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handlePerviewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as FileWithPreview;
    console.log(file);

    if (file) {
      setImageSelected(file);
      file.preview = URL.createObjectURL(file);
      setAvatarPreview(file.preview);
    }
  };

  const handleUploadImage = async (file: FileWithPreview) => {
    if (!imageSelected) {
      return avatarPreview;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wrzjwiuv");
    // formData.append("folder", "nest_store");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwq0fi0sc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.secure_url;
    } else {
      throw new Error("Failed to upload image");
    }
  };

  const onSubmit = async ({
    firstName,
    lastName,
    phone,
    address,
    imageUrl,
    roles,
  }: UpdateUserShemaType) => {
    setLoading(true);

    try {
      // const imgUrl = await handleUploadImage(imageSelected);
      // const result = await authApi.adminUpdateUser({
      //   firstName,
      //   lastName,
      //   phone,
      //   address,
      // imageUrl,
      //   roles,
      // });
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckRole = (checked: CheckedState, role: string, field: any) => {
    if (!checked) {
      const updatedValue = field.value.filter(
        (value: string) => value !== role
      );
      form.setValue(field.name, updatedValue);
    } else {
      field.value.push(role);
      form.setValue(field.name, field.value);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="p-1.5 rounded-sm hover:bg-gray-100">
        <div
          className="w-full text-sm cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Sửa
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Cập nhật tài khoản người dùng</DialogTitle>
          <Button
            onClick={() => imageSelected && handleUploadImage(imageSelected)}
          >
            upload
          </Button>
        </DialogHeader>
        <div className="grid grid-cols-6 space-x-16">
          <div className="col-span-2 flex flex-col space-y-4">
            <div className="bg-muted mx-auto w-1/2 bg-gray-100 aspect-square relative">
              <Image
                src={avatarPreview}
                alt="Avatar"
                fill
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
                      <Input placeholder="Vd: 0357 888 999" {...field} />
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
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => {
                  return (
                    <FormItem className="flex items-center space-x-2 ">
                      <FormLabel className=" leading-none">Vai trò:</FormLabel>
                      <FormControl className="h-full ">
                        <div className="flex items-center space-x-2 ">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={UserRole.ADMIN}
                              {...field}
                              checked={field.value.includes(UserRole.ADMIN)}
                              onCheckedChange={(e) =>
                                handleCheckRole(e, UserRole.ADMIN, field)
                              }
                              className=""
                            />
                            <Label
                              htmlFor={UserRole.ADMIN}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {ERole.ROLE_ADMIN}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={UserRole.USER}
                              {...field}
                              checked={field.value.includes(UserRole.USER)}
                              onCheckedChange={(e) =>
                                handleCheckRole(e, UserRole.USER, field)
                              }
                            />
                            <Label
                              htmlFor={UserRole.USER}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {ERole.ROLE_USER}
                            </Label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}