import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function CreatePostMain({
  data,
  post,
  setPost,
  loading,
  setToggle,
}: any) {
  return (
    <div className="p-4 flex flex-col gap-2  bg-black border-b-[1px] border-white/50">
      <div className="flex items-center gap-2 mb-2 ">
        <Link
          className="cursor-pointer hover:bg-white/20 rounded-full"
          href={`/profile/${data?._id}`}
        >
          <FaUserCircle size="2rem" />
        </Link>
        <h1>{`${data?.firstname} ${data?.lastname}`}</h1>
      </div>
      <div className="flex flex-col gap-3 ">
        <textarea
          className="w-full outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c] resize-none"
          cols={10}
          rows={5}
          placeholder="create post..."
          value={post.post}
          onChange={(e) => setPost({ ...post, post: e.target.value })}
        />
        <input
          type="text"
          placeholder="#tag"
          className="outline-none bg-[#3a3b3c] rounded-lg px-2 py-1 hover:bg-[#4a4b4c]"
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
      </div>
      <div className="flex gap-2 mt-4 justify-end items-center">
        <button
          className="text-red-500 rounded-md "
          type="button"
          onClick={() => setToggle((prev: boolean) => !prev)}
        >
          Cancel
        </button>
        <button
          className=" text-blue-500 rounded-md flex justify-center "
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
