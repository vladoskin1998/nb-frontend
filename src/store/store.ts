import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/auth';
import categoriesReducer from '../reducer/categories'
import  activitiesReducer  from '../reducer/activities';
import  profileReducer from '../reducer/profile';

const store = configureStore({
  reducer: {
    authReducer,
    categoriesReducer,
    activitiesReducer,
    profileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;