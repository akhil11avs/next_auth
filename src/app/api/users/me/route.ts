import { connect } from "@/database/dbConfig/dbConfig";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/database/helpers/getDataFromToken";

connect();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}