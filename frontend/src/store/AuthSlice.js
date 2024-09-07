import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,

  // post
  post: null,
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;

      // checking......
      // console.log(state.userData);
      // console.log(state.status);
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
    },

    // Set the current post data
    setPosts: (state, action) => {
      state.post = action.payload;
      console.log(state.post);
    },

    // Clear the current post data
    clearPost: (state) => {
      state.post = null;
      console.log(state.post);
    },

    // Update specific fields of the post
    updatePost: (state, action) => {
        if (state.post) {
          console.log("Previous post value", JSON.parse(JSON.stringify(state.post)));
          console.log("incoming data....", action.payload);
          state.post = action.payload;
          console.log("updated state", state.post);
        }
      },
      
  },
});

export const { login, logout, setPosts, clearPost, updatePost } =
  AuthSlice.actions;

export default AuthSlice.reducer;
