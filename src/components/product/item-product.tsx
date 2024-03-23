import Image from "next/image";
import Link from "next/link";
import React from "react";

const ItemProduct = () => {
  return (
    <div className="my-0.5 p-1 rounded-md hover:bg-gray-100">
      <Link href={"/"} className="flex items-center gap-4">
        <Image
          src={
            "https://ciseco-nextjs.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F5.addcba21.png&w=750&q=75"
          }
          alt="image-product"
          width={36}
          height={36}
          // priority
          className="bg-gray-100 rounded-md"
        />
        <p>Leather Gloves</p>
      </Link>
    </div>
  );
};

export default ItemProduct;
