import CardProduct from "../product/card-product";
import MaxWidthWrapper from "../max-width-wrapper";

const FeaturedProduct = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center gap-12 px-8 py-16">
        {/* <h2 className="text-3xl font-semibold">Sản phẩm nổi bật.</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardProduct product={products} />
          <CardProduct product={products} />
          <CardProduct product={products} />
          <CardProduct product={products} />
        </div> */}
      </div>
    </MaxWidthWrapper>
  );
};

export default FeaturedProduct;
