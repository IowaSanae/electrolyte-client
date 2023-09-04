import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CategoryTreeResponse, CategoryTreeResponseParent } from './index.response';

export const CategoryTreeApi = createApi({
  reducerPath: 'CategoryTree',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getCategoryTree: build.query<CategoryTreeResponse, void>({
      query: () => 'categoryTree/1',
    }),
    getCategoryTreeParent: build.query<CategoryTreeResponseParent, any>({
      query: (params: any) => `/categoryTree/parent/${+params.catid}`,
    }),
  }),
});
export const { useGetCategoryTreeQuery, useGetCategoryTreeParentQuery } = CategoryTreeApi;
