import { Order } from '../../types/order';

export interface OrdersResponse {
  err: number;
  msg: string;
  response: Order[];
  tabs: {
    is_all: number;
    is_wait_for_pay: number;
    is_transport: number;
    is_delivering: number;
    is_cancelled: number;
    is_success: number;
    is_returns: number;
  };
}

export interface OrderResponse {
  err: number;
  msg: string;
  response: Order;
}

export interface CreateOrdersResponse {
  err: number;
  msg: string;
  response: any;
}
