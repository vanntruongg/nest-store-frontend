"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import MenuDropDown from "~/components/menu-dropdown";
import { navLinks } from "~/static";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex gap-8 items-center lg:justify-start">
      {navLinks.map((link, idx) =>
        link?.href ? (
          <div key={idx} className="text-sm font-bold px-1 relative group">
            {pathname === link.href ? (
              <div className="text-primary uppercase leading-none">
                {link.label}
              </div>
            ) : (
              <Link
                href={link.href}
                className="text-gray-900 uppercase leading-none transition duration-100 hover:text-primary"
              >
                {link.label}
              </Link>
            )}
          </div>
        ) : (
          <MenuDropDown key={idx} itemNav={link} />
        )
      )}
      {/* <NavItems /> */}
    </nav>
  );
};

export default NavBar;
