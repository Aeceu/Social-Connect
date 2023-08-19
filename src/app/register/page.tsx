"use client";
import { useState } from "react";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { Satisfy } from "next/font/google";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Register from "@/components/Form/RegisterForm";

type DataProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  occupation: string;
  location: string;
};
const inter = Satisfy({ subsets: ["latin"], weight: "400" });

export default function RegisterPage() {
  const [data, setData] = useState<DataProps>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    occupation: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/register", data);
      toast.success(res.data.message);
      setTimeout(() => {
        setLoading(false);
        router.push("/");
      }, 500);
    } catch (error: any) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full  h-screen gap-10 flex items-center justify-center">
      <div className="w-[45%] flex flex-col ">
        <h1 className={`${inter.className} text-8xl  text-emerald-600 `}>
          Social Media
        </h1>
        <p className="text-lg">
          Unlock a World of Interactions - Welcome to Social Media: Your Gateway
          to Global Networking.
        </p>
        <h1 className="text-lg mt-4 hover:underline hover:text-emerald-600 cursor-pointer">
          Support my socials:
        </h1>
        <div className="flex gap-2 py-2">
          <Link href="https://github.com/kaneki081">
            <FaGithub size="1.5rem" />
          </Link>
          <Link href="https://www.linkedin.com/in/jose-acebuche-4a5b851b5/">
            <FaLinkedin size="1.5rem" />
          </Link>
          <Link href="https://www.facebook.com/Aeceuuu">
            <FaFacebook size="1.5rem" />
          </Link>
        </div>
      </div>
      <Register
        loading={loading}
        handleSubmit={handleSubmit}
        data={data}
        setData={setData}
      />
    </div>
  );
}
