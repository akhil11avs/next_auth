import { connect } from "@/database/dbConfig/dbConfig";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const validPassword = await bcryptjs.compare(password, user?.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Check your credentials" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: '1hr' });

    const response = NextResponse.json({
      message: "Logged in Success",
      success: true,
    })

    response.cookies.set("token", token, {
      httpOnly: true
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
