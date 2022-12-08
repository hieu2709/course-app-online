import { configureStore } from '@reduxjs/toolkit';
import firstTimeReducer from './firstTimeReducer';
import userReducer from './userReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    firstTime: firstTimeReducer,
  },
});
export default store;
