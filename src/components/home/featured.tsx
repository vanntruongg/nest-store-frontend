import {
  Truck,
  PhoneOutgoing,
  CircleDollarSign,
  ShieldBan,
} from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";

const Featured = () => {
  return (
    <MaxWidthWrapper>
      <section className="py-20 border-t border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-5 flex flex-col items-center justify-center gap-2 border group">
            <div className="flex flex-col items-center gap-6">
              <Truck
                strokeWidth={1}
                size={28}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
              <p className="text-base font-semibold">Miễn phí vận chuyển</p>
            </div>
            <span className="text-sm text-muted-foreground">
              Phạm vi trên toàn quốc
            </span>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2 border group">
            <div className="flex flex-col items-center gap-6">
              <PhoneOutgoing
                strokeWidth={1}
                size={28}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
              <p className="text-base font-semibold">Sẵn sàng hỗ trợ</p>
            </div>
            <span className="text-sm text-muted-foreground">
              Hãy liên hệ với chúng tôi
            </span>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2 border group">
            <div className="flex flex-col items-center gap-6">
              <ShieldBan
                strokeWidth={1}
                size={28}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
              <p className="text-base font-semibold">An toàn thanh toán</p>
            </div>
            <span className="text-sm text-muted-foreground">
              Cổng thanh toán uy tín
            </span>
          </div>
          <div className="p-5 flex flex-col items-center justify-center gap-2 border group">
            <div className="flex flex-col items-center gap-6">
              <CircleDollarSign
                strokeWidth={1}
                size={28}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
              <p className="text-base font-semibold">Giá rẻ bật nhất</p>
            </div>
            <span className="text-sm text-muted-foreground">
              Siêu tiết kiệm & miễn phí giao hàng
            </span>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Featured;
