import { postApi } from "@/api";
import { startLoadingPosts, setPosts } from "./postSlice";

export const getPost = () => {
  // TODO: Infer types
  return async (dispatch, getState) => {
    dispatch(startLoadingPosts());

    const { data } = await postApi.get(`/posts`);
    dispatch(setPosts({ posts: data }));
  };
};
