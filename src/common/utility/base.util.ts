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
        description: error.payload?.message,
        variant: "destructive",
        duration: duration ?? 3000,
      });
    }
  }

  static isShippingDetailEmpty = (shippingDetail: IOrderShippingDetail) => {
    return !shippingDetail.phone || !shippingDetail.address;
  };
}
