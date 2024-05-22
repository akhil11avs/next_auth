import { connect } from "../../../../database/dbConfig/dbConfig";
import User from "../../../../database/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request) => {
  connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 500 })
    }

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.findByIdAndUpdate({ _id: user?._id }, { password: hashedPassword })

    return NextResponse.json({
      message: "Password update successfully",
      success: true,
    })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
