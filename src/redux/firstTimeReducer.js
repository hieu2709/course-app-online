import { createSlice } from '@reduxjs/toolkit';
export const FirstTime = createSlice({
  name: 'firstTime',
  initialState: {
    firstTime: null,
  },
  reducers: {
    userFirstTime: (state, action) => {
      state.firstTime = action.payload;
    },
    userLogout: state => {
      state.firstTime = true;
    },
  },
});

export const { userFirstTime, userLogout } = FirstTime.actions;
export const selectFirstTime = state => state.firstTime.firstTime;
export default FirstTime.reducer;
