import MaxWidthWrapper from "../max-width-wrapper";
import Image from "next/image";
import CategoryMen from "../../../public/assets/category-man.jpg";
import CategoryWomen from "../../../public/assets/category-women.jpg";
import Link from "next/link";

const categories = [
  {
    id: 1,
    category: "Thời Trang Nam",
    image: CategoryMen,
  },
  {
    id: 2,
    category: "Thời Trang Nữ",
    image: CategoryWomen,
  },
];
const ExploreCategory = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center justify-center gap-12 px-8 py-16">
        <h2 className="text-3xl font-semibold">Danh mục sản phẩm.</h2>

        <div className="mx-auto size-full flex flex-col md:flex-row lg:flex-row gap-4">
          {categories.map((categories) => (
            <div
              key={categories.id}
              className="mx-auto relative group overflow-hidden"
            >
              <Image
                src={categories.image}
                alt={`category-${categories.category}`}
                className="group-hover:scale-110 transition-all duration-300"
              />
              <p className="absolute top-5 left-5 text-2xl font-bold group-hover:text-primary transition-all duration-300">
                {categories.category}
              </p>
              <Link
                href={"/shop"}
                className="absolute bottom-5 left-5 px-6 py-3 font-medium border hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Mua ngay
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ExploreCategory;
