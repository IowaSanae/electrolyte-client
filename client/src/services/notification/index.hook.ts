import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NotificationResponse } from './index.response';

export const NotificationApi = createApi({
  reducerPath: 'Notification',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_HOST}/` }),
  endpoints: (build) => ({
    getNotification: build.query<NotificationResponse, void>({
      query: () => 'notification',
    }),
  }),
});
export const { useGetNotificationQuery } = NotificationApi;
