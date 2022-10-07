import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: null,
};

export const editPostSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editPostReducer: (state, action) => {
      state.user = action.payload;
      
    } 
  }
});

export const { editPostReducer } = editPostSlice.actions;
export const selectUser = (state) => state.user;
export default editPostSlice.reducer;
