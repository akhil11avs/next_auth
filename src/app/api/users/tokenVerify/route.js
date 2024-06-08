import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

import User from '@/database/models/userModel';
import { connect } from "@/database/dbConfig/dbConfig";

export const GET = async (request) => {
    connect();
    try {
        const token = request?.cookies.get('token')?.value || "";
        const response = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        const userResponse = await User.findById({ _id: response.id }).select("-password");

        return NextResponse.json({ data: userResponse, c: "User Successfully" }, { status: 200 })
    } catch (error) {
        if (error?.message === "jwt expired") {
            cookies().delete("token");
            return NextResponse.json({ message: 'Token expired', location: "/login" }, { status: 200 })
        }
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}