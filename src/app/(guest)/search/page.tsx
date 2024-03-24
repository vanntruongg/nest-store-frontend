"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Breadrumbs from "~/components/breadrumbs";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Product } from "~/common/model/product.model";

const BREADRUMBS = [
  {
    id: 1,
    name: "Trang chủ",
    href: "/",
  },
];

const Search = () => {
  const router = useRouter();
  // const [products, setProducts] = useState<Product[]>([]);
  const searchParam = useSearchParams();
  const searhValue = decodeURIComponent(searchParam.get("q") as string);

  // const { q } = router.query;
  return (
    <div className="flex flex-col gap-6">
      <Breadrumbs
        breadrumbs={BREADRUMBS}
        options={`Kết quả tìm kiếm cho "${searhValue}"`}
      />
      <MaxWidthWrapper className="">
        <div className=""></div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Search;
