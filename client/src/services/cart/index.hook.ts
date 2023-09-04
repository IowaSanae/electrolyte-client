import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartResponse, CreateCartResponse, DeleteCartResponse, UpdateCartResponse } from './index.response';

export const CartApi = createApi({
  reducerPath: 'CartApi',
  tagTypes: ['Cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}/`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token-electrolyte')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getCarts: build.query<CartResponse, void>({
      query: () => 'cart',
    }),

    createCart: build.mutation<CreateCartResponse, any>({
      query: (body) => {
        return {
          url: 'cart',
          method: 'POST',
          body,
        };
      },
    }),

    updateCart: build.mutation<UpdateCartResponse, any>({
      query: (args) => {
        const { cartid, body } = args;
        return {
          url: `cart/${cartid}`,
          method: 'PUT',
          body,
        };
      },
    }),

    deleteCart: build.mutation<DeleteCartResponse, any>({
      query: (cartid: string) => {
        return {
          url: `cart/${cartid}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { useGetCartsQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation } = CartApi;
