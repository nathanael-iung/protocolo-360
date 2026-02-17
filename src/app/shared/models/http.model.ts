export interface iHttpResponse<T> {
  data: T;
  message: string;
  status: number;
}