import User from "@/models/UserModel";
import connectDB from "@/libs/database";
import { NextResponse, NextRequest } from "next/server";

connectDB();

// get the user's data except for password
export const GET = async (
  req: NextRequest,
  { params }: { params: { userID: string } }
) => {
  try {
    const user = await User.findById(params.userID).select("-password");
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// update the current details of the user except for the password.
export const POST = async (
  req: NextRequest,
  { params }: { params: { userID: string } }
) => {
  try {
    const { firstname, lastname, email, occupation, location } =
      await req.json();
    const user = await User.findById(params.userID);
    if (!user)
      NextResponse.json({ message: "User not found!" }, { status: 500 });

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.occupation = occupation;
    user.location = location;

    await user.save();
    return NextResponse.json(
      { message: "Profile Updated!", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
