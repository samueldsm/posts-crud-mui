import { postApi } from "@/api";

import { IPost } from "@/interfaces";
import { startLoadingPosts, setPosts, addPost } from "./postSlice";

export const getPost = () => {
  // TODO: Infer types
  return async (dispatch: any, getState: any) => {
    dispatch(startLoadingPosts());

    try {
      const { data } = await postApi.get(`/posts`);
      dispatch(setPosts({ posts: data as IPost[] }));
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };
};

export const addPosts = (post: IPost) => {
  // TODO: Infer types
  return async (dispatch: any, getState: any) => {
    const tempPost = {
      body: post.body,
      title: post.title,
      userId: 1,
    };
    dispatch(startLoadingPosts());
    try {
      const { data } = await postApi.post(`/posts`, tempPost);
      dispatch(addPost(post)); //Most be {data}. it's for test
    } catch (error) {
      console.log("Error in POST method", error);
    }
  };
};
