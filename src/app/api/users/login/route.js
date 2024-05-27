import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import User from "@/database/models/userModel";
import { connect } from "@/database/dbConfig/dbConfig";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 500 })
    }

    const validPassword = await bcryptjs.compare(password, user?.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Check your credentials" }, { status: 500 });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1hr' });

    const response = NextResponse.json({
      message: "Logged in Success",
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      }
    })

    response.cookies.set("token", token, {
      httpOnly: true
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
