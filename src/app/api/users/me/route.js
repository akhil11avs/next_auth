import { connect } from "../../../../database/dbConfig/dbConfig";
import User from "../../../../database/models/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "../../../../database/helpers/getDataFromToken";

export const GET = async (request) => {
  connect();
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "Get User details successfully",
      data: user,
      success: true
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}