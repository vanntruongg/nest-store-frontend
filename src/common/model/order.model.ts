interface IOrder {
  orderId: number;
  phone: string;
  address: string;
  totalPrice: number;
  notes: string;
  orderStatus: string;
  paymentMethod: string;
  orderDetail: IOrderDetail[];
}

interface IOrderShippingDetail {
  phone: string;
  address: string;
}
interface IOrderRequest {
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  paymentMethodId: number;
  listProduct: IOrderDetailRequest[];
}
interface IOrderDetail {
  orderDetailId: number;
  productId: number;
  productName: string;
  quantity: number;
  productPrice: number;
  productImage: string;
}

type IOrderDetailRequest = Omit<IOrderDetail, "orderDetailId">;

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
  IOrder,
  IOrderDetail,
};
