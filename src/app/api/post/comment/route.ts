import Comments from "@/models/CommentModel";
import connectDB from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//add new comment
export const POST = async (req: NextRequest) => {
  try {
    const { userID, postID, comment } = await req.json();
    if (!userID)
      return NextResponse.json({ error: "NO USERSID" }, { status: 500 });

    const com = await new Comments({
      creatorID: userID,
      postID: postID,
      comment: comment,
    });
    await com.save();
    return NextResponse.json(
      { message: "New comment added!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
