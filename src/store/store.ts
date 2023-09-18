import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/auth';
import categoriesReducer from '../reducer/categories'
import  activitiesReducer  from '../reducer/activities';
import  userReducer from '../reducer/user';

const store = configureStore({
  reducer: {
    authReducer,
    categoriesReducer,
    activitiesReducer,
    userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;