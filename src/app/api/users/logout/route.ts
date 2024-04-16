import { connect } from "@/database/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect();

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    })

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}