export interface LoginREsponse {
  err: number;
  msg: string;
  response: {};
  access_token: string | null;
}

export interface RegisterResponse {
  err: number;
  msg: string;
  response: any;
}
