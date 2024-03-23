import Image from "next/image";
import Link from "next/link";
import { ProductUtil } from "~/common/utility/product.util";

const categories = [
  {
    id: 1,
    name: "Thời trang nam",
    image:
      "https://img.freepik.com/free-photo/non-binary-person-modern-clothes-posing-outdoors_23-2148760572.jpg?w=826&t=st=1706722366~exp=1706722966~hmac=6c19f24825f1a1e36cf351f5579f96d9e2379da9ca866b62a1546d20cf4d631f",
  },
  {
    id: 2,
    name: "Thời trang nữ",
    image:
      "https://img.freepik.com/free-photo/city-life-young-beautiful-girl-warm-clothes-have-walk-city-her-weekends-time_146671-16847.jpg?size=626&ext=jpg&ga=GA1.1.969645129.1706716916&semt=ais",
  },
  {
    id: 3,
    name: "Nam và nữ",
    image:
      "https://img.freepik.com/free-photo/young-japanese-couple_23-2148870761.jpg?w=740&t=st=1706723919~exp=1706724519~hmac=252ef3b432512966716e1fbfb44af0ae374fd45e7dc89f6e3d037db8c8add26b",
  },
];

const Category = () => {
  return (
    <div className="bg-white">
      <h3 className="p-4 text-base uppercase text-muted-foreground shadow">
        Danh mục
      </h3>
      <div className="flex justify-between items-center divide-x">
        {categories.map(({ id, name, image }) => (
          <Link
            key={id}
            href={ProductUtil.createSlugCategory(name, id)}
            className="w-full text-center p-6 capitalize hover:shadow-sm relative group"
          >
            <div className="w-1/3 mx-auto flex flex-col gap-2">
              <div className="aspect-square bg-gray-100 rounded-full overflow-hidden relative">
                <Image
                  fill
                  sizes="full"
                  src={image}
                  alt={`image category ${name}`}
                  className="bg-gray-50 group-hover:scale-110 transition duration-300"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={image}
                />
              </div>
              <p className="text-nowrap">{name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
