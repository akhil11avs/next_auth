import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log('token: ', token);
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET_KEY!);
    console.log('decodedToken: ', decodedToken);

    return decodedToken.id;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}