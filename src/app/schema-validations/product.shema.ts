import { nan, z } from "zod";

const CategorySchema = z.object({
  id: z.number().min(1, { message: "Chọn danh mục sản phẩm" }),
  name: z.string().min(1, { message: "Chọn danh mục sản phẩm" }),
});

export const ProductShema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập tên sản phẩm" }).max(100),
  price: z.coerce
    .number()
    .min(10000, { message: "Giá sản phẩm phải lớn hơn 10.000đ" })
    .refine((price) => !isNaN(price), {
      message: "Giá sản phẩm phải lớn hơn 10.000đ",
    })
    .default(0),
  material: z.string().max(50),
  style: z.string().max(50),
  imageUrl: z.string().min(1, { message: "Thêm ảnh sản phẩm" }),
  stock: z.coerce
    .number()
    .min(1, { message: "Số lượng sản phẩm phải lớn hơn 0." })
    .default(0),
  category: CategorySchema,
});

export type ProductShemaType = z.TypeOf<typeof ProductShema>;
