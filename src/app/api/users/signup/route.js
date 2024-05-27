import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import User from "@/database/models/userModel";
import { connect } from "@/database/dbConfig/dbConfig";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { name, mobile, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 500 })
    }

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save();

    // Send email

    // await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};
