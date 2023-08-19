import Link from "next/link";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Satisfy } from "next/font/google";

const inter = Satisfy({ subsets: ["latin"], weight: "400" });

type Props = {
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  data: {
    email: string;
    password: string;
  };
  setData: (data: { email: string; password: string }) => void;
};

export default function Login({ handleSubmit, data, setData, loading }: Props) {
  return (
    <form
      className="shadow-lg p-4  rounded-lg flex flex-col gap-4 bg-black border-[1px] border-emerald-600/50 text-white"
      onSubmit={handleSubmit}
    >
      <h1 className={`${inter.className} text-4xl font-bold text-center mb-2`}>
        Log in to your account
      </h1>
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
      <p className="text-sm text-center">
        Don&apos;t have account?{" "}
        <Link href="/register" className="text-blue-500 cursor-pointer">
          Sign up
        </Link>
      </p>
      <button
        className="bg-black border-[1px] border-white/10 w-full rounded-full text-white py-1 flex justify-center"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters size="1.3rem" className="animate-spin" />
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
