import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = adminDb.collection('vehicles').orderBy('createdAt', 'desc');
    
    if (status) {
      query = query.where('status', '==', status) as any;
    }

    const snapshot = await query.get();
    const vehicles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check for duplicate license plate
    const existingVehicle = await adminDb
      .collection('vehicles')
      .where('licensePlate', '==', body.licensePlate)
      .limit(1)
      .get();

    if (!existingVehicle.empty) {
      return NextResponse.json(
        { error: "License plate already exists" },
        { status: 409 }
      );
    }

    // Create new vehicle
    const docRef = adminDb.collection('vehicles').doc();
    const vehicleData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await docRef.set(vehicleData);
    
    return NextResponse.json(
      { id: docRef.id, ...vehicleData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}