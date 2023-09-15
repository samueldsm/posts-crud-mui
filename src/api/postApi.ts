import axios from "axios";

const postApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export default postApi;
