export interface IResponse<T> {
  success: boolean;
  errorMsg: string;
  successMsg: string;
  errors?: string[];
  response: T | undefined;
}

export type payload<T> = {
  imageUrl: string;
  data: T,
  dataCount?: number
}
