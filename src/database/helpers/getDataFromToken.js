import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const getDataFromToken = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    return decodedToken.id;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}