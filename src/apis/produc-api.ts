import httpClient from "~/common/http-client";

const productApi = {
  getList: (order: string = "", page: number = 0) =>
    httpClient.get<any>(`/product/products?order=${order}&page=${page}`),
  getProductById: (productId: number) =>
    httpClient.get<any>(`/product/get/${productId}`),
};

export default productApi;
