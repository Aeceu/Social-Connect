"use client";
import { useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const baseUrl =
        "https://social-connect-app.vercel.app/" || "http://localhost:3000/";
      const res = await axios.get(`${baseUrl}api/logout`);
      toast.success(res.data.message);
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleLogout}
      className="flex gap-2 items-center rounded-md border-[1px] border-white/10 py-1 px-2` justify-center
 hover:bg-white/10"
    >
      <TbLogout2 size="1.7rem" />
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size="1.3rem" />
      ) : (
        "Log out"
      )}
    </button>
  );
}
