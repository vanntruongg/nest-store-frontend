// import { Observable } from "rxjs";

// interface IBaseMessageResponse {
//   description: string;
// }

// interface IAbnormalMessageResponse extends IBaseMessageResponse {
//   code?: string;
//   detail?: ErrorDetail[];
// }

// interface ErrorDetail {
//   [key: string]: string | number;
// }

// interface IBaseResponse {
//   message?: IBaseMessageResponse | IAbnormalMessageResponse;
//   success: boolean;
// }

// export interface IResponse<T = any> extends IBaseResponse {
//   data?: T;
// }

// export type CommonResponse = Observable<IResponse>;
