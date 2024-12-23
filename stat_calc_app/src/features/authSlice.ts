import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  email: string;
  is_staff: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: '',
  is_staff: false
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
    setIsStaff(state) {
      state.is_staff = true;
    },

    resetState: () => initialState
  },
});

export const { loginSuccess, setUserEmail, resetState, setIsStaff} = authSlice.actions;

export default authSlice.reducer;
