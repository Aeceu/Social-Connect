"use client";
import EditCard from "@/components/Modals/EditCard";
import UserPostList from "@/components/UserPostsList";
import useDataStore from "@/store/useDataStore";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

type dataProps = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  occupation: string;
  location: string;
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const userID = useDataStore((state) => state.userData._id); // id of logged in  user
  const [userData, setUserData] = useState<dataProps>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/${params.id}`);
      setUserData(res.data);
    };
    fetchUser();
    console.log(params.id);
  }, [params.id]);

  if (!userData) {
    return (
      <div className="min-h-screen w-full flex justify-center p-4">
        loading...
      </div>
    );
  }

  return (
    <div className="bg-black w-full  lg:w-1/2 min-h-screen flex flex-col text-white border-x-[1px] border-white/10  relative">
      <nav className="w-full">
        <Link
          href="/"
          className="border-[1px] border-white/50 rounded-full p-2 absolute -left-14 top-2
      hover:bg-white/20"
        >
          <AiOutlineArrowLeft size="1.5rem" />
        </Link>
        <div className="w-full relative">
          <div className=" bg-white/10 w-full h-[200px]" />
          <span className="bg-white w-[130px] h-[130px] rounded-full absolute right-5 top-32" />
        </div>
        <div className="p-4 border-b-[1px] border-white/10">
          <h1 className="text-4xl">{`${userData?.firstname} ${userData?.lastname}`}</h1>
          <h1>{userData?.email}</h1>
          {userID === params.id && <EditCard userData={userData} />}
        </div>
      </nav>
      <div className=" flex flex-col overflow-y-scroll overflow-hidden gap-2 border-r-[1px] border-white/10 lg:border-none">
        {/* <ProfileFeed userID={userID} /> */}
        <UserPostList id={params.id} />
      </div>
    </div>
  );
}
