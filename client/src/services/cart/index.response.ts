import { Cart } from '../../types/cart';

export interface CartResponse {
  err: number;
  total_cart: number;
  response: [Cart[]];
  msg: string;
}

export interface CreateCartResponse {
  err: number;
  msg: string;
  response: any;
}

export interface UpdateCartResponse {
  err: number;
  msg: string;
  response: any;
}

export interface DeleteCartResponse {
  err: number;
  msg: string;
  response: any;
}
