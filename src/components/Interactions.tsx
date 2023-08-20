"use client";
import { FaComment } from "react-icons/fa6";
import Likes from "./Likes";
import { useState } from "react";
import CommentBox from "./CommentBox";
import axios from "axios";
import { toast } from "react-hot-toast";
import useDataStore from "@/store/useDataStore";

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
    likes: [
      {
        creatorID: string;
        likerID: string;
      }
    ];
    post: string;
    tag: string;
  };
};

export default function Interactions({ post }: Props) {
  const [loading, setLoading] = useState(false);
  const [commentloading, setCommentLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [AllComments, SetAllComments] = useState();
  const [comment, setComment] = useState("");
  const userID = useDataStore((state) => state.userData._id);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const fetchComments = async () => {
    if (!toggle) {
      try {
        setLoading(true);
        const baseUrl =
          "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
        const res = await axios.get(`/api/post/comment/${post._id}`);
        SetAllComments(res.data);
        setToggle(true);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      handleToggle();
    }
  };

  const AddNewComment = async () => {
    try {
      setCommentLoading(true);
      const baseUrl =
        "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
      const res = await axios.post(`/api/post/comment`, {
        userID: userID,
        postID: post._id,
        comment: comment,
      });
      toast.success(res.data.message);
      setComment("");
      handleToggle();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className=" flex flex-col">
      <div className=" flex items-center py-3 divide-x-[1px] divide-white/20 ">
        {/* Like Button */}
        <Likes post={post} />
        {/* Comment Button */}
        <button
          type="button"
          className="w-full flex justify-center"
          onClick={fetchComments}
        >
          <FaComment size="1.1rem" />
        </button>
      </div>
      <CommentBox
        commentloading={commentloading}
        loading={loading}
        toggle={toggle}
        postID={post._id}
        commentorID={post.creator._id}
        comment={comment}
        setComment={setComment}
        AllComments={AllComments}
        AddNewComment={AddNewComment}
      />
    </div>
  );
}
