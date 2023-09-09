import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/auth';

const store = configureStore({
  reducer: {
    authReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;