import { createSlice } from '@reduxjs/toolkit';

export interface SignInModal {
  isOpen: boolean;
}

const initialState: SignInModal = {
  isOpen: false,
};

export const SignInModalSlice = createSlice({
  name: 'SignInModal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { close, open } = SignInModalSlice.actions;
export default SignInModalSlice.reducer;
