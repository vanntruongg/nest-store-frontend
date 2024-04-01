import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";

const ProductByCateogoryPage = async ({
  params,
}: {
  params: { category: string[] };
}) => {
  const [category, id] = params.category;
  const BREADRUMBS = [
    {
      id: 1,
      name: "Sản phẩm",
      href: "/shop",
    },
    {
      id: 2,
      name: "Thời trang nam",
      href: `/${category}/${id}`,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <ProductListing categoryId={id} />
    </div>
  );
};

export default ProductByCateogoryPage;
