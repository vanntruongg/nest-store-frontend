import MaxWidthWrapper from "~/components/max-width-wrapper";
import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/components/product/product-listing";
import Category from "~/components/category";

const BREADRUMBS = [
  {
    id: 1,
    name: "Sản phẩm",
    href: "/shop",
  },
];

const ShopPage = async () => {
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <MaxWidthWrapper className="">
        <Category />
      </MaxWidthWrapper>
      <ProductListing />
    </div>
  );
};

export default ShopPage;
