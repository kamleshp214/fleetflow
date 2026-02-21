import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const vehicleId = searchParams.get("vehicleId");

    let query = adminDb.collection('expenses').orderBy('date', 'desc');
    
    if (vehicleId) {
      query = query.where('vehicleId', '==', vehicleId) as any;
    }

    const snapshot = await query.get();
    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { vehicleId, type, amount, description, litersLogged, date } = body;

    // Create new expense
    const docRef = adminDb.collection('expenses').doc();
    const expenseData = {
      vehicleId,
      type,
      amount,
      description,
      litersLogged: litersLogged || null,
      date: date ? new Date(date) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await docRef.set(expenseData);

    // If maintenance, update vehicle status
    if (type === 'Maintenance') {
      await adminDb.collection('vehicles').doc(vehicleId).update({
        status: 'In Shop',
        updatedAt: new Date(),
      });
    }
    
    return NextResponse.json(
      { id: docRef.id, ...expenseData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: "Failed to log expense" },
      { status: 500 }
    );
  }
}