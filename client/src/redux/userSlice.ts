import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  data: {
    sex: '',
    role: '',
    userid: '',
    shopid: 0,
    email: '',
    name: '',
    address: null || '',
    birthday: 0,
    phone: '',
    avatar: '',
    not_new_user: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      const { userid, shopid, sex, role, email, name, address, avatar, not_new_user, birthday, phone } = action.payload.data;
      const isLogin = action.payload.isLogin;
      state.data.userid = userid;
      state.data.shopid = shopid;
      state.data.sex = sex;
      state.data.role = role;
      state.data.email = email;
      state.data.name = name;
      state.data.address = address || '';
      state.data.avatar = avatar;
      state.data.birthday = birthday;
      state.data.not_new_user = not_new_user;
      state.data.phone = phone;
      state.isLogin = isLogin;
    },
    getUser: (state) => {
      state.isLogin = true;
      state.data = state.data;
    },
  },
});

export const UserActions = userSlice.actions;
export default userSlice.reducer;
