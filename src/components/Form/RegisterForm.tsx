import Link from "next/link";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Satisfy } from "next/font/google";

const inter = Satisfy({ subsets: ["latin"], weight: "400" });

type Props = {
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    occupation: string;
    location: string;
  };
  setData: (data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    occupation: string;
    location: string;
  }) => void;
};

export default function Register({
  loading,
  handleSubmit,
  data,
  setData,
}: Props) {
  return (
    <form
      className=" bg-black p-4  rounded-lg flex flex-col gap-2 border-[1px] border-emerald-600/50 text-white"
      onSubmit={handleSubmit}
    >
      <h1 className={`${inter.className} text-4xl font-bold text-center mb-2`}>
        Register an account
      </h1>
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, firstname: e.target.value })}
        value={data.firstname}
        type="text"
        placeholder="Firstname"
      />
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, lastname: e.target.value })}
        value={data.lastname}
        type="text"
        placeholder="Lastname"
      />
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, email: e.target.value })}
        value={data.email}
        type="text"
        placeholder="Email"
      />
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, password: e.target.value })}
        value={data.password}
        type="password"
        placeholder="Password"
      />
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, occupation: e.target.value })}
        value={data.occupation}
        type="text"
        placeholder="Occupation"
      />
      <input
        className="outline-none  px-4 py-1 rounded-full bg-black border-[1px] border-white/10"
        onChange={(e) => setData({ ...data, location: e.target.value })}
        value={data.location}
        type="text"
        placeholder="Location"
      />
      <a
        href="/login"
        className="text-sm text-blue-500 cursor-pointer text-center"
      >
        Log in my account
      </a>

      <button
        className="bg-black w-full rounded-full text-white py-1 flex justify-center border-[1px] border-white/10"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters size="1.5rem" className="animate-spin" />
        ) : (
          "Register"
        )}
      </button>
    </form>
  );
}
