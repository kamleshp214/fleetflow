import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await adminDb.collection('trips').orderBy('createdAt', 'desc').get();
    const trips = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vehicleId, driverId, cargoWeightKg, origin, destination } = body;

    // Get vehicle
    const vehicleDoc = await adminDb.collection('vehicles').doc(vehicleId).get();
    if (!vehicleDoc.exists) {
      return NextResponse.json(
        { error: "Vehicle not found" },
        { status: 404 }
      );
    }
    
    const vehicle = vehicleDoc.data();
    if (vehicle?.status !== 'Available') {
      return NextResponse.json(
        { error: "Vehicle is not available" },
        { status: 400 }
      );
    }
    
    if (cargoWeightKg > vehicle?.maxCapacityKg) {
      return NextResponse.json(
        { error: `Cargo exceeds max capacity of ${vehicle?.maxCapacityKg}kg` },
        { status: 400 }
      );
    }

    // Get driver
    const driverDoc = await adminDb.collection('drivers').doc(driverId).get();
    if (!driverDoc.exists) {
      return NextResponse.json(
        { error: "Driver not found" },
        { status: 404 }
      );
    }
    
    const driver = driverDoc.data();
    if (driver?.status !== 'Available') {
      return NextResponse.json(
        { error: "Driver is not available" },
        { status: 400 }
      );
    }
    
    if (new Date(driver?.licenseExpiry) < new Date()) {
      return NextResponse.json(
        { error: "Driver's license is expired" },
        { status: 400 }
      );
    }

    // Create trip
    const docRef = adminDb.collection('trips').doc();
    const tripData = {
      vehicleId,
      driverId,
      origin,
      destination,
      cargoWeightKg,
      status: 'Dispatched',
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await docRef.set(tripData);

    // Update vehicle and driver status
    await adminDb.collection('vehicles').doc(vehicleId).update({
      status: 'On Trip',
      updatedAt: new Date(),
    });
    
    await adminDb.collection('drivers').doc(driverId).update({
      status: 'On Trip',
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { id: docRef.id, ...tripData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { error: "Failed to dispatch trip" },
      { status: 500 }
    );
  }
}