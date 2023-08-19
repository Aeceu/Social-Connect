import { getUserDetails } from "@/libs/getUserDetails";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default async function CreatePostHead({ setToggle }: any) {
  const data = await getUserDetails();
  return (
    <div className="flex items-center gap-3  p-4 bg-black border-b-[1px] border-white/50  cursor-pointer">
      <div className="w-full flex gap-3">
        <Link
          className="cursor-pointer hover:bg-white/20 rounded-full"
          href={`/profile/${data._id}`}
        >
          <FaUserCircle size="2rem" />
        </Link>
        <textarea
          className="w-full outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c] resize-none"
          cols={10}
          rows={1}
          placeholder="Create post..."
          readOnly
          onClick={() => setToggle((prev: boolean) => !prev)}
        />
      </div>
    </div>
  );
}
