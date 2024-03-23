"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Breadrumbs from "~/components/breadrumbs";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { v4 as uuid } from "uuid";
import Products from "~/components/product/product-listing";

const BREADRUMBS = [
  {
    id: 1,
    name: "Trang chủ",
    href: "/",
  },
];

const products: Product[] = [
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
  },
  {
    id: uuid(),
    name: "Áo sơ mi",
    price: 279000,
    category: "Áo",
    description:
      "Regular fit, round neckline, long sleeves. 100% cotton, brushed inner side for extra comfort.",
    image:
      "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=828&q=75",
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
        <Products products={products} />
      </MaxWidthWrapper>
    </div>
  );
};

export default Search;
