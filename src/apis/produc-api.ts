import httpClient from "~/common/http-client";
import {
  Product,
  ProductCreate,
  ProductUpdate,
} from "~/common/model/product.model";
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
  getAllSubCategory: (categoryId: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.PRODUCT.GET_ALL_SUBCATEGORY + `/${categoryId}`
    ),
  createProduct: (createProductData: ProductCreate) =>
    httpClient.post<any>(
      EndpointUtil.NEST.PRODUCT.CREATE_PRODUCT,
      createProductData
    ),
  updateProduct: (updateProductData: ProductUpdate) =>
    httpClient.post<any>(
      EndpointUtil.NEST.PRODUCT.UPDATE_PRODUCT,
      updateProductData
    ),
  getProductCount: () =>
    httpClient.get<any>(EndpointUtil.NEST.PRODUCT.COUNT_PRODUCT),
};

export default productApi;
