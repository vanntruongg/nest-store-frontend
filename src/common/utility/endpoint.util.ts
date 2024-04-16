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
      VERIFY_EMAIL: "/auth/verify-email",
      REQUEST_VERIFY_ACCOUNT: "/auth/request/verify",
    },
    USER: {
      GET_ALL: "/auth/user",
      GET_PROFILE: "/auth/profile",
      UPDATE_USER: "/auth/user/update",
      CHANGE_PASSWORD: "/auth/user/change-password",
      DELETE_USER: "/auth/user/delete",
      COUNT_USER: "/auth/user/count",
    },
    PRODUCT: {
      GET_ALL: "/product/get-all",
      GET_LIST: "/product/products",
      GET_BY_ID: "/product/get",
      GET_STOCK_BY_ID: "/product/get/stock",
      GET_BY_NAME: "/product/get/name",
      GET_ALL_CATEGORY: "/product/category",
      GET_ALL_SUBCATEGORY: "/product/category/subcategory/all-level",
      CREATE_PRODUCT: "/product/create",
      UPDATE_PRODUCT: "/product/update",
      COUNT_PRODUCT: "/product/count",
    },
    CART: {
      GET_ALL: "/cart/items",
      ADD: "/cart/add",
      UPDATE: "/cart/update",
      REMOVE: "/cart/remove",
    },
    ORDER: {
      GET_ALL: "/order/orders",
      CREATE_ORDER: "/order/create",
      GET_URL_PAYMENT_VNPAY: "/order/get-link-payment",
      GET_ALL_PAYMENT_METHOD: "/order/methods",
      GET_BY_EMAIL: "/order/get/email",
      GET_BY_STATUS: "/order/get/status",
      GET_BY_EMAIL_AND_STATUS: "/order/get/email/status",
      UPDATE_STATUS: "/order/update/status",
      GET_TOTAL_ORDER_COUNT_BY_STATUS: "/order/total-order",
      ORDER_COUNT_BY_MONTH: "/order/count/month",
    },
  };
}
