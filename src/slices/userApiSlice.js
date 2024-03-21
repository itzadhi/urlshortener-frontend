import { apiSlice } from './apiSlice';
const USERS_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    activateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-email`,
        method: 'PUT',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    newPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/new-password`,
        method: 'PUT',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useActivateUserMutation,
  useNewPasswordMutation,
  useForgotPasswordMutation,
} = userApiSlice;
