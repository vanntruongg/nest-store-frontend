export class EndpointUtil {
  public static NEST = {
    AUTH: {
      SERVER: {
        AUTH: "/api/auth",
        LOGOUT: "/api/auth/logout",
      },
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      LOGOUT: "/auth/logout",
      REFRESH_TOKEN: "/auth/refresh-token",
    },
    USER: {
      GET_PROFILE: "/auth/profile",
      UPDATE_USER: "/auth/user/update",
      CHANGE_PASSWORD: "/auth/change-password",
    },
    PRODUCT: {
      GET_LIST: "/product/products",
      GET_BY_ID: "/product/get",
      GET_BY_NAME: "/product/get/name",
      GET_ALL_SUBCATEGORY: "/product/category/subcategory/all-level",
    },
    CART: {
      GET_ALL: "/cart/items",
      ADD: "/cart/add",
      UPDATE: "/cart/update",
      REMOVE: "/cart/remove",
    },
    ORDER: {},
  };
}
