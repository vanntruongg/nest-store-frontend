import ExploreCategory from "~/components/home/explore-product";
import ProductReel from "~/components/product/product-reel";
import Slider from "~/components/home/slider";
import Featured from "~/components/home/featured";
import FeaturedProduct from "~/components/home/featured-product";
import MaxWidthWrapper from "~/components/max-width-wrapper";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Slider />

      <MaxWidthWrapper>
        <h1 className="text-3xl">Thời Trang NEST Store</h1>
      </MaxWidthWrapper>
      <ProductReel href="/product" title="Brand new" />

      <Featured />

      <ExploreCategory />

      <FeaturedProduct />
    </div>
  );
}
