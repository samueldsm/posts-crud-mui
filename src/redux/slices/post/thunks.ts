import { postApi } from "@/api";

import { IPost } from "@/interfaces";
import {
  startLoadingPosts,
  setPosts,
  addPost,
  updatePost,
  deletePost,
} from "./postSlice";

export const getPost = () => {
  // TODO: Infer types of dispatch and getState
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

export const addPostThunk = (post: IPost) => {
  // TODO: Infer types of dispatch and getState
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

export const updatePostThunk = (post: IPost) => {
  // TODO: Infer types of dispatch and getState
  return async (dispatch: any, getState: any) => {
    dispatch(startLoadingPosts());
    if (post.id <= 100 && post.id >= 1) {
      try {
        const { data } = await postApi.put(`/posts/${post.id}`, post);
        dispatch(updatePost(post)); //Most be {data} intend. it's only for test
      } catch (error) {
        console.log("Error in PUT method", error);
      }
    } else dispatch(updatePost(post)); //Most be {data} intend. it's only for test)
  };
};

export const deletePostThunk = (id: number) => {
  // TODO: Infer types of dispatch and getState
  return async (dispatch: any, getState: any) => {
    dispatch(startLoadingPosts());
    try {
      const { data } = await postApi.delete(`/posts/${id}`);
      dispatch(deletePost(id)); //Most be {data.id} intend. it's for test
    } catch (error) {
      console.log("Error in DELETE method", error);
    }
  };
};
