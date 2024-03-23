import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import Logo from "../../public/assets/nest-logo-tranparent.png";
import Link from "next/link";

import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white flex-grow-0 pt-10">
      <div className="border-t border-gray-200">
        <div className="border-t border-gray-200">
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="logo shop"
              className="h-24 w-auto"
              priority
            />
          </div>
        </div>
        <div className="">
          <div className="relative flex items-center sm:py-8 lg:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div
                aria-hidden="true"
                className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90"
              ></div>
            </div>

            <MaxWidthWrapper>
              <div className="relative mx-auto">
                <div className="py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-x-4 gap-y-8 lg:gap-8">
                  <div className="lg:col-span-2 grid grid-rows-subgrid row-span-2 gap-0">
                    <h4 className="text-xs lg:text-sm font-semibold uppercase">
                      Về NEST
                    </h4>
                    <div className="mt-6 flex flex-col gap-4 text-muted-foreground text-xs lg:text-sm">
                      <div className="flex items-center gap-4 text-gray-500 hover:text-gray-900 cursor-pointer">
                        <div className="">
                          <MapPin className="size-4" />
                        </div>
                        <a
                          href="https://www.google.com/maps/place/An+Kh%C3%A1nh,+Ninh+Ki%E1%BB%81u,+C%E1%BA%A7n+Th%C6%A1,+Vi%E1%BB%87t+Nam/@10.0313413,105.7359566,14z/data=!3m1!4b1!4m6!3m5!1s0x31a0884058545ff1:0x80a6cc1bae8e11b6!8m2!3d10.0311846!4d105.7556564!16s%2Fg%2F1thp5hf5?hl=vi-VN&entry=ttu"
                          target="_blank"
                        >
                          An Khánh, Ninh Kiều, Cần Thơ
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 hover:text-gray-900 cursor-pointer">
                        <div className="">
                          <Mail className="size-4" />
                        </div>
                        <a href="mailto:vt.ctu@gmail.com" className="">
                          vt.ctu@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 hover:text-gray-900 cursor-pointer ">
                        <div className="">
                          <Phone className="size-4" />
                        </div>
                        <a href="tel:+8435778899" className="">
                          035778899
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 grid grid-rows-subgrid row-span-2 gap-0">
                    <h4 className="text-xs lg:text-sm font-semibold uppercase">
                      Hỗ trợ khách hàng
                    </h4>
                    <div className="mt-6 flex flex-col gap-4 text-muted-foreground text-xs lg:text-sm">
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Hướng dẫn mua hàng
                      </Link>
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Thanh toán
                      </Link>
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Vận chuyển
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-2 grid grid-rows-subgrid row-span-2 gap-0">
                    <h4 className="text-xs lg:text-sm font-semibold uppercase">
                      Chính sách
                    </h4>
                    <div className="mt-6 flex flex-col gap-4 text-muted-foreground text-xs lg:text-sm">
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Chính sách đổi trả
                      </Link>
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Chính sách bảo mật
                      </Link>
                      <Link
                        href={"#"}
                        className="text-gray-500 hover:text-gray-900 transition-all duration-100"
                      >
                        Điều khoản dịch vụ
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-3 col-span-2 grid grid-rows-subgrid row-span-2 gap-0">
                    <h4 className="text-xs lg:text-sm font-semibold uppercase">
                      Đăng ký nhận thông tin
                    </h4>
                    <div className="mt-6 flex flex-col gap-4 text-muted-foreground text-xs lg:text-sm">
                      <p className="italic">
                        Thông báo những cập nhật mới nhất về cửa hàng
                      </p>
                      <form>
                        <div className="flex justify-between gap-2">
                          <div className="flex-1 border-b-2 focus-within:border-primary">
                            <input
                              type="email"
                              placeholder="Email..."
                              className="p-2 w-full bg-transparent"
                              required
                            />
                          </div>
                          <div className="p-2 border-b-2 hover:text-primary hover:border-primary">
                            <button className="font-semibold">Đăng ký</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
      </div>

      <MaxWidthWrapper>
        <div className="py-10 lg:px-[108px] md:flex md:items-center md:justify-between border-t">
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center text-sm text-muted-foreground">
              Bản quyền &copy; {new Date().getFullYear()}
              {"  "}
              <span className="pl-2 text-black font-bold uppercase">nest</span>.
            </p>
            <p className="flex items-center justify-center text-sm text-muted-foreground">
              Được phát triển bởi Trần Văn Trường &hearts;
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0 ">
            <div className="flex space-x-8">
              <div className="text-sm text-muted-foreground hover:text-gray-600">
                VN Pay
              </div>

              <div className="text-sm text-muted-foreground hover:text-gray-600">
                COD
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
