import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// REDUX TOOLKIT
import otherReducer from '../redux/otherSlice';
import cartReducer from '../redux/cart.slice';
import userReducer from '../redux/userSlice';
import postReducer from '../redux/post.slice';
import buyCartReducer from '../redux/buyCart.slice';
// REDUX TOOLKIT RTK
import { BannerApi } from '../services/banner/index.hook';
import { NotificationApi } from '../services/notification/index.hook';
import { CategoryTreeApi } from '../services/category/index.hook';
import { ProductApi } from '../services/post/index.hook';
import { SearchHistoryApi } from '../services/searchHistory/index.hook';
import { CartApi } from '../services/cart/index.hook';
import { ShopApi } from '../services/shop/index.hook';
import { OrderApi } from '../services/order/index.hook';
import { CommentApi } from '../services/comment/index.hook';
import { RoomApi } from '../services/room/index.hook';
import { UserApi } from '../services/user/index.hook';

const RootReducer = {
  others: otherReducer,
  cart: cartReducer,
  user: userReducer,
  posts: postReducer,
  buyCart: buyCartReducer,
  [BannerApi.reducerPath]: BannerApi.reducer,
  [NotificationApi.reducerPath]: NotificationApi.reducer,
  [SearchHistoryApi.reducerPath]: SearchHistoryApi.reducer,
  [CategoryTreeApi.reducerPath]: CategoryTreeApi.reducer,
  [ProductApi.reducerPath]: ProductApi.reducer,
  [CartApi.reducerPath]: CartApi.reducer,
  [ShopApi.reducerPath]: ShopApi.reducer,
  [OrderApi.reducerPath]: OrderApi.reducer,
  [CommentApi.reducerPath]: CommentApi.reducer,
  [RoomApi.reducerPath]: RoomApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
};
export const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      BannerApi.middleware,
      NotificationApi.middleware,
      CategoryTreeApi.middleware,
      ProductApi.middleware,
      SearchHistoryApi.middleware,
      CartApi.middleware,
      ShopApi.middleware,
      OrderApi.middleware,
      CommentApi.middleware,
      RoomApi.middleware,
      UserApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
