export interface ResCommon<T> {
  code: number;
  message: string;
  data: T;
}

export interface UniappRes<T> {
  cookies: string[];
  header: Object;
  data: ResCommon<T>;
  statusCode: number;
}
