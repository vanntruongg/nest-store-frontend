interface IUserAuth {
  email: string;
  password: string;
}

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface IBaseAuthToken {
  sub: string;
  iat: number;
  exp: number | 0;
}

interface IJWTDecoded {
  sub: string;
  email: string;
  roles: TROLE[];
  iat: number;
  exp: number;
}

interface ITokenStorage {
  decodedAccessToken: IBaseAuthToken;
  decodedRefreshToken: IBaseAuthToken;
  rawToken: IAuthResponse;
}

interface ResetPassword {
  token: string;
  newPassword: string;
}

export type TROLE = "ROLE_ADMIN" | "ROLE_USER";

export type {
  IJWTDecoded,
  IUserAuth,
  IAuthResponse,
  IBaseAuthToken,
  ITokenStorage,
  ResetPassword,
};
