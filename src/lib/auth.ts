import { jwtDecode } from "jwt-decode";

export const verifyRefreshToken = (refreshToken: string) => {
  const decodedToken = jwtDecode(refreshToken);
  console.log(decodedToken);
};
