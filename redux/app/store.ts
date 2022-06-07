import SignInModal from './../features/signInModal/signInModal';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { SignInModal },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
