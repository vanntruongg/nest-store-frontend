import {
  LoginShemaType,
  RegisterShemaType,
} from "~/app/schema-validations/auth.shema";
import httpClient from "~/common/http-client";
import { IAuthResponse } from "~/common/model/auth.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const authApi = {
  login: (loginPayload: LoginShemaType) => {
    return httpClient.post<any>(EndpointUtil.NEST.AUTH.LOGIN, loginPayload);
  },
  register: (signUpPayload: Omit<RegisterShemaType, "confirmPassword">) => {
    return httpClient.post<any>(EndpointUtil.NEST.AUTH.REGISTER, signUpPayload);
  },
  auth: (body: IAuthResponse) => {
    return httpClient.post(EndpointUtil.NEST.AUTH.SERVER.AUTH, body, {
      baseUrl: "",
    });
  },
  logoutFromNextServer: (accessToken: string) => {
    return httpClient.post<any>(
      EndpointUtil.NEST.AUTH.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  logoutFromNextClientToNextServer: (force?: boolean | undefined) => {
    return httpClient.post<any>(
      EndpointUtil.NEST.AUTH.SERVER.LOGOUT,
      {
        force,
      },
      { baseUrl: "" }
    );
  },

  refreshToken(refreshToken: string) {
    return httpClient.post(EndpointUtil.NEST.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });
  },
};

export default authApi;
