import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BannerResponse } from './index.model';

export const BannerApi = createApi({
  reducerPath: 'Banner',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getBanner: build.query<BannerResponse, void>({
      query: () => 'banner',
    }),
  }),
});
export const { useGetBannerQuery } = BannerApi;
