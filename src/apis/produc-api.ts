import httpClient from "~/common/http-client";

const productApi = {
  getList: (category: number, order: string, page: number) =>
    httpClient.get<any>(
      `/product/products?category=${category}&order=${order}&page=${page}`
    ),
  getProductById: (productId: number) =>
    httpClient.get<any>(`/product/get/${productId}`),
  getProductByName: (name: string) =>
    httpClient.get<any>(`/product/get/name?name=${name}`),
  getAllSubCategory: (categoryId: string) =>
    httpClient.get<any>(
      `/product/category/subcategory/all-level/${categoryId}`
    ),
};

export default productApi;
