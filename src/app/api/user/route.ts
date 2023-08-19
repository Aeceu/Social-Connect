import User from "@/models/UserModel";
import connectDB from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();

//get all the accounts email and name
export const GET = async (req: NextRequest) => {
  try {
    const users = await User.find({}).select("-password -location -occupation");
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
