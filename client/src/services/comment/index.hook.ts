import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentsResponse } from './index.response';

export const CommentApi = createApi({
  reducerPath: 'Comment',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getComments: build.query<CommentsResponse, any>({
      query: (params: any) => `comment?shopid=${params.shopid}&itemid=${params.itemid}`,
    }),
  }),
});
export const { useGetCommentsQuery } = CommentApi;
