"use client";
import useDataStore from "@/store/useDataStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";

type Props = {
  post: {
    _id: string;
    createdAt: string;
    creator: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      occupation: string;
      location: string;
    };
    likes: {
      creatorID: string;
      likerID: string;
    }[];
    post: string;
    tag: string;
  };
};

export default function Likes({ post }: Props) {
  const [count, setCount] = useState(post.likes.length);
  const [like, setLike] = useState(false);
  const userData = useDataStore((state) => state.userData);

  useEffect(() => {
    const isLiked = post.likes.some((like) => like.likerID === userData._id);
    setLike(isLiked);
  }, [setCount, post.likes, userData._id, setLike]);

  async function handleLike() {
    try {
      const res = await axios.post("http://localhost:3000/api/post/like", {
        creatorID: post.creator._id,
        likerID: userData._id,
        postID: post._id,
      });
      setCount(res.data.post);
      setLike(!like);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full flex justify-center gap-3 items-center">
      <p>{count}</p>
      <FaHeart
        size="1.1rem"
        className={`${like ? "text-red-500" : ""} cursor-pointer`}
        onClick={handleLike}
      />
    </div>
  );
}
