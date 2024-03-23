// import * as React from "react";
// import { Category, Product } from "~/common/model/product.model";
// import { cn } from "~/lib/utils";
// import ListCategory from "./list-category";
// import CardProduct from "./card-product";

// export interface ProductsProps {
//   hasCategory: boolean | undefined;
//   categories?: Category[];
//   layout: LayoutProduct;
//   products: Product[];
// }

// const Products = ({ category, layout, products }: ProductsProps) => {
//   return (
//     <div className={cn("grid grid-cols-5 gap-8")}>
//       {category && (
//         <div
//           className={cn("w-full px-2", {
//             "flex flex-col": layout === "list",
//             "w-full flex flex-col gap-8": layout === "grid",
//           })}
//         >
//           <div className="flex flex-col gap-4 mt-6">
//             <ListCategory categories={categories} fontSize={17} />
//           </div>
//         </div>
//       )}
//       <div
//         className={cn("mt-6 col-span-5 ", {
//           "col-span-4": hasCategory,
//         })}
//       >
//         <div
//           className={cn("", {
//             "grid grid-cols-1 lg:grid-cols-5 gap-2 gap-y-8": layout === "grid",
//             "grid lg:grid-cols-4": layout === "grid" && hasCategory,
//             "grid grid-cols-2 gap-8": layout === "list",
//             "grid-cols-1": hasCategory,
//           })}
//         >
//           {products.map((product) => (
//             <CardProduct key={product.id} product={product} layout={layout} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
