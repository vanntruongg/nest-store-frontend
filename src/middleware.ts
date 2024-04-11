import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IJWTDecoded } from "./common/model/auth.model";
import { ERole, UserRole } from "./common/utility/enum.util";

const authPaths = ["/login", "/register"];
const privatePaths = [
  // "/user/profile",
  // "/user/password",
  // "/user/purchase",
  "/cart",
  "/checkout",
];

const adminPaths = [
  "/dashboard/users",
  "/dashboard/statistic",
  "/dashboard/orders",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  // check private path
  if (privatePaths.some((path) => pathname.startsWith(path) && !accessToken)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // check admin path
  if (adminPaths.some((path) => pathname.startsWith(path))) {
    if (accessToken) {
      const tokenDecoded: IJWTDecoded = jwtDecode(accessToken);
      if (tokenDecoded.roles.includes(UserRole.ADMIN)) {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if logged in, the login and registration page will not be allowed
  if (authPaths.some((path) => pathname.startsWith(path) && accessToken)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/register",
    "/user/profile",
    "/user/password",
    "/user/purchase",
    "/cart",
    "/checkout",
    "/dashboard/users",
    "/dashboard/statistic",
    "/dashboard/orders",
  ],
};
