import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/UserModel";
import jwt from "jsonwebtoken";
import connectDB from "@/libs/database";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id: string | null) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN!, { expiresIn: maxAge });
};

connectDB();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email: email });
    if (!user)
      return NextResponse.json(
        { error: "User doesn't exist!" },
        { status: 500 }
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 500 }
      );

    const token = createToken(user._id.toString());
    const response = NextResponse.json({
      message: "User authenticated!",
      success: true,
    });

    response.cookies.set("token", token);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
