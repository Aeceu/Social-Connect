/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PostCard from "./Cards/PostCard";
import useDataStore from "@/store/useDataStore";

export default function PostsList() {
  const useData = useDataStore((state) => state.userData);
  const postData = useDataStore((state) => state.postData);
  const setPostData = useDataStore((state) => state.setPostData);
  const refresh = useDataStore((state) => state.refresh);
  const setRefresh = useDataStore((state) => state.setRefresh);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/post");
        setPostData(res.data);
      } catch (error) {
        toast.error("Failed to fetch posts!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  async function handleDeletepost(id: string) {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:3000/api/post/new/${id}`
      );
      toast.success(res.data.message);
      setRefresh(true);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <div className="w-full flex justify-center p-4">
          <AiOutlineLoading3Quarters
            size="2rem"
            className="animate-spin  text-white"
          />
        </div>
      ) : (
        <>
          {postData[0]._id === "" ? (
            <div className="w-full flex justify-center">
              <h1 className="text-2xl p-4">No post available...</h1>
            </div>
          ) : (
            <div className="flex flex-col-reverse">
              {postData.map((post, i) => (
                <PostCard
                  post={post}
                  key={i}
                  handleDeletepost={handleDeletepost}
                  loading={loading}
                  userID={useData._id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
