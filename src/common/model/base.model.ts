export interface IErrorResponse {
  path?: string;
  error?: string;
  message: string;
  status: number;
}

export interface IParamFilter {
  filter?: string;
  size?: number;
  page?: number;
  sort?: string;
}

export interface IResponsePaginate<T> {
  tableData: T[];
  totalRow: number;
}
