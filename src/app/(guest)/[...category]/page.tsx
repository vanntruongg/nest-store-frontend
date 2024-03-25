import { v4 as uuid } from "uuid";

import MaxWidthWrapper from "~/components/max-width-wrapper";

import Breadrumbs from "~/components/breadrumbs";
import Image from "next/image";
import ProductListing from "~/components/product/product-listing";
import productApi from "~/apis/produc-api";

const image =
  "https://img.freepik.com/free-photo/young-man-holding-skateboard-grayscale_53876-165437.jpg?size=626&ext=jpg&ga=GA1.1.217585446.1706792937&semt=ais";

const ProductByCateogoryPage = async ({
  params,
}: {
  params: { category: string[] };
}) => {
  const [category, id] = params.category;
  const BREADRUMBS = [
    {
      id: 1,
      name: "Trang chủ",
      href: "/",
    },
    {
      id: 2,
      name: "Sản phẩm",
      href: "/shop",
    },
    {
      id: 3,
      name: "Thời trang nam",
      href: `/${category}/${id}`,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs breadrumbs={BREADRUMBS} />
      <MaxWidthWrapper className="">
        <div className="bg-white ">
          <div className="w-full h-60 aspect-auto bg-purple-200 relative">
            <Image
              fill
              sizes="full"
              src={image}
              alt={`image category`}
              className="bg-gray-50 object-cover group-hover:scale-110 transition duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <ProductListing categoryId={id} />
    </div>
  );
};

export default ProductByCateogoryPage;
