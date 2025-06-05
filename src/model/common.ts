export interface IBaseResponse {
  success: boolean;
  error?: string;
}

export interface IBaseResponseWithData<T> extends IBaseResponse {
  data: T;
}
