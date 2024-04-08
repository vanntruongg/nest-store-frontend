import httpClient from "~/common/http-client";
import { EndpointUtil } from "~/common/utility/endpoint.util";

const orderApi = {
  getUrlPaymentVNPay: (amount: number) =>
    httpClient.get<any>(
      EndpointUtil.NEST.ORDER.GET_URL_PAYMENT_VNPAY + `?amount=${amount}`
    ),
  getAllPaymentMethod: () =>
    httpClient.get<any>(EndpointUtil.NEST.ORDER.GET_ALL_PAYMENT_METHOD),
};

export default orderApi;
