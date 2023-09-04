import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateSearchHistoryResponse, SearchHistoryResponse } from './index.response';

export const SearchHistoryApi = createApi({
  reducerPath: 'SearchHistory',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_HOST}/`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem('token-electrolyte')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getHistorySearch: build.query<SearchHistoryResponse, void>({
      query: () => 'search',
    }),
    createHistorySearch: build.mutation<CreateSearchHistoryResponse, any>({
      query: (body) => {
        return {
          url: 'search',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});
export const { useGetHistorySearchQuery, useCreateHistorySearchMutation } = SearchHistoryApi;
