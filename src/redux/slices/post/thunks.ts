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

// export const addPosts = () => {
//   // TODO: Infer types
//   return async (dispatch: any, getState: any) => {
//     dispatch(startLoadingPosts());

//     const { post } = getState();
//     console.log("Posts from getState", post.posts);
//     const tempPost = {
//       body: "bodyVal",
//       title: "titleVal",
//       userId: 1,
//     };
//     const { data } = await postApi.post(`/posts`, tempPost);
//     console.log("Data del API", data);
//     const finalData = [
//       {
//         ...tempPost,
//         id: tempPost.title.length + 100,
//       },
//       ...post.posts,
//     ];
//     console.log(finalData);
//     // const { data } = await postApi.get(`/posts`);
//     dispatch(setPosts({ posts: finalData as IPost[] }));
//   };
// };
