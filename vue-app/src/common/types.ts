export interface ResCommon {
  code: number;
  message: string;
}

export interface UniappRes {
  cookies: string[];
  header: Object;
  data: ResCommon;
  statusCode: number;
}
