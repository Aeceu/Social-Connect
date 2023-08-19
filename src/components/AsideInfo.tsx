/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillMail } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import useDataStore from "@/store/useDataStore";
import axios from "axios";

export default function AsideInfo() {
  // stores the user details
  const userData = useDataStore((state) => state.userData);
  const setUserData = useDataStore((state) => state.setUserData);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/user/token");
      setUserData(res.data.userData);
      console.log(userData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex gap-2 items-center pt-4 text-xl justify-center lg:justify-start border-t-[1px] border-white/10">
        <Link href={`/profile/${userData?._id}`} className="cursor-pointer">
          <FaUserCircle size="2rem" />
        </Link>
        <p className=" font-bold lg:flex hidden">{`${userData?.firstname} ${userData?.lastname} `}</p>
      </div>
      <div className="flex gap-2 items-center py-4 justify-center lg:justify-start  ">
        <AiFillMail size="1rem" className="" />
        <p className="text-sm lg:flex hidden">{`${userData?.email}`}</p>
      </div>
      <div className="flex gap-2 items-center mb-4 justify-center lg:justify-start">
        <MdWork size="1rem" className="" />
        <p className="text-sm lg:flex hidden">{`${userData?.occupation}`}</p>
      </div>
      <div className="flex gap-2 items-center mb-4 justify-center lg:justify-start">
        <FaLocationDot size="1rem" className="" />
        <p className="text-sm lg:flex hidden">{`${userData?.location}`}</p>
      </div>
    </>
  );
}
