//? LIBRARY
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//? TYPE & SERVICES
import { CreateOrdersResponse, OrderResponse, OrdersResponse } from './index.response';

export const OrderApi = createApi({
  reducerPath: 'Order',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}/`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token-electrolyte')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getOrders: build.query<OrdersResponse, void>({
      query: () => 'order',
    }),

    createOrder: build.mutation<CreateOrdersResponse, any>({
      query: (body) => {
        return {
          url: 'order',
          method: 'POST',
          body,
        };
      },
    }),

    getOrder: build.query<OrderResponse, any>({
      query: (payload: any) => `order/${payload.orderid}`,
    }),

    searchOrders: build.query<OrdersResponse, any>({
      query: (args: any) => {
        return {
          url: `/order/search?shop_name=${args}`,
          method: 'get',
        };
      },
    }),

    searchTypeOrders: build.query<OrdersResponse, any>({
      query: (args: any) => {
        return {
          url: `/order/search?type=${args}`,
          method: 'get',
        };
      },
    }),
  }),
});
export const { useCreateOrderMutation, useGetOrderQuery, useGetOrdersQuery, useSearchOrdersQuery, useSearchTypeOrdersQuery } = OrderApi;
