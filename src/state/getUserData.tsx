import axios from "axios";
import { create } from "zustand";

interface Props {
  data: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    occupation: string;
    location: string;
  };
  fetch: () => Promise<void>;
  // AllPost: [
  //   {
  //     creator: {
  //       _id: string;
  //       firstname: string;
  //       lastname: string;
  //       email: string;
  //       occupation: string;
  //       location: string;
  //     };
  //     likes: {
  //       creatorID: string;
  //       likerID: string;
  //     };
  //     post: string;
  //     tag: string;
  //     _id: string;
  //     createdAt: string;
  //   }
  // ];
  // AllUser: [
  //   {
  //     _id: string;
  //     firstname: string;
  //     lastname: string;
  //     email: string;
  //   }
  // ];
  // AllComments: [
  //   {
  //     comment: string;
  //     creatorID: {
  //       email: string;
  //       firstname: string;
  //       lastname: string;
  //       _id: string;
  //     };
  //     postID: string;
  //     _id: string;
  //   }
  // ];
  // NewPost: (posts: { post: string; tag: string }) => Promise<void>;
  // fetchAllPosts: () => Promise<void>;
  // fetchAllUsers: () => Promise<void>;
  // fetchComment: (postID: string) => Promise<void>;
  // handleComment: ({
  //   creatorID,
  //   postID,
  //   comment,
  // }: {
  //   creatorID: string;
  //   postID: string;
  //   comment: string;
  // }) => Promise<void>;
}

export const DataStore = create()((set, get) => ({
  data: {},
  fetch: async () => {
    //fetch the user's data
    const res = await axios.get("http://localhost:3000/api/user/token");
    set({ data: res.data.userData });
  },

  // AllPost: [
  //   {
  //     creator: {
  //       _id: "",
  //       firstname: "",
  //       lastname: "",
  //       email: "",
  //       occupation: "",
  //       location: "",
  //     },
  //     likes: {
  //       creatorID: "",
  //       likerID: "",
  //     },
  //     post: "",
  //     tag: "",
  //     _id: "",
  //     createdAt: "",
  //   },
  // ],
  // AllUser: [{ _id: "", firstname: "", lastname: "", email: "" }],
  // AllComments: [
  //   {
  //     comment: "",
  //     creatorID: {
  //       email: "",
  //       firstname: "",
  //       lastname: "",
  //       _id: "",
  //     },
  //     postID: "",
  //     _id: "",
  //   },
  // ],
  // NewPost: async (posts) => {
  //   // Add new post!
  //   const res = await axios.post(
  //     `http://localhost:3000/api/post/new/${get().data._id}`,
  //     posts
  //   );
  //   return res.data.message;
  // },
  // fetchAllPosts: async () => {
  //   // fetch all the posts
  //   const res = await axios.get("http://localhost:3000/api/post");
  //   set({ AllPost: res.data });
  // },
  // fetchAllUsers: async () => {
  //   // fetch all the users
  //   const res = await axios.get("http://localhost:3000/api/user");
  //   set({ AllUser: res.data });
  // },
  // fetchComment: async (postID: string) => {
  //   // fetch the comment of the specific post
  //   const res = await axios.get(
  //     `http://localhost:3000/api/post/comment/${postID}`
  //   );
  //   set({ AllComments: res.data });
  // },
  // handleComment: async ({
  //   creatorID,
  //   postID,
  //   comment,
  // }: {
  //   creatorID: string;
  //   postID: string;
  //   comment: string;
  // }) => {
  //   const res = await axios.post(`http://localhost:3000/api/post/comment/`, {
  //     creatorID,
  //     postID,
  //     comment,
  //   });
  //   return res.data;
  // },
}));
