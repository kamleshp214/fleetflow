import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { idToken, name, role } = await req.json();

    if (!idToken || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields (idToken, name, role)" },
        { status: 400 }
      );
    }

    const allowedRoles = ['Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 }
      );
    }

    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }

    // Check if user already exists in Firestore
    const userDoc = await adminDb.collection('users').doc(uid).get();
    if (userDoc.exists) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 }
      );
    }

    // Create user document in Firestore
    const userData = {
      uid,
      email,
      name,
      role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await adminDb.collection('users').doc(uid).set(userData);

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          uid,
          name,
          email,
          role
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}