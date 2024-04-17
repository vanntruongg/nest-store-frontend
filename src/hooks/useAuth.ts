import { jwtDecode } from "jwt-decode";
import { IJWTDecoded } from "~/common/model/auth.model";
import { tokenStorage } from "~/common/utility/auth.util";
import { UserRole } from "~/common/utility/enum.util";

export const useAuth = () => {
  const tokenDecoded: IJWTDecoded = jwtDecode(
    tokenStorage.value.rawToken.accessToken
  );

  const isAdmin = () => {
    return tokenDecoded.roles.includes(UserRole.ADMIN);
  };

  return { isAdmin };
};
