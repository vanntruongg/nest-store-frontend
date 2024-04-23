import Link from "next/link";
import Image from "next/image";

import NavBar from "./navbar";
import Search from "../app/(guest)/search/search";
import Logo from "../../public/assets/nest-logo-tranparent.png";
import NavUser from "./nav-user";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileNav from "./mobile-nav";
import { ShoppingCart } from "lucide-react";
import Wishlist from "./wishlist";
import Cart from "./cart";

const Header = () => {
  return (
    <header className="fixed top-0 min-w-[1280px] px-1 backdrop-blur-lg z-30 max-h-80">
      <div className="bg-gray-100 py-1 h-5">
        <MaxWidthWrapper>
          <div className="flex items-center w-full text-[10px] uppercase">
            <a
              href="tel:+035778899"
              className="pr-4 border-r border-gray-500 hover:text-primary"
            >
              <p>Phone: 035778899</p>
            </a>
            <a
              href="mailto:vantruong.ct263ctu@gmail.com"
              className="px-4 hover:text-primary"
            >
              <p> Email: vantruong.ct263ctu@gmail.com</p>
            </a>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <div className="flex justify-between items-center lg:grid lg:grid-cols-11">
          <div className="lg:col-span-5 relative hidden lg:flex ">
            <NavBar />
          </div>
          <div className="flex items-center gap-4 justify-start lg:justify-center lg:col-span-1 overflow-hidden scale-125">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <Link href="/" className="">
              <Image
                src={Logo}
                alt="logo shop"
                className="size-14 scale-[2]"
                priority
              />
            </Link>
          </div>
          <div className="lg:col-span-5 flex justify-end items-center gap-2  flex-1">
            <Search />
            <Wishlist />
            <Cart />
            <NavUser />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
