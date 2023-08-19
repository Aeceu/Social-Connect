/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    occupation: string;
    location: string;
  };
};

type dataProps = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  occupation: string;
  location: string;
};
export default function EditCard({ user }: Props) {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<dataProps>({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    occupation: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      occupation: user.occupation,
      location: user.location,
    });
  }, [toggle]);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
      const res = await axios.post(`${baseUrl}api/user/${user._id}`, data);
      toast.success(res.data.message);
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 500);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="w-max px-4 py-1 border-[1px] border-white/50 rounded-md mt-4 text-sm "
      >
        Edit Profile
      </button>
      {toggle && (
        <div className="fixed bg-white/10 w-full min-h-screen top-0 left-0 flex justify-center items-center transition-all duration-500 overflow-hidden">
          <div
            className="text-white bg-black rounded-md border-[1px] border-white
          flex flex-col justify-center p-4 gap-2"
          >
            <h1>Edit Profile</h1>
            <div className="flex gap-2">
              <input
                className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white"
                type="text"
                placeholder="Firstname"
                value={data.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
              <input
                className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white"
                type="text"
                placeholder="Lastname"
                value={data.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
            </div>
            <input
              className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white"
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white"
              type="text"
              placeholder="Occupation"
              value={data.occupation}
              onChange={(e) => setData({ ...data, occupation: e.target.value })}
            />
            <input
              className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white"
              type="text"
              placeholder="Location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
            <div className="flex justify-end px-4 gap-2 items-center">
              <button
                disabled={loading}
                onClick={handleClick}
                type="button"
                className="w-max px-4 py-1 border-[1px] border-white rounded-full mt-4 text-sm "
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                type="button"
                className="w-max px-4 py-1 border-[1px] border-white rounded-full mt-4 text-sm "
              >
                {loading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size="1.4rem"
                  />
                ) : (
                  "Ok"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
