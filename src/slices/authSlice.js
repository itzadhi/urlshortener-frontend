import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  activateUserStatus: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserStatus: (state, action) => {
      state.activateUserStatus = action.payload;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    removeCredentials: (state, action) => {
      state.userInfo = null;
      state.activateUserStatus = '';
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setUserStatus, setCredentials, removeCredentials } =
  authSlice.actions;

export default authSlice.reducer;
