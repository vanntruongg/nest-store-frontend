import z from "zod";

export const RegisterShema = z
  .object({
    firstName: z.string().min(1, { message: "Vui lòng nhập tên" }).max(20),
    lastName: z.string().min(1, { message: "Vui lòng nhập họ" }).max(20),
    email: z
      .string()
      .min(1, { message: "Vui lòng nhập email" })
      .email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(50),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu" }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterShemaType = z.TypeOf<typeof RegisterShema>;

export const RegisterRes = z.object({});

export const LoginShema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không hợp lệ" }),
  password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }).max(50),
});

export type LoginShemaType = z.infer<typeof LoginShema>;

// forgot password
export const ForgotPasswordShema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email." })
    .email({ message: "Email không hợp lệ" }),
});
export type TForgotPasswordShema = z.infer<typeof ForgotPasswordShema>;

// reset password
export const ResetPasswordShema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Vui lòng xác nhận mật khẩu" }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });
export type TResetPasswordShema = z.infer<typeof ResetPasswordShema>;

// verify email
export const VerifyEmail = z.object({
  token: z.string(),
});
export type TVerifyEmail = z.infer<typeof VerifyEmail>;

// change password
export const ChangePasswordShema = z
  .object({
    oldPassword: z.string().min(1, { message: "Mật khẩu cũ là bắt buộc" }),
    newPassword: z.string().min(1, { message: "Mật khẩu mới là bắt buộc" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Xác nhận mật khẩu là bắt buộc" }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Xác nhận mật khẩu không khớp",
      });
    }
  });
export type TChangePasswordShema = z.infer<typeof ChangePasswordShema>;

// update user
export const UpdateUserShema = z.object({
  firstName: z.string().min(1, { message: "Vui lòng nhập tên" }).max(20),
  lastName: z.string().min(1, { message: "Vui lòng nhập họ" }).max(20),
  phone: z.string().max(50),
  address: z.string(),
  imageUrl: z.string(),
  roles: z.array(z.string()).min(1, "Chọn ít nhất 1 vai trò"),
});

export type UpdateUserShemaType = z.TypeOf<typeof UpdateUserShema>;
