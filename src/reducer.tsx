import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  loggedIn: boolean,
  user: null | { userName: string; email: string };
}

const initialState: LoginState = {
  loggedIn: false,
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userName: string; email: string}>) => {
      state.loggedIn = true;
      state.user = {
        userName: action.payload.userName,
        email: action.payload.email,
      };
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
