import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json(
        { 
            success: true,
            message: "Logged out"
        }
    );
  
    // Clear session cookie
    response.cookies.set({
        name: "fleet_session",
        value: "",
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

    // Clear role cookie
    response.cookies.set({
        name: "user_role",
        value: "",
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

    return response;
}