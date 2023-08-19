"use client";
import { FaUserCircle } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import EditPostCard from "../Modals/EditPostCard";
import Interactions from "../Interactions";

const getDate = (date: string) => {
  return date.split("T")[0];
};

interface Props {
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
  handleDeletepost: (id: string) => Promise<void>;
  loading: boolean;
  userID: string;
}
export default function PostCard({
  post,
  handleDeletepost,
  loading,
  userID,
}: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);

  return (
    <div className="border-b-[1px] border-white/50">
      <Link
        href={`/`}
        className="flex justify-between items-center pr-4 cursor-pointer hover:bg-gray-900/30"
      >
        {/* Display the user details */}
        <div className="p-4 flex gap-2 items-center">
          <h1 className="cursor-pointer hover:bg-white/20 rounded-full">
            <FaUserCircle size="1.7rem" />
          </h1>
          <span className="flex items-center gap-2">
            <h1 className="font-bold text-lg">{`${post.creator.firstname} ${post.creator.lastname}`}</h1>
            <p className="text-xs text-white/70">{getDate(post.createdAt)}</p>
          </span>
        </div>
        {/* Display the settings icon if its users post */}
        <div className="relative flex flex-col items-end justify-center cursor-pointer">
          {userID === post.creator._id && (
            <BiDotsHorizontalRounded
              size="1.7rem"
              className=" w-max"
              onClick={() => setToggleEdit((prev) => !prev)}
            />
          )}
          {toggleEdit && (
            <div
              className="flex flex-col gap-2 absolute border-[1px] border-white/50 px-2
        bg-black top-6 text-[12px]"
            >
              <EditPostCard post={post} setToggleEdit={setToggleEdit} />
              <button
                disabled={loading}
                onClick={() => handleDeletepost(post._id)}
                className="text-red-500 flex justify-center"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          )}
        </div>
      </Link>
      {/* Displays the post and tag */}
      <div className="h-auto flex flex-col justify-between px-4 pb-4">
        <h1>{post?.post}</h1>
        <h1 className="text-blue-500">{post?.tag}</h1>
      </div>
      {/* Display the like and comment box */}
      <Interactions post={post} />
    </div>
  );
}
