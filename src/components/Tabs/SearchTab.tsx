"use client";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchTab() {
  return (
    <div
      className="h-screen p-4 text-white border-l-[1px] border-white/10
hidden lg:flex flex-col gap-4 py-4 bg-black "
    >
      <div className="text-white flex items-center gap-2  border-[1px] border-white/10 rounded-full px-4 py-1 ">
        <AiOutlineSearch size="1.3rem" className="text-white" />
        <input
          type="text"
          className="bg-inherit outline-none"
          placeholder="search here..."
        />
      </div>

      <div className="rounded-t-lg border-[1px] h-[300px] border-white/10  flex flex-col ">
        <h1 className="py-4 px-4 text-md font-bold border-b-[1px] border-white/10">
          Users
        </h1>
        <h1 className="text-xs flex justify-center items-center gap-2 px-4 py-1 ">
          {"(comming soon 😎)"}
        </h1>
      </div>
    </div>
  );
}

// {AllUser.map((user: Props) => (
//   <div
//     key={user._id}
//     className="flex items-center gap-2 px-4 py-1 border-y-[1px] border-white/10"
//   >
//     <Link
//       className="cursor-pointer hover:bg-white/20 rounded-full"
//       href={`/profile/${user._id}`}
//     >
//       <FaUserCircle size="1.5rem" />
//     </Link>
//     <span className="flex flex-col  justify-center">
//       <h1 className="w-max">{`${user.firstname} ${user.lastname}`}</h1>
//       <p className="text-[12px] text-white/50">{user.email}</p>
//     </span>
//   </div>
// ))}
