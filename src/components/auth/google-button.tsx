"use client";
import { GoogleLogo } from "./google-logo";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  return (
    <button
      className="flex w-full justify-center items-center gap-5 rounded bg-white py-4 lg:px-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
      onClick={() => signIn("google")}
    >
      <GoogleLogo />
      <span className="text-sm lg:text-base">Tiếp tục với Google</span>
    </button>
  );
};

export default GoogleButton;
