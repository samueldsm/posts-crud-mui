import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/interfaces";
export interface PostState {
  posts: IPost[];
  isLoading: boolean;
}
// Define the initial state using that type
const initialState = {
  posts: [],
  isLoading: false,
} as any;

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoadingPosts: (state) => {
      state.isLoading = true;
    },
    setPosts: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
    },
    addPost: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      const { id, title, body } = action.payload;
      state.posts.unshift({ id, title, body });
    },
    updatePost: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      const { id, title, body } = action.payload;
      const postIndex = state.posts.findIndex((post: any) => post.id === id);
      if (postIndex !== -1) {
        state.posts[postIndex].title = title;
        state.posts[postIndex].body = body;
      }
    },
    deletePost: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      const postId = action.payload;
      state.posts = state.posts.filter((post: IPost) => post.id !== postId);
    },
  },
});

export const { startLoadingPosts, setPosts, addPost, updatePost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
