import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserResponse } from './index.response';

// fetch data RTK QUERY

export const UserApi = createApi({
    reducerPath: 'User',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_HOST}/`,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${localStorage.getItem('token-electrolyte')}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        getUserCurrent: build.query<UserResponse, void>({
            query: () => 'user/current',
        }),
    }),
});
export const { useGetUserCurrentQuery } = UserApi;