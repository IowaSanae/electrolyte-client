import { PostSimple, ProductDetail } from '../../types/post';

export interface PostSimpleResponse {
  err: number;
  msg: string;
  page: number;
  limit: number;
  totalPage: number;
  response: {
    rows: PostSimple[];
    count: number;
  };
}

export interface PostIdResponse {
  err: number;
  msg: string;
  response: ProductDetail;
}
