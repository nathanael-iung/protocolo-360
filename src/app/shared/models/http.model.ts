export interface iHttpResponse<T> {
  data: null | T;
  message: string;
  status: number;
}