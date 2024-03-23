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

interface ITokenStorage {
  decodedAccessToken: IBaseAuthToken;
  decodedRefreshToken: IBaseAuthToken;
  rawToken: IAuthResponse;
}

export type { IUserAuth, IAuthResponse, IBaseAuthToken, ITokenStorage };
