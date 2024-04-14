import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const productApi = {
  getAll: () => httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_ALL),
  getList: (category: number, order: string, page: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_LIST +
        `?category=${category}&order=${order}&page=${page}`
    ),
  getProductById: (productId: number) =>
    httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_BY_ID + `/${productId}`),
  getStockById: (productId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_STOCK_BY_ID + `/${productId}`
    ),
  getProductByName: (name: string, limit: number = 10) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_BY_NAME + `?name=${name}&limit=${limit}`
    ),
  getCategory: () =>
    httpClient.get<any>(EndpointUtil.NEST.PRODUCT.GET_ALL_CATEGORY),
  getAllSubCategory: (categoryId: string) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_ALL_SUBCATEGORY + `/${categoryId}`
    ),
};

export default productApi;
