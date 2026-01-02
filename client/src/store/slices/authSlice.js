import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  isLoggedIn: !!token,
  userName: localStorage.getItem("userName") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, userName } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.userName = userName; // Update Redux state
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName); // Save in localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
