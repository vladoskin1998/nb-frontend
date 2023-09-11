import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/auth';
import categoriesReducer from '../reducer/categories'

const store = configureStore({
  reducer: {
    authReducer,
    categoriesReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;