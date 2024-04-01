import { jwtDecode } from "jwt-decode";
import {
  IAuthResponse,
  IBaseAuthToken,
  ITokenStorage,
} from "../model/auth.model";

const initialBaseAuthToken: IBaseAuthToken = {
  sub: "",
  iat: 0,
  exp: 0,
};

class AuthToken {
  private tokenStorage: ITokenStorage = {
    decodedAccessToken: initialBaseAuthToken,
    decodedRefreshToken: initialBaseAuthToken,
    rawToken: {
      accessToken: "",
      refreshToken: "",
    },
  };

  get value(): ITokenStorage {
    return this.tokenStorage;
  }

  set value(authData: IAuthResponse) {
    if (typeof window === "undefined") {
      throw new Error("Can't set token on server side");
    }
    const decodedAT = jwtDecode<IBaseAuthToken>(authData.accessToken);
    const decodedRF = jwtDecode<IBaseAuthToken>(authData.refreshToken);
    this.tokenStorage = {
      decodedAccessToken: decodedAT,
      decodedRefreshToken: decodedRF,
      rawToken: authData,
    };
  }

  public clearToken() {
    this.tokenStorage = {
      decodedAccessToken: initialBaseAuthToken,
      decodedRefreshToken: initialBaseAuthToken,
      rawToken: {
        accessToken: "",
        refreshToken: "",
      },
    };
  }
}

export const tokenStorage = new AuthToken();
