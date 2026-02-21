import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = adminDb.collection('drivers').orderBy('createdAt', 'desc');
    
    if (status) {
      query = query.where('status', '==', status) as any;
    }

    const snapshot = await query.get();
    const drivers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json(
      { error: "Failed to fetch drivers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check for duplicate license number
    const existingDriver = await adminDb
      .collection('drivers')
      .where('licenseNumber', '==', body.licenseNumber)
      .limit(1)
      .get();

    if (!existingDriver.empty) {
      return NextResponse.json(
        { error: "License number already exists" },
        { status: 409 }
      );
    }

    // Create new driver
    const docRef = adminDb.collection('drivers').doc();
    const driverData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await docRef.set(driverData);
    
    return NextResponse.json(
      { id: docRef.id, ...driverData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating driver:', error);
    return NextResponse.json(
      { error: "Failed to create driver" },
      { status: 500 }
    );
  }
}