import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: undefined,
  token: "",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    beginAuthentication: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    authenticationSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    authenticationFailure: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = undefined;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = undefined;
      state.isLoading = false;
    },
  },
});

export const {
  setUser,
  beginAuthentication,
  authenticationSuccess,
  authenticationFailure,
  finishLoading,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
