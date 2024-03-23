"use client";
import { signIn } from "next-auth/react";
import { FacebookLogo } from "./facebook-logo";

const FacebookButton = () => {
  return (
    <button
      className="flex w-full justify-center items-center gap-5 rounded bg-white py-4 lg:px-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
      onClick={() => signIn("facebook")}
    >
      <FacebookLogo />
      <span className="text-sm lg:text-base">Tiếp tục với Facebook</span>
    </button>
  );
};

export default FacebookButton;
