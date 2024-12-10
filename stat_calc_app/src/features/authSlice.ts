import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state) {
      state.isLoggedIn = true;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },

    resetState: () => initialState
  },
});

export const { loginSuccess, setUserEmail, resetState } = authSlice.actions;

export default authSlice.reducer;
