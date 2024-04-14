import { z } from "zod";

export const UpdateProductShema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên sản phẩm" }).max(100),
  price: z.coerce
    .number()
    .min(10000, { message: "Giá sản phẩm phải lớn hơn 10.000đ" }),
  material: z.string().max(50),
  style: z.string().max(50),
  imageUrl: z.string().min(1, { message: "Thêm ảnh sản phẩm" }),
  stock: z.coerce
    .number()
    .min(1, { message: "Số lượng sản phẩm phải lớn hơn 0." }),
  category: z.coerce.number(z.string()).min(1, "Chọn danh mục cho sản phẩm"),
});

export type UpdateProductShemaType = z.TypeOf<typeof UpdateProductShema>;
