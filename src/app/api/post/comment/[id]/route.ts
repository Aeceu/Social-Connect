import Comments from "@/models/CommentModel";
import connectDB from "@/libs/database";
import { NextResponse, NextRequest } from "next/server";

connectDB();

// Get all the posts comment
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const com = await Comments.find({ postID: params.id }).populate({
      path: "creatorID",
      select: "_id firstname lastname email",
    });
    return NextResponse.json(com, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
