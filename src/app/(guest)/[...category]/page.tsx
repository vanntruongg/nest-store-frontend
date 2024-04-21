"use client";
import Breadrumbs from "~/components/breadrumbs";
import ProductListing from "~/app/(guest)/shop/product-listing";

const ProductByCateogoryPage = ({
  params,
}: {
  params: { category: string[] };
}) => {
  const [category, id] = params.category;
  const categoryName = localStorage.getItem("category") || "";
  const BREADRUMBS = [
    {
      id: 1,
      name: "Sản phẩm",
      href: "/shop",
    },
    {
      id: 2,
      name: categoryName,
      href: `/${category}/${id}`,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <ProductListing categoryId={parseInt(id)} />
    </div>
  );
};

export default ProductByCateogoryPage;
