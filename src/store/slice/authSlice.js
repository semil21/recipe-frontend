import { createSlice } from "@reduxjs/toolkit";
// Adjust the import path

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSLice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { loginSuccess, logout, setToken, clearToken } = authSLice.actions;

export default authSLice.reducer;
