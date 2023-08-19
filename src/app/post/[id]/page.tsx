"use client";
import Interactions from "@/components/Interactions";
import { DataStore } from "@/state/getUserData";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-screen flex flex-col items-center overflow-y-scroll overflow-hidden border-white/10 ">
      <PostCard id={params.id} />
    </div>
  );
}

function PostCard({ id }: { id: string }) {
  const { fetchPost, Post } = DataStore();

  useEffect(() => {
    fetchPost(id);
  }, []);

  if (Post) {
    return (
      <div className="border-b-[1px] border-white/50">
        <Link
          href={`/post/${Post.creator._id}`}
          className="flex justify-between items-center pr-4 cursor-pointer"
        >
          {/* Display the user details */}
          <div className="p-4 flex gap-2 items-center ">
            <Link
              className="cursor-pointer hover:bg-white/20 rounded-full"
              href={`/profile/${""}`}
            >
              <FaUserCircle size="1.7rem" />
            </Link>
            <span className="flex items-center gap-2">
              <h1 className="font-bold text-lg">{`${Post.creator.email}`}</h1>
              <p className="text-xs text-white/70">{Post.createdAt}</p>
            </span>
          </div>
          {/* Display the settings icon if its users post */}
          {/* <div className="relative flex flex-col items-end justify-center cursor-pointer">
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
        </div> */}
        </Link>
        {/* Displays the post and tag */}
        <div className="h-auto flex flex-col justify-between px-4 pb-4 ">
          <h1>{}</h1>
          <h1 className="text-blue-500">{}</h1>
        </div>
        {/* Display the like and comment box */}
        <Interactions />
      </div>
    );
  }
}
