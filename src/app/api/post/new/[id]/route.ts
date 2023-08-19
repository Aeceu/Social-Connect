import Posts from "@/models/PostModel";
import connectDB from "@/libs/database";
import { NextResponse, NextRequest } from "next/server";

connectDB();

// create new post
export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { post, tag } = await req.json();

    const posts = await new Posts({
      creator: params.id,
      post: post,
      tag: tag,
    });

    await posts.save();

    return NextResponse.json(
      { message: "New post successfull!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// delete post
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const res = await Posts.findByIdAndRemove({ _id: params.id });
    return NextResponse.json(
      { message: "Post deleted successfull!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { post, tag } = await req.json();

    const existingPost = await Posts.findById({ _id: params.id });
    if (!existingPost)
      NextResponse.json({ message: "Post not found!" }, { status: 500 });

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();
    return NextResponse.json({ message: "Post Updated!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
