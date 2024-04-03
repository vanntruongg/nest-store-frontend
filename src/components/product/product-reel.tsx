import Link from "next/link";
// import ProductListing from "./product-by-category";
import { Product } from "~/common/model/product.model";
import MaxWidthWrapper from "../max-width-wrapper";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const products: Product[] = [];
const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href } = props;
  return (
    <MaxWidthWrapper>
      <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            {title ? (
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>

          {href ? (
            <Link
              href={href}
              className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block  "
            >
              Mua sắm theo danh mục <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>

        <div className="relative">
          <div className="mt-6 flex items-center w-full">
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {/* {products.map((product, idx) => (
                <ProductListing
                  key={product.id}
                  product={product}
                  index={idx}
                />
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default ProductReel;
