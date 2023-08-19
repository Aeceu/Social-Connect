import React from "react";
import FeedHead from "../FeedHead";
import CreatePostCard from "../Cards/CreatePostCard";
import PostsList from "../PostsList";

export default function FeedTab() {
  return (
    <div className="relative w-full md:w-3/4 lg:w-1/2 h-screen flex flex-col overflow-y-scroll overflow-hidden gap-2 border-r-[1px] border-white/10 lg:border-none">
      <FeedHead />
      <CreatePostCard />
      <PostsList />
    </div>
  );
}
