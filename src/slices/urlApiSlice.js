import { apiSlice } from './apiSlice';
const USERS_URL = '/url';

export const urlApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUrl: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getUrls: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/all`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateUrlMutation, useGetUrlsMutation } = urlApiSlice;
