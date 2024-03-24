const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ciseco-nextjs.vercel.app",
      },
      {
        hostname: "product.hstatic.net",
      },
      {
        hostname: "img.freepik.com",
      },
      {
        hostname: "demos.themeselection.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = {
  ...nextConfig,
};
