import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('fleet_session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { error: "No session found" },
                { status: 401 }
            );
        }

        // Verify the session cookie
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
        const uid = decodedClaims.uid;

        // Get user data from Firestore
        const userDoc = await adminDb.collection('users').doc(uid).get();
        
        if (!userDoc.exists) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();

        return NextResponse.json({
            authenticated: true,
            user: {
                uid: uid,
                email: userData?.email,
                name: userData?.name,
                role: userData?.role,
                isActive: userData?.isActive
            }
        });

    } catch (error) {
        console.error("Session verification error:", error);
        return NextResponse.json(
            { error: "Invalid session" },
            { status: 401 }
        );
    }
}
