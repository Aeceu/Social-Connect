import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/UserModel";

export const POST = async (req: NextRequest) => {
  try {
    const { firstname, lastname, email, password, occupation, location } =
      await req.json();

    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { error: "User already registered!" },
        { status: 500 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      occupation,
      location,
    });
    await newUser.save();

    return NextResponse.json(
      {
        message: "User registed successfull!!",
        newUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
