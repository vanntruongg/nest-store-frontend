import CardProduct from "../product/card-product";
import MaxWidthWrapper from "../max-width-wrapper";
import { Product } from "~/common/model/product.model";

const products: Product = {
  id: "1",
  name: "Áo sơ mi",
  price: 279000,
  category: {
    id: 1,
    name: "Áo",
  },
  material:
    "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
  style: "",
  imageUrl:
    "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
};

const FeaturedProduct = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center gap-12 px-8 py-16">
        <h2 className="text-3xl font-semibold">Sản phẩm nổi bật.</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardProduct product={products} />
          <CardProduct product={products} />
          <CardProduct product={products} />
          <CardProduct product={products} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default FeaturedProduct;
