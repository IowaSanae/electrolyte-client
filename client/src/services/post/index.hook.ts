import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostSimpleResponse } from './index.response';

export const ProductApi = createApi({
  reducerPath: 'Products',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getProducts: build.query<PostSimpleResponse, { limit: number; page: number }>({
      query: ({ limit, page }) => `post?limit=${limit}&page=${page}`,
    }),
    getProduct: build.query<any, any>({
      query: (params) => `/post/${params.itemid}`,
    }),
    searchProduct: build.query<PostSimpleResponse, any>({
      query: (payload: any) => `post/search?limit=${payload.limit}&page=${payload.page}&name=${payload.params?.search}`,
    }),
    searchCategories: build.query<PostSimpleResponse, any>({
      query: (payload: any) => {
        let encodedString = encodeURIComponent(payload.params.display_name);
        return `/industry/category?page=${payload.page}&limit=${payload.limit}&category_name=${encodedString}`;
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useSearchProductQuery, useSearchCategoriesQuery } = ProductApi;
