import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Product } from "~/common/model/product.model";
import { ProductUtil } from "~/common/utility/product.util";

interface ItemProductSearchProps {
  product: Product;
  setOpenDialog: (isOpen: boolean) => void;
}

const ItemProductSearch = ({
  product,
  setOpenDialog,
}: ItemProductSearchProps) => {
  const router = useRouter();

  const handleSelectProduct = () => {
    router.push(`/${ProductUtil.createSlug(product.name, product.id)}`);
    setOpenDialog(false);
  };

  return (
    <div
      className="p-1 flex gap-4 hover:bg-gray-100 rounded-sm transition-all duration-300 cursor-pointer"
      onClick={handleSelectProduct}
    >
      <div className="hover:bg-gray-200 rounded-full overflow-hidden transition-all duration-300">
        <Image
          src={product.imageUrl}
          alt={`image product ${product.id}`}
          width={50}
          height={50}
          className=""
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-sm text-gray-700 hover:text-gray-900">
          {product.name}
        </div>
        <p className="text-xs text-muted-foreground">{product.category.name}</p>
      </div>
    </div>
  );
};

export default ItemProductSearch;
