import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface PostState {
  posts: [];
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: PostState = {
  posts: [],
  isLoading: false,
};

export const postSlice = createSlice({
  name: "post",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    startLoadingPosts: (state) => {
      state.isLoading = true;
    },
    setPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
    },
  },
});

export const { startLoadingPosts, setPosts } = postSlice.actions;

export default postSlice.reducer;