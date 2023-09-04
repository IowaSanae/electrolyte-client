import { PostSimple } from '../../types/post';
import { ShopInterface } from '../../types/shop';

export interface ItemsShopResponse {
  err: number;
  msg: string;
  response: PostSimple[];
  total: number;
}

export interface ShopIdResponse {
  err: number;
  msg: string;
  response: ShopInterface;
}
