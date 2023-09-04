import { createSlice } from '@reduxjs/toolkit';

import { PostSimple } from '../types/post';

interface postState {
  isSuccess: boolean;
  isLoading: boolean;
  data: PostSimple[];
  error: boolean;
  TOTAl_PAGE: number;
}
const initialState: postState = {
  isSuccess: false,
  isLoading: false,
  data: [],
  error: false,
  TOTAl_PAGE: 0,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state: any, action: any) => {
      state.success = true;
      state.isSuccess = true;
      state.isLoading = false;
      state.data = action.payload?.response?.rows;
      state.TOTAl_PAGE = action.payload?.totalPage;
    },
  },
});
export const postActions = postSlice.actions;
export default postSlice.reducer;
