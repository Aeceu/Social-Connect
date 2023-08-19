import Posts from "@/models/PostModel";
import connectDB from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();

// add likes to the post
export const POST = async (req: NextRequest) => {
  try {
    const { creatorID, likerID, postID } = await req.json();

    const post = await Posts.findById(postID);

    const existingLikeIndex = post.likes.findIndex(
      (like: any) => like.likerID.toString() === likerID
    );

    if (existingLikeIndex !== -1) {
      post.likes.splice(existingLikeIndex, 1); // Remove the existing like object
    } else {
      post.likes.push({
        creatorID: creatorID,
        likerID: likerID,
      });
    }

    await post.save(); // Save the updated post with modified likes array

    return NextResponse.json({ post: post.likes.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
