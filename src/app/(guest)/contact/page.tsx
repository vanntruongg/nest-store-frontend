import { Mail, MapPin } from "lucide-react";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const ContactPage = () => {
  return (
    <MaxWidthWrapper className="py-8">
      <div className="p-8 flex gap-16 bg-white">
        <div className="text-nowrap">
          <h2 className="text-base font-semibold mb-6 uppercase">
            Thông tin cửa hàng
          </h2>
          <div className="divide-y font-light text-sm">
            <div className="flex items-center gap-8 p-4">
              <MapPin className="size-4" strokeWidth={1.5} />
              <a
                href="https://www.google.com/maps/place/An+Kh%C3%A1nh,+Ninh+Ki%E1%BB%81u,+C%E1%BA%A7n+Th%C6%A1,+Vi%E1%BB%87t+Nam/@10.0313413,105.7359566,14z/data=!3m1!4b1!4m6!3m5!1s0x31a0884058545ff1:0x80a6cc1bae8e11b6!8m2!3d10.0311846!4d105.7556564!16s%2Fg%2F1thp5hf5?hl=vi-VN&entry=ttu"
                target="_blank"
              >
                An Khánh, Ninh Kiều, Cần Thơ
              </a>
            </div>
            <div className="flex items-center gap-8 p-4">
              <Mail className="size-4" strokeWidth={1.5} />
              <a href="mailto:vt.ctu@gmail.com" className="">
                vt.ctu@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="w-full p-8 border shadow">
          <h1 className="text-lg text-primary font-semibold uppercase">
            Liên hệ với chúng tôi
          </h1>
          <div className="p-8">
            <form action="" className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="fullName" className="min-w-20">
                  Họ tên
                </Label>
                <Input id="fullName" placeholder="Trần Văn Trường" required />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="email" className="min-w-20">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vantruong@gmail.com"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Label htmlFor="message" className="min-w-20 mt-4">
                  Nội dung
                </Label>
                <Textarea
                  id="message"
                  placeholder="Bạn cần hỗ trợ vấn đề gì?"
                  required
                />
              </div>

              <Button className="self-end">Gửi</Button>
            </form>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ContactPage;
