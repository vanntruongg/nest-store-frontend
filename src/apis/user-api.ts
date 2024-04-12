import httpClient from "~/common/http-client";
import { IUpdateUser } from "~/common/model/user.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const userApi = {
  getProfile: (accessToken: string) =>
    httpClient.get<any>(EndpointUtil.NEST.USER.GET_PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getAllUser: () => httpClient.get<any>(EndpointUtil.NEST.USER.GET_ALL),
  updateUser: (data: IUpdateUser) =>
    httpClient.post<any>(EndpointUtil.NEST.USER.UPDATE_USER, data),
  deleteUser: (email: string) =>
    httpClient.post<any>(EndpointUtil.NEST.USER.DELETE_USER + `/${email}`),
};

export default userApi;
