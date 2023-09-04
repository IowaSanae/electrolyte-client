import { createSlice } from '@reduxjs/toolkit';
interface interfaceState {
  toast: boolean;
  userLogin: boolean;
  heart: boolean;
}
const initialState: interfaceState = {
  toast: false,
  userLogin: false,
  heart: false,
};
const otherSlice = createSlice({
  name: 'others',
  initialState: initialState,
  reducers: {
    // toast
    updateToastTrue: (state) => {
      state.toast = true;
    },
    updateToastFalse: (state) => {
      state.toast = false;
    },
    // userLogin
    updateUserLogin: (state) => {
      state.userLogin = true;
      localStorage.setItem('login', JSON.stringify(state.userLogin));
    },
    // userLogOut
    updateUserLogOut: (state) => {
      state.userLogin = false;
      localStorage.setItem('login', JSON.stringify(state.userLogin));
    },
    // heart
    updateHeartTrue: (state) => {
      state.heart = true;
    },
    updateHeartFalse: (state) => {
      state.heart = false;
    },
  },
});

export const { updateToastTrue, updateToastFalse, updateUserLogin, updateUserLogOut, updateHeartTrue, updateHeartFalse } =
  otherSlice.actions;
export default otherSlice.reducer;
