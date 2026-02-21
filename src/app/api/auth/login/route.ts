import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
    try {
        const { idToken } = await req.json();

        if (!idToken) {
            return NextResponse.json(
                { error: "Missing ID token" },
                { status: 400 }
            );
        }

        // Verify the Firebase ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Get user data from Firestore
        const userDoc = await adminDb.collection('users').doc(uid).get();
        
        if (!userDoc.exists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();

        if (!userData?.isActive) {
            return NextResponse.json(
                { error: "User account is inactive" },
                { status: 403 }
            );
        }

        // Create a session cookie
        const expiresIn = 60 * 60 * 8 * 1000; // 8 hours
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({
            success: true,
            role: userData.role,
            user: {
                uid: uid,
                email: userData.email,
                name: userData.name,
                role: userData.role
            }
        });

        // Set session cookie
        response.cookies.set({
            name: "fleet_session",
            value: sessionCookie,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        // Set role cookie for middleware RBAC (optional but useful)
        response.cookies.set({
            name: "user_role",
            value: userData.role,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Authentication failed" },
            { status: 401 }
        );
    }
}