import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userUrls: [],
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    getUserUrls: (state, action) => {
      state.userUrls = action.payload;
    },
    removeUserUrls: (state, action) => {
      state.userUrls = [];
    },
  },
});

export const { getUserUrls, removeUserUrls } = urlSlice.actions;

export default urlSlice.reducer;
