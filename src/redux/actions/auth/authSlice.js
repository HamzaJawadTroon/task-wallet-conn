const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isLoggedIn: false,
  user: null,
  profile: null
};

const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // actions will come here
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action;
      state.profile = null;
    },
    logoutStatic: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.profile = null;
    }
  }
});

export const { login, logoutStatic } = authSlice.actions;
export default authSlice.reducer;
