import productApi from "~/apis/produc-api";
import { ProductUtil } from "~/common/utility/product.util";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import ProductDetail from "~/components/product/product-detail";
import ProductReel from "~/components/product/product-reel";

interface PageProps {
  params: {
    slug: string;
  };
}

// const BREADRUMBS = [
//   {
//     id: 1,
//     name: "Home",
//     href: "/",
//   },
//   {
//     id: 2,
//     name: "Products",
//     href: "/products",
//   },
// ];

const ProductDetailPage = async ({ params }: PageProps) => {
  const result = await productApi.getProductById(
    ProductUtil.extractProductIdFromSlug(params.slug)
  );
  // console.log(result);
  const category = result.payload.data.category.name;
  const productName = result.payload.data.name;

  return (
    <div className="bg-white">
      <ProductDetail product={result.payload.data} />

      <div className=""></div>
      <MaxWidthWrapper>
        <ProductReel
          href="/products"
          title={`Sản phẩm tương tự`}
          subtitle={`Các sản phẩm thuộc ${category} tương tự như '${productName}'`}
        />
      </MaxWidthWrapper>
    </div>
  );
};

export default ProductDetailPage;
