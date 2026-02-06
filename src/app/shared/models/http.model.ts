export interface iHttpResponse<T> {
  data: T | null;
  message: string;
  status: number;
}