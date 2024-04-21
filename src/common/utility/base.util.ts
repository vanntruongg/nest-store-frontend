import { UseFormSetError } from "react-hook-form";
import { toast } from "~/components/ui/use-toast";
import { EntityError } from "../http-client";
import { IOrderShippingDetail } from "../model/order.model";

export class BaseUtil {
  static handleErrorApi({
    error,
    setError,
    duration,
  }: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
  }) {
    if (error instanceof EntityError && setError) {
      setError(error.payload.errorDetails, {
        type: "server",
        message: error.payload.message,
      });
    } else {
      toast({
        description: error.payload.message,
        variant: "destructive",
        duration: duration ?? 3000,
      });
    }
  }

  static isShippingDetailEmpty = (shippingDetail: IOrderShippingDetail) => {
    return !shippingDetail.phone || !shippingDetail.address;
  };

  static validateVietnamesePhoneNumber(number: string): boolean {
    const pattern: RegExp =
      /^(0)(90|91|92|93|94|96|97|98|162|163|164|165|166|167|168|169|12[0-9]|18[0-9]|19[0-9]|38|36|35|34|33|32|31|39|56|58|59|52|51|50|55|70|76|77|78|79|81|82|83|84|85|86|88|89|99|94|15[6-9]|15[0-5]|52|56|58|59|50|59|71|72|73|75|76|77|78|79|8[1-9]|91|92|93|94|95|96|97|98|99)\d{7}$/;

    // Match the pattern
    return pattern.test(number);
  }

  static checkPhoneAndSetErrorForm(
    phone: string,
    setError: UseFormSetError<any>
  ) {
    if (phone !== "" && !BaseUtil.validateVietnamesePhoneNumber(phone)) {
      setError("phone", {
        type: "client",
        message: "Số điện thoại không hợp lệ",
      });
      return false;
    }
    return true;
  }

  static validateOrder(
    shippingDetail: IOrderShippingDetail,
    paymentMethod: number
  ) {
    if (BaseUtil.isShippingDetailEmpty(shippingDetail)) {
      toast({
        description: "Thiếu thông tin giao hàng",
        variant: "destructive",
      });
      return false;
    }
    if (paymentMethod === 0) {
      toast({
        description: "Vui lòng chọn phương thức thanh toán",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }
}
