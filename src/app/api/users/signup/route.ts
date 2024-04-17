import { connect } from "@/database/dbConfig/dbConfig";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/database/helpers/mailer";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save();
    console.log('savedUser: ', savedUser);

    // Send email

    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    })


  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
