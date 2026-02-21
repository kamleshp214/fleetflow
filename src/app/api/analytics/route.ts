import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // Get all vehicles with their status
    const vehiclesSnapshot = await adminDb.collection('vehicles').get();
    const vehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Count vehicles by status
    const kpis = vehicles.reduce((acc: any, vehicle: any) => {
      const status = vehicle.status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Get all trips and expenses for analytics
    const tripsSnapshot = await adminDb.collection('trips').get();
    const trips = tripsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const expensesSnapshot = await adminDb.collection('expenses').get();
    const expenses = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate vehicle analytics
    const vehicleAnalytics = vehicles.map((vehicle: any) => {
      const vehicleTrips = trips.filter((trip: any) => trip.vehicleId === vehicle.id);
      const vehicleExpenses = expenses.filter((expense: any) => expense.vehicleId === vehicle.id);

      const totalRevenue = vehicleTrips.reduce((sum: number, trip: any) => sum + (trip.revenue || 0), 0);
      const totalFuelCost = vehicleExpenses
        .filter((e: any) => e.type === 'Fuel')
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0);
      const totalMaintenanceCost = vehicleExpenses
        .filter((e: any) => e.type === 'Maintenance')
        .reduce((sum: number, e: any) => sum + (e.amount || 0), 0);
      const totalExpenses = totalFuelCost + totalMaintenanceCost;
      const totalLitersLogged = vehicleExpenses.reduce((sum: number, e: any) => sum + (e.litersLogged || 0), 0);

      const acquisitionCost = vehicle.acquisitionCost || 0;
      const roiPercentage = acquisitionCost > 0
        ? ((totalRevenue - totalExpenses) / acquisitionCost) * 100
        : 0;

      const fuelEfficiencyKmL = totalLitersLogged > 0
        ? (vehicle.currentOdometer || 0) / totalLitersLogged
        : 0;

      return {
        id: vehicle.id,
        name: vehicle.name,
        licensePlate: vehicle.licensePlate,
        acquisitionCost,
        currentOdometer: vehicle.currentOdometer || 0,
        totalRevenue,
        totalFuelCost,
        totalMaintenanceCost,
        totalExpenses,
        totalLitersLogged,
        roiPercentage: Math.round(roiPercentage * 100) / 100,
        fuelEfficiencyKmL: Math.round(fuelEfficiencyKmL * 100) / 100,
      };
    });

    return NextResponse.json({
      kpis,
      vehicleAnalytics,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
