"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from "react-hot-toast";
import { DataStore } from "@/state/getUserData";
import useDataStore from "@/store/useDataStore";
import axios from "axios";

export default function CreatePostCard() {
  const { userData } = useDataStore();
  const { setRefresh } = useDataStore();
  const [toggle, setToggle] = useState(false);
  const [post, setPost] = useState({ post: "", tag: "#" });
  const [loading, setLoading] = useState(false);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const baseUrl =
        "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
      const res = await axios.post(`/api/post/new/${userData._id}`, post);
      console.log(post);
      setPost({ post: "", tag: "#" });
      toast.success(res.data.message);
      setRefresh(true);
    } catch (error) {
      setPost({ post: "", tag: "#" });
      toast.error("Failed to post! try again.");
    } finally {
      setLoading(false);
      setToggle(false);
    }
  };

  return (
    <form onSubmit={handlePost} className="flex flex-col gap-2 text-white">
      {!toggle ? (
        <div className="flex items-center gap-3  p-4 bg-black border-b-[1px] border-white/50  cursor-pointer">
          <div className="w-full flex gap-3">
            <Link
              className="cursor-pointer hover:bg-white/20 rounded-full"
              href={`/profile/${userData._id}`}
            >
              <FaUserCircle size="2rem" />
            </Link>
            <textarea
              className="w-full outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c] resize-none"
              cols={10}
              rows={1}
              placeholder="Create post..."
              readOnly
              onClick={() => setToggle((prev) => !prev)}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-2  bg-black border-b-[1px] border-white/50">
          <div className="flex items-center gap-2 mb-2 ">
            <Link
              className="cursor-pointer hover:bg-white/20 rounded-full"
              href={`/profile/${userData._id}`}
            >
              <FaUserCircle size="2rem" />
            </Link>
            <h1>{`${userData.firstname} ${userData.lastname}`}</h1>
          </div>
          <div className="flex flex-col gap-3 ">
            <textarea
              className="w-full outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c] resize-none"
              cols={10}
              rows={5}
              placeholder="create post..."
              value={post.post}
              onChange={(e) => setPost({ ...post, post: e.target.value })}
            />
            <input
              type="text"
              placeholder="#tag"
              className="outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c]"
              value={post.tag}
              onChange={(e) => setPost({ ...post, tag: e.target.value })}
            />
          </div>
          <div className="flex gap-2 mt-4 justify-end items-center">
            <button
              className="text-red-500 rounded-md "
              type="button"
              onClick={() => setToggle((prev) => !prev)}
            >
              Cancel
            </button>
            <button
              className=" text-blue-500 rounded-md flex justify-center "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
