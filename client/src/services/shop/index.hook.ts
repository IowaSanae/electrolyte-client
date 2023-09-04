//? LIBRARY
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//? TYPE & SERVICES
import { ItemsShopResponse, ShopIdResponse } from './index.response';

export const ShopApi = createApi({
  reducerPath: 'Shop',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getShopId: build.query<ShopIdResponse, any>({
      query: (params: any) => `/shop/${params.shopid}`,
    }),

    getItemsShop: build.query<ItemsShopResponse, any>({
      query: (params: any) => `/shop/items/${params.shopid}`,
    }),
  }),
});
export const { useGetShopIdQuery, useGetItemsShopQuery } = ShopApi;
