/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useDataStore from "@/store/useDataStore";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

type Props = {
  post: {
    _id: string;
    post: string;
    tag: string;
    creator: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      occupation: string;
      location: string;
    };
  };
  setToggleEdit: Dispatch<SetStateAction<boolean>>;
};

export default function EditPostCard({ post, setToggleEdit }: Props) {
  const setRefresh = useDataStore((state) => state.setRefresh);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ post: "", tag: "" });

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    setData({
      post: post.post,
      tag: post.tag,
    });
  }, [toggle]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
      const res = await axios.patch(`${baseUrl}api/post/new/${post._id}`, data);
      toast.success(res.data.message);
      handleClick();
      setToggleEdit(false);
      setRefresh(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} type="button" className="text-emerald-500">
        Edit
      </button>
      {toggle && (
        <div className="fixed bg-white/10 w-full min-h-screen top-0 left-0 flex justify-center items-center transition-all duration-500 overflow-hidden">
          <div
            className="text-white bg-black rounded-md border-[1px] border-white
          flex flex-col justify-center p-2 gap-2"
          >
            <h1>Edit Post</h1>
            <div className=" flex gap-2 items-center">
              <FaUserCircle size="1.7rem" />
              <span className="flex items-center gap-2">
                <h1 className="font-bold text-lg">{`${post.creator.firstname} ${post.creator.lastname}`}</h1>
              </span>
            </div>
            <div className="flex flex-col gap-3 text-lg">
              <textarea
                className=" outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c] w-[350px] resize-none"
                cols={20}
                rows={5}
                placeholder="create post..."
                value={data.post}
                onChange={(e) => setData({ ...data, post: e.target.value })}
              />
              <input
                type="text"
                placeholder="#tag"
                className="outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c]"
                value={`${data.tag}`}
                onChange={(e) => setData({ ...data, tag: e.target.value })}
              />
            </div>
            <div className="flex justify-end px-2  items-center">
              <button
                disabled={loading}
                onClick={handleClick}
                type="button"
                className="w-max px-4 py-1 text-sm text-red-500 "
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="button"
                className="w-max px-4 py-1 text-sm text-green-500 "
              >
                {loading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size="1.4rem"
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
