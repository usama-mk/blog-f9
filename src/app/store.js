import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import editPostReducer from '../features/editPostSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    editPost: editPostReducer,
  },
});
