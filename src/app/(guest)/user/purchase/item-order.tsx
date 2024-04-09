import Image from "next/image";
import { IOrderDetail } from "~/common/model/order.model";
import { ProductUtil } from "~/common/utility/product.util";

interface ItemOrderProps {
  item: IOrderDetail;
}

const ItemOrder = ({ item }: ItemOrderProps) => {
  return (
    <div className="grid grid-cols-12 gap-2 py-4">
      <div className="col-span-2 relative size-24 ">
        <Image
          src={
            item.productImage ||
            "https://res.cloudinary.com/dwq0fi0sc/image/upload/v1707020101/nest_store/ezz4k2anmgy3plyskssn.jpg"
          }
          fill
          sizes="100"
          alt="product image"
          className="h-full w-full rounded-md object-cover object-center sm:size-48"
        />
      </div>
      <div className="col-span-8 flex flex-col justify-between">
        <p className="capitalize">{item.productName.toLowerCase()}</p>
        <span>x{item.quantity}</span>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <p> {ProductUtil.formatPrice(item.productPrice)}</p>
      </div>
    </div>
  );
};

export default ItemOrder;
