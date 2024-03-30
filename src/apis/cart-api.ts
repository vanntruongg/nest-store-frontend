import httpClient from "~/common/http-client";
import { IAddRequest, IUpdateCartRequest } from "~/common/model/cart.model";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const cartApi = {
  getAll: (email: string) =>
    httpClient.get<any>(EndpointUtil.NEST.CART.GET_ALL + `?email=${email}`),
  add: (data: IAddRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.ADD, data),
  udpate: (data: IUpdateCartRequest) =>
    httpClient.post<any>(EndpointUtil.NEST.CART.UPDATE, data),
  remove: (email: string, productId: number) =>
    httpClient.post<any>(
      EndpointUtil.NEST.CART.REMOVE + `?email=${email}&id=${productId}`
    ),
};

export default cartApi;
