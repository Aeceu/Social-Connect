"use client";
import useDataStore from "@/store/useDataStore";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

interface Props {
  commentloading: boolean;
  loading: boolean;
  toggle: boolean;
  postID: string;
  commentorID: string;
  AllComments: any;
  comment: string;
  setComment: (comment: string) => void;
  AddNewComment: () => void;
}

export default function CommentBox({
  commentloading,
  loading,
  toggle,
  commentorID,
  AllComments,
  comment,
  setComment,
  AddNewComment,
}: Props) {
  return (
    <>
      {toggle && (
        <div className="py-3">
          {/* new comment box */}
          <div className="flex gap-2 items-center px-4 py-2">
            <Link
              href={`/profile/${commentorID}`}
              className="cursor-pointer hover:bg-white/20 rounded-full"
            >
              <FaUserCircle size="1.7rem" />
            </Link>
            <div className="w-full outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/50 flex gap-2 items-center">
              <input
                className="w-full outline-none bg-black"
                type="text"
                placeholder="comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {commentloading ? (
                <AiOutlineLoading3Quarters className="animate-spin " />
              ) : (
                <FiSend className="cursor-pointer" onClick={AddNewComment} />
              )}
            </div>
          </div>

          {/* Display the loading animation while fetching the data */}
          {loading ? (
            <AiOutlineLoading3Quarters
              className="animate-spin w-full flex justify-center "
              size="1.5rem"
            />
          ) : (
            // Check if there's comment or not
            <div>
              {AllComments.length > 0 ? (
                AllComments &&
                AllComments.map((data: any, i: number) => (
                  <CommentCard data={data} key={i} />
                ))
              ) : (
                <h1 className="w-full text-center font-bold py-2">
                  No comments...
                </h1>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

type dataProps = {
  data: any;
};

function CommentCard({ data }: dataProps) {
  return (
    <div>
      <div className="flex  px-4 py-1 gap-2" key={data._id}>
        <Link
          href={`/profile/${data.creatorID._id}`}
          className="cursor-pointer  rounded-full "
        >
          <FaUserCircle size="1.5rem" className="hover:text-white/10" />
        </Link>
        <span className="w-full flex flex-col">
          <h1 className="text-[10px]">{`${data.creatorID.firstname} ${data.creatorID.lastname}`}</h1>
          <p className="text-sm  px-3 py-1 rounded-b-full rounded-tr-full  bg-black border-[1px] border-white/50">
            {data.comment}
          </p>
        </span>
      </div>
    </div>
  );
}
