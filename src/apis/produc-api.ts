import httpClient from "~/common/http-client";

const productApi = {
  getList: (order: string, page: number) =>
    httpClient.get<any>(`/product/products?order=${order}&page=${page}`),
  getProductById: (productId: number) =>
    httpClient.get<any>(`/product/get/${productId}`),
  getProductByName: (name: string) =>
    httpClient.get<any>(`/product/get/name?name=${name}`),
};

export default productApi;
