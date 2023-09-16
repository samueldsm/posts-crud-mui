import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "@/interfaces/post";
export interface PostState {
  posts: IPost[];
  isLoading: boolean;
}
// Define the initial state using that type
const initialState = {
  posts: [],
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
      const { id, title, description } = action.payload;
      state.push({ id, title, description });
    },
    updatePost: (state, action: PayloadAction<any>) => {
      const { id, title, description } = action.payload;
      const postIndex = state.findIndex((post: any) => post.id === id);
      if (postIndex !== -1) {
        state[postIndex].title = title;
        state[postIndex].description = description;
      }
    },
    deletePost: (state, action: PayloadAction<any>) => {
      const postId = action.payload;
      return state.filter((post: any) => post.id !== postId);
    },
  },
});

export const { startLoadingPosts, setPosts, addPost, updatePost, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
