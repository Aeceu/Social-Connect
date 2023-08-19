import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
/*
    - In this file, we will get data from token and
    then use jwt.verify it and decode.
    
    - After it was decoded, we will return the email from that decoded file.

    - Remember that the token data is what we pass on 
    the time we post request to login the user.

    this is the token's data we want to pass to token:
    const tokenData = {
        id:user._id.toString(),
        username:user.username,
        email:user.email
    }
*/

export const getID = (req: NextRequest) => {
  try {
    //check first if there's a token
    const token = req.cookies.get("token")?.value || "";

    // verify it by passing the TOKEN_SECRET from the .env file.
    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN!);

    // return the email ONLY from the decoded data.
    return decoded.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
