import Image from "next/image";
import NoData from "../../public/assets/no-data.png";
export interface IPurchaseProps {
  orders: [];
}

export function Purchase({ orders }: IPurchaseProps) {
  return (
    <div className="bg-white w-full h-full">
      {orders.length === 0 && (
        <div className="h-full flex flex-col justify-center items-center">
          <Image src={NoData} alt="no data" width={250} height={250} />
          <p className="text-lg">Chưa có đơn hàng</p>
        </div>
      )}
    </div>
  );
}
