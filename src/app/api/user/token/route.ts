import { getID } from "@/libs/getID";
import User from "@/models/UserModel";
import connectDB from "@/libs/database";
import { NextRequest, NextResponse } from "next/server";

connectDB();

/*
    In this GET request, we will call the getData function,
    which returns the email stored in the token that we decoded.

    After getting the email, we will look for it in database and then get the data we want from databse.
    In this case, we will exclude the password.
*/

export async function GET(req: NextRequest) {
  try {
    const id = await getID(req);
    const userData = await User.findOne({ _id: id }).select("-password");
    return NextResponse.json({
      message: "User found",
      userData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
