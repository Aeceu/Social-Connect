import { create } from "zustand";

interface Details {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  occupation: string;
  location: string;
}

interface PostProps {
  _id: string;
  creator: Details;
  post: string;
  tag: string;
  createdAt: string;
  likes: [
    {
      creatorID: string;
      likerID: string;
    }
  ];
}

interface DataStore {
  userData: Details;
  setUserData: (userData: Details) => void;
  postData: [PostProps];
  setPostData: (postData: [PostProps]) => void;
  refresh: boolean;
  setRefresh: (refresh: boolean) => void;
  likeRefresh: boolean;
  setLikeRefresh: (refresh: boolean) => void;
}

const useDataStore = create<DataStore>((set, get) => ({
  // user infos
  userData: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    occupation: "",
    location: "",
  },
  setUserData: (data) => {
    set({ userData: data });
  },

  //all posts data
  postData: [
    {
      _id: "",
      creator: {
        _id: "",
        firstname: "",
        lastname: "",
        email: "",
        occupation: "",
        location: "",
      },
      post: "",
      tag: "",
      createdAt: "",
      likes: [
        {
          creatorID: "",
          likerID: "",
        },
      ],
    },
  ],
  setPostData: (data) => {
    set({ postData: data });
  },

  //refresh
  refresh: false,
  setRefresh: (value: boolean) =>
    set({ refresh: get().refresh === value ? !value : value }),

  //like refresh
  likeRefresh: false,
  setLikeRefresh: (value: boolean) =>
    set({ likeRefresh: get().likeRefresh === value ? !value : value }),
}));

export default useDataStore;
