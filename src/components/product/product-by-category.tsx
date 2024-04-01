// "use client";
// import { useEffect, useState } from "react";
// import { Skeleton } from "../ui/skeleton";
// import Link from "next/link";
// import { cn } from "~/lib/utils";
// import { PRODUCT_CATEGORIES } from "~/static";
// import Image from "next/image";
// import { ProductUtil } from "~/common/utility/product.util";
// import { Product } from "~/common/model/product.model";

// interface ProductByCategoryProps {
//   product: Product;
//   index: number;
// }

// const ProductByCategory = ({ product, index }: ProductByCategoryProps) => {
//   const [isVisible, setIsVisible] = useState<boolean>(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//     }, index * 75);

//     return () => clearTimeout(timer);
//   }, [index]);

//   if (!product || !isVisible) return <ProductPlaceholder />;

//   const label = PRODUCT_CATEGORIES.find(
//     ({ value }) => value === product.category.name
//   )?.label;

//   if (product && isVisible) {
//     return (
//       <Link
//         href={`/${ProductUtil.createSlug(product.name, product.id)}`}
//         className={cn("invisible h-full w-full cursor-pointer group/main", {
//           "visible animate-in fade-in-5": isVisible,
//         })}
//       >
//         <div className="flex flex-col w-full">
//           <div className="aspect-square relative">
//             <Image
//               fill
//               sizes="100%"
//               loading="eager"
//               className="-z-10 h-full w-full object-center"
//               src={product.imageUrl}
//               alt="Product image"
//             />
//           </div>
//           <h3 className="mt-4 font-medium text-sm text-gray-700">
//             {product.name}
//           </h3>
//           <p className="mt-1 text-sm text-gray-500">{label}</p>
//           <p className="mt-1 font-semibold text-sm text-gray-900">
//             {ProductUtil.formatPrice(product.price)}
//           </p>
//         </div>
//       </Link>
//     );
//   }
// };

// const ProductPlaceholder = () => {
//   return (
//     <div className="flex flex-col w-full">
//       <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden">
//         <Skeleton className="h-full w-full" />
//       </div>
//       <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
//       <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
//       <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
//     </div>
//   );
// };

// export default ProductByCategory;
