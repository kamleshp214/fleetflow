import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, finalOdometer, revenue } = body;

    // Get the trip
    const tripDoc = await adminDb.collection('trips').doc(id).get();
    if (!tripDoc.exists) {
      return NextResponse.json(
        { error: "Trip not found" },
        { status: 404 }
      );
    }

    const trip = tripDoc.data();

    // Handle trip completion
    if (status === 'Completed' && trip?.status !== 'Completed') {
      if (!finalOdometer) {
        return NextResponse.json(
          { error: "Final odometer reading is required to complete a trip" },
          { status: 400 }
        );
      }

      // Update trip
      const updatedTripData = {
        status: 'Completed',
        endDate: new Date(),
        revenue: revenue || trip?.revenue || 0,
        updatedAt: new Date(),
      };
      
      await adminDb.collection('trips').doc(id).update(updatedTripData);

      // Update vehicle
      await adminDb.collection('vehicles').doc(trip?.vehicleId).update({
        status: 'Available',
        currentOdometer: finalOdometer,
        updatedAt: new Date(),
      });

      // Update driver
      await adminDb.collection('drivers').doc(trip?.driverId).update({
        status: 'Available',
        updatedAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        trip: { id, ...trip, ...updatedTripData }
      });
    }

    // Handle generic updates
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };
    
    await adminDb.collection('trips').doc(id).update(updateData);

    const updatedDoc = await adminDb.collection('trips').doc(id).get();
    return NextResponse.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}