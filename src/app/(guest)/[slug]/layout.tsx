import { ReactNode } from "react";
import productApi from "~/apis/produc-api";
import { Product } from "~/common/model/product.model";
import { ProductUtil } from "~/common/utility/product.util";
// export const metadata: Metadata = {
//   title: "[Tên sản phẩm]",
//   description:
//     "Khám phá chi tiết sản phẩm [Tên sản phẩm] từ NEST Store. Hãy tìm hiểu thêm về đặc điểm, mô tả, và giá của sản phẩm để có quyết định mua hàng chính xác!",
// };

interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: Props) {
  // const productId = ProductUtil.extractProductIdFromSlug(params.slug);

  // const result = await productApi.getProductById(productId);
  // const product: Product = result.payload.data.product;

  return {
    title: "Chi tiết sản phẩm",
    description: `Khám phá chi tiết sản phẩm từ NEST Store. Hãy tìm hiểu thêm về đặc điểm, mô tả, và giá của sản phẩm để có quyết định mua hàng chính xác!`,
  };
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
