"use client";
import { useEffect } from "react";
import AsideTab from "@/components/Tabs/AsideTab";
import FeedTab from "@/components/Tabs/FeedTab";
import SearchTab from "@/components/Tabs/SearchTab";

function Home() {
  return (
    <div className="w-full md:w-[90%] lg:w-3/4 min-h-screen flex bg-black  ">
      <AsideTab />
      <FeedTab />
      <SearchTab />s
    </div>
  );
}
export default Home;
