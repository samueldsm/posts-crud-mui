import { postApi } from "@/api";

import { startLoadingPosts, setPosts } from "./postSlice";
import { IPost } from "../../../interfaces/post";

export const getPost = () => {
  // TODO: Infer types
  return async (dispatch: any, getState: any) => {
    dispatch(startLoadingPosts());
    const { data } = await postApi.get(`/posts`);
    dispatch(setPosts({ posts: data as IPost[] }));
  };
};
