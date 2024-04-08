interface IOrderShippingDetail {
  phone: string;
  address: string;
}
interface IOrderRequest {
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  paymentMethodId: string;
  listProduct: IOrderDetailRequest[];
}
interface IOrderDetailRequest {
  productId: number;
  productName: string;
  quantity: number;
  productPrice: number;
}

interface IPaymentMethod {
  paymentMethodId: number;
  method: string;
  description: string;
}

export type {
  IOrderShippingDetail,
  IOrderRequest,
  IOrderDetailRequest,
  IPaymentMethod,
};
