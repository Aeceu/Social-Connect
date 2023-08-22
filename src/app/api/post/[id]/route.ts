import Posts from "@/models/PostModel";
import connectDB from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//get specific the posts.
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const posts = await Posts.find({ creator: params.id }).populate({
      path: "creator",
      select: "-password",
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
